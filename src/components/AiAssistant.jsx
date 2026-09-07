import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const ENDPOINT = '/api/chat';

function newSessionId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

const MD_COMPONENTS = {
  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
  p: ({ node, ...props }) => <p dir="auto" {...props} />,
  li: ({ node, ...props }) => <li dir="auto" {...props} />,
};

export default function AiAssistant() {
  const { t, lang } = useLanguage();
  const a = t.assistant;

  const [open, setOpen] = useState(false);
  const [sessionId] = useState(newSessionId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const hasAsked = messages.some((m) => m.role === 'user');

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || busy) return;

    const history = [...messages, { role: 'user', content: question }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        let msg = res.status === 429 ? a.rateLimit : a.error;
        try {
          const body = await res.clone().json();
          if (body?.detail) msg = `${msg}\n\n\`${body.detail}\``;
        } catch {
          /* non-JSON error body */
        }
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: msg };
          return next;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: acc };
          return next;
        });
      }
      if (!acc.trim()) {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: a.error };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: 'assistant', content: a.error };
        return next;
      });
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const lastMsg = messages[messages.length - 1];
  const streaming = busy && lastMsg.role === 'assistant' && lastMsg.content === '';

  return (
    <div className={`ai${open ? ' ai--open' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {!open && (
        <button className="ai-launch" onClick={() => setOpen(true)} aria-label={a.launch}>
          <span className="ai-launch-wave" aria-hidden="true">👋</span>
          <span className="ai-launch-text">{a.launch}</span>
          <span className="ai-launch-tag">{a.launchTag}</span>
        </button>
      )}

      {open && (
        <div className="ai-panel" ref={panelRef} role="dialog" aria-label={a.title}>
          <header className="ai-head">
            <div className="ai-head-id">
              <span className="ai-dot" aria-hidden="true" />
              <div>
                <strong>{a.title}</strong>
                <span>{a.subtitle}</span>
              </div>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)} aria-label="Close">
              <i className="fas fa-times" />
            </button>
          </header>

          <div
            className={`ai-messages${hasAsked ? '' : ' ai-messages--intro'}`}
            ref={scrollRef}
          >
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg--${m.role}`} dir="auto">
                {m.role === 'assistant' ? (
                  m.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD_COMPONENTS}>
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    <span className="ai-typing" aria-label={a.thinking}>
                      <i />
                      <i />
                      <i />
                    </span>
                  )
                ) : (
                  m.content
                )}
              </div>
            ))}

            {!hasAsked && (
              <div className="ai-suggest">
                {a.suggestions.map((s, i) => (
                  <button
                    key={s}
                    style={{ '--i': i }}
                    onClick={() => send(s)}
                    disabled={busy}
                  >
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="ai-input"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              dir="auto"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={a.placeholder}
              maxLength={2000}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label={a.send}>
              <i className="fas fa-arrow-up" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
