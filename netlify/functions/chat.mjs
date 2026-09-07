/**
 * POST /api/chat  —  "ShathaAI" (شذىai), Shatha's portfolio assistant.
 *
 * Talks to Google Gemini (streamed) and logs each turn to Supabase.
 * The Gemini key never leaves the server. Configure in Netlify:
 *   GEMINI_API_KEY          (required)  -> https://aistudio.google.com/apikey
 *   SUPABASE_URL            (optional)  -> logging off if unset
 *   SUPABASE_SERVICE_KEY    (optional)  -> service_role key
 *   TELEGRAM_BOT_TOKEN      (optional)  -> from @BotFather; DM on every question AND
 *                                        a one-per-hour alert if the Gemini key
 *                                        runs out of quota. Off if unset.
 *   TELEGRAM_CHAT_ID        (optional)  -> your chat id (e.g. from @userinfobot)
 *   GEMINI_MODEL            (optional)  -> comma list, tried in order. Default leads
 *                                        with gemini-3.5-flash then falls back. If
 *                                        Google renames models again, set this to a
 *                                        model from GET /v1beta/models?key=...
 */

import { SYSTEM_PROMPT } from './persona.mjs';

const MODELS = (
  process.env.GEMINI_MODEL ||
  // full "flash" models first — the "-lite" ones garble mixed Arabic/English
  'gemini-3.5-flash,gemini-3.7-flash,gemini-flash-latest,gemini-2.5-flash,gemini-3.5-flash-lite,gemini-2.5-flash-lite'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT = process.env.TELEGRAM_CHAT_ID;

const MAX_INPUT_CHARS = 2000;
const MAX_HISTORY = 16;

// ---- lightweight per-instance rate limiting -------------------------------
const HITS = new Map(); // ipHash -> number[] (timestamps, ms)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 25;
const BURST_MS = 15 * 1000;
const MAX_PER_BURST = 4;

async function hashIp(ip) {
  const data = new TextEncoder().encode(`mujeeb:${ip || 'unknown'}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function rateLimited(key) {
  const now = Date.now();
  const times = (HITS.get(key) || []).filter((t) => now - t < WINDOW_MS);
  times.push(now);
  HITS.set(key, times);
  if (HITS.size > 5000) HITS.clear();
  const burst = times.filter((t) => now - t < BURST_MS).length;
  return times.length > MAX_PER_WINDOW || burst > MAX_PER_BURST;
}

// ---- helpers -------------------------------------------------------------
const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

function toGeminiContents(messages) {
  return messages
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, MAX_INPUT_CHARS) }],
    }))
    // Gemini requires the history to start with a user turn.
    .reduce((acc, turn) => {
      if (acc.length === 0 && turn.role === 'model') return acc;
      acc.push(turn);
      return acc;
    }, [])
    .slice(-MAX_HISTORY);
}

async function logTurn({ sessionId, question, answer, country }) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        authorization: `Bearer ${SUPABASE_KEY}`,
        'content-type': 'application/json',
        prefer: 'return=minimal',
      },
      body: JSON.stringify({
        session_id: sessionId || null,
        question: question.slice(0, 4000),
        answer: (answer || '').slice(0, 8000),
        lang: /[؀-ۿ]/.test(question) ? 'ar' : 'en',
        country: country || null,
      }),
    });
  } catch (err) {
    console.error('supabase log failed:', err);
  }
}

async function sendTelegram(text) {
  if (!TG_TOKEN || !TG_CHAT) {
    console.log('telegram: skipped (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set)');
    return;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT, text, disable_web_page_preview: true }),
    });
    if (!res.ok) {
      console.error('telegram sendMessage failed:', res.status, (await res.text()).slice(0, 300));
    }
  } catch (err) {
    console.error('telegram notify error:', err);
  }
}

function notifyTelegram({ question, answer, country }) {
  const text = [
    '🔔 New ShathaAI question',
    '',
    `❓ ${question.slice(0, 900)}`,
    '',
    `💬 ${(answer || '(no answer)').slice(0, 1500)}`,
    '',
    `📍 ${country || 'unknown'} · ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC`,
  ].join('\n');
  return sendTelegram(text);
}

// One quota alert per hour at most, so a spent key doesn't flood the chat.
let lastQuotaAlert = 0;
const QUOTA_ALERT_COOLDOWN_MS = 60 * 60 * 1000;

function notifyQuota(detail) {
  const now = Date.now();
  if (now - lastQuotaAlert < QUOTA_ALERT_COOLDOWN_MS) return Promise.resolve();
  lastQuotaAlert = now;
  const text = [
    '⚠️ ShathaAI: Gemini quota / rate limit reached',
    '',
    'Visitors are getting an error until the quota resets (usually within a',
    'day) or GEMINI_API_KEY is replaced in Netlify.',
    '',
    `🧩 ${String(detail || 'RESOURCE_EXHAUSTED').slice(0, 500)}`,
    '',
    `🕐 ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC`,
  ].join('\n');
  return sendTelegram(text);
}

// ---- handler ------------------------------------------------------------
export default async (request, context) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
      },
    });
  }
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });
  if (!GEMINI_KEY) return json(500, { error: 'Assistant is not configured yet.' });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const messages = Array.isArray(payload?.messages) ? payload.messages : null;
  const sessionId = typeof payload?.sessionId === 'string' ? payload.sessionId.slice(0, 64) : null;
  if (!messages || !messages.length) return json(400, { error: 'No messages' });

  const lastUser = [...messages].reverse().find((m) => m?.role === 'user' && m.content?.trim());
  if (!lastUser) return json(400, { error: 'No question' });
  if (lastUser.content.length > MAX_INPUT_CHARS) {
    return json(413, { error: 'Message too long' });
  }

  const ipHash = await hashIp(context?.ip || request.headers.get('x-nf-client-connection-ip'));
  if (rateLimited(ipHash)) {
    return json(429, { error: 'Too many messages — give it a minute.' });
  }

  const country = context?.geo?.country?.code || null;
  const contents = toGeminiContents(messages);

  const buildBody = (noThinking) =>
    JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        // headroom so a long answer is never cut mid-sentence; on models where
        // "thinking" can't be turned off it also has to cover the hidden reasoning
        maxOutputTokens: 3000,
        // short bio Q&A doesn't need chain-of-thought — faster + cheaper
        ...(noThinking ? {} : { thinkingConfig: { thinkingBudget: 0 } }),
      },
      safetySettings: [
        'HARM_CATEGORY_HARASSMENT',
        'HARM_CATEGORY_HATE_SPEECH',
        'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'HARM_CATEGORY_DANGEROUS_CONTENT',
      ].map((category) => ({ category, threshold: 'BLOCK_ONLY_HIGH' })),
    });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  let upstream = null;
  let lastDetail = '';
  let noThinking = false;
  let quotaHit = false;

  const MAX_ATTEMPTS = 3; // per model, on transient errors
  outer: for (const model of MODELS) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      let res;
      try {
        res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: buildBody(noThinking),
          },
        );
      } catch (err) {
        lastDetail = `${model}: network ${err?.message || err}`;
        break; // try next model
      }

      if (res.ok && res.body) {
        upstream = res;
        break outer;
      }

      const text = await res.text().catch(() => '');
      let msg = text.slice(0, 300);
      try {
        msg = JSON.parse(text)?.error?.message || msg;
      } catch {
        /* keep raw */
      }
      lastDetail = `${model} → ${res.status} ${msg}`;
      console.error('gemini error', lastDetail);

      if (res.status === 429 || /RESOURCE_EXHAUSTED|quota|rate limit/i.test(text)) {
        quotaHit = true;
      }

      if (res.status === 401 || res.status === 403) break outer; // auth problem, stop

      // some models reject `thinkingConfig` — drop it and retry the same model
      if (res.status === 400 && !noThinking && /thinking/i.test(text)) {
        noThinking = true;
        attempt -= 1;
        continue;
      }

      const transient = res.status === 429 || res.status === 500 || res.status === 503;
      if (transient && attempt < MAX_ATTEMPTS) {
        await sleep(1000 * attempt); // 1s, 2s
        continue; // retry same model
      }
      break; // 404/400 or out of retries → next model
    }
  }

  if (!upstream) {
    if (quotaHit) {
      const alert = notifyQuota(lastDetail);
      if (typeof context?.waitUntil === 'function') context.waitUntil(alert);
      else await alert;
    }
    return json(502, {
      error: 'The assistant is having a moment. Try again shortly.',
      detail: lastDetail || 'no response from Gemini',
    });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let full = '';
  let buffer = '';
  let finishReason = '';

  const handleData = (data, controller) => {
    if (!data || data === '[DONE]') return;
    try {
      const parsed = JSON.parse(data);
      const cand = parsed?.candidates?.[0];
      const piece = cand?.content?.parts?.map((p) => p.text || '').join('') || '';
      if (piece) {
        full += piece;
        controller.enqueue(encoder.encode(piece));
      }
      if (cand?.finishReason) finishReason = cand.finishReason;
    } catch {
      /* ignore keep-alive / partial frames */
    }
  };

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            handleData(trimmed.slice(5).trim(), controller);
          }
        }
        // flush a trailing frame that never got its closing newline
        const tail = buffer.trim();
        if (tail.startsWith('data:')) handleData(tail.slice(5).trim(), controller);
      } catch (err) {
        console.error('stream error', err);
      } finally {
        controller.close();
        if (finishReason && finishReason !== 'STOP') {
          console.error(`gemini finishReason=${finishReason} after ${full.length} chars`);
        }
        // finish logging / notifying even though the response stream is closed
        const after = Promise.allSettled([
          logTurn({ sessionId, question: lastUser.content, answer: full, country }),
          notifyTelegram({ question: lastUser.content, answer: full, country }),
        ]);
        if (typeof context?.waitUntil === 'function') {
          context.waitUntil(after);
        } else {
          await after;
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
      'x-content-type-options': 'nosniff',
    },
  });
};

export const config = { path: '/api/chat' };
