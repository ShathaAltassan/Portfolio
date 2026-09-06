import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Reveal from './Reveal.jsx';

const SOCIALS = [
  { icon: 'fab fa-github', href: 'https://github.com/ShathaAltassan', label: 'GitHub' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/shatha-altassan/', label: 'LinkedIn' },
  { icon: 'fas fa-envelope', href: 'mailto:shatha.altassan@outlook.com', label: 'Email' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/966505191283', label: 'WhatsApp' },
  { icon: 'fas fa-phone', href: 'tel:+966505191283', label: 'Phone' },
];

export default function Home() {
  const { lang, t } = useLanguage();
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: t.hero.typedRoles,
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1600,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, [lang]);

  return (
    <section className="home" id="home">
      <div className="shell">
        <div className="home-content">
          <div className="text-container">
            <Reveal className="hero-eyebrow">{t.ui.eyebrows.hero}</Reveal>
            <Reveal as="h1" className="hero-name" delay={60}>
              {t.hero.name}
            </Reveal>
            <Reveal className="hero-role" delay={120}>
              <span ref={typedRef} className="typing" />
            </Reveal>
            <Reveal as="p" className="hero-tagline" delay={180}>
              {t.hero.tagline.join(' ')}
            </Reveal>

            <Reveal className="hero-actions" delay={240}>
              <a className="btn-primary" href="#projects">
                {t.ui.viewWork} <i className="fas fa-arrow-down" />
              </a>
              <a className="btn-ghost" href="#contact">
                {t.ui.getInTouch}
              </a>
            </Reveal>

            <Reveal className="icons" delay={300}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={s.label}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal className="image-container" delay={160}>
            <img src="/images/hi.png" alt="Shatha Altasan" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
