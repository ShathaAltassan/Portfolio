import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const DURATION = 2200;
const EXIT = 700;

export default function LoadingScreen() {
  const { t, lang } = useLanguage();

  const [seen] = useState(() => {
    try {
      return sessionStorage.getItem('introSeen') === '1';
    } catch {
      return false;
    }
  });

  const [pct, setPct] = useState(seen ? 100 : 0);
  const [exiting, setExiting] = useState(seen);
  const [done, setDone] = useState(seen);

  useEffect(() => {
    if (done) return undefined;

    document.body.style.overflow = 'hidden';
    const start = performance.now();
    let raf;
    let exitTimer;

    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem('introSeen', '1');
        } catch {
          /* private mode — fine, it just shows again */
        }
        setExiting(true);
        exitTimer = setTimeout(() => setDone(true), EXIT);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      document.body.style.overflow = '';
    };
  }, [done]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  if (done) return null;

  const phrase = t.intro;

  return (
    <div
      className={`intro${exiting ? ' intro--exit' : ''}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      aria-hidden="true"
    >
      <p className="intro-phrase">
        <span className="intro-line">{phrase.line1}</span>
        <span className="intro-line intro-line--accent">{phrase.line2}</span>
      </p>
      <div className="intro-progress">
        <div className="intro-bar" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
      <div className="intro-count">{pct}%</div>
    </div>
  );
}
