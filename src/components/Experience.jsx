import { useLanguage } from '../i18n/LanguageContext.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section className="experience" id="experience">
      <div className="shell">
        <SectionHead eyebrow={t.ui.eyebrows.experience} title={t.experience.title} />

        <div className="timeline">
          {t.experience.items.map((item, i) => (
            <Reveal className="timeline-item" delay={i * 80} key={item.title}>
              <div className="period">{item.period}</div>
              <h3>{item.title}</h3>
              <h4>{item.org}</h4>
              <ul className="role-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
