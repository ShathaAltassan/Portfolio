import { useLanguage } from '../i18n/LanguageContext.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

const RESUME_URL =
  'https://drive.google.com/drive/folders/1-CoSev9pBAnSc1W-nEqfbD7AAq5TWX2_?usp=drive_link';

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="about" id="about">
      <div className="shell">
        <SectionHead eyebrow={t.ui.eyebrows.about} title={t.about.title} />

        <div className="about-grid">
          <Reveal className="about-portrait">
            <img src="/images/about.png" alt="" />
          </Reveal>

          <Reveal className="about-body" delay={100}>
            <p className="lead">
              {t.about.introPrefix} <span>{t.hero.name}</span>.
            </p>
            <p>{t.about.paragraph}</p>
            <a className="btn-ghost" href={RESUME_URL} target="_blank" rel="noreferrer">
              <i className="fas fa-arrow-down" /> {t.about.resume}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
