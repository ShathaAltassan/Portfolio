import { useLanguage } from '../i18n/LanguageContext.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Education() {
  const { t } = useLanguage();

  return (
    <section className="education" id="education">
      <div className="shell">
        <SectionHead eyebrow={t.ui.eyebrows.education} title={t.education.title} />

        <Reveal className="education-card">
          <div className="education-icon">
            <i className="fas fa-graduation-cap" />
          </div>
          <h3>{t.education.degree}</h3>
          <h4>{t.education.org}</h4>
          <h5>{t.education.period}</h5>

          <div className="gpa-badge">
            <i className="fas fa-star" />
            <span>
              {t.education.gpaLine1}
              <br />
              {t.education.gpaLine2}
            </span>
          </div>

          <div className="education-achievements">
            <div className="achievement">
              <a href="#face-detection-project" className="achievement-link">
                <i className="fas fa-project-diagram" />
                <span>{t.education.achievement}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
