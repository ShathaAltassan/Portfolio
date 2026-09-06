import { useLanguage } from '../i18n/LanguageContext.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Contact() {
  const { t } = useLanguage();

  const rows = [
    {
      k: 'Email',
      v: 'shatha.altassan@outlook.com',
      href: 'mailto:shatha.altassan@outlook.com',
      icon: 'fas fa-envelope',
    },
    {
      k: 'GitHub',
      v: 'github.com/ShathaAltassan',
      href: 'https://github.com/ShathaAltassan',
      icon: 'fab fa-github',
    },
    {
      k: 'LinkedIn',
      v: t.contact.linkedinLabel,
      href: 'https://www.linkedin.com/in/shatha-altassan/',
      icon: 'fab fa-linkedin-in',
    },
    {
      k: 'WhatsApp',
      v: '+966 50 519 1283',
      href: 'https://wa.me/966505191283',
      icon: 'fab fa-whatsapp',
    },
    {
      k: t.contact.location,
      v: t.contact.location,
      href: null,
      icon: 'fas fa-map-marker-alt',
    },
  ];

  return (
    <section className="contact" id="contact">
      <div className="shell">
        <SectionHead eyebrow={t.ui.eyebrows.contact} title={t.contact.title} />

        <div className="contact-layout">
          <Reveal className="contact-intro">
            <p className="lead">{t.contact.heading}</p>
            <p>{t.contact.paragraph}</p>
          </Reveal>

          <Reveal className="contact-list" delay={100}>
            {rows.map((row) =>
              row.href ? (
                <a
                  key={row.k}
                  className="contact-row"
                  href={row.href}
                  target={row.href.startsWith('http') ? '_blank' : undefined}
                  rel={row.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <span className="ico">
                    <i className={row.icon} />
                  </span>
                  <span className="label">
                    <span className="k">{row.k}</span>
                    <span className="v">{row.v}</span>
                  </span>
                  <i className="fas fa-arrow-right arrow" />
                </a>
              ) : (
                <div key={row.k} className="contact-row">
                  <span className="ico">
                    <i className={row.icon} />
                  </span>
                  <span className="label">
                    <span className="k">{t.ui.locationLabel}</span>
                    <span className="v">{row.v}</span>
                  </span>
                </div>
              ),
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
