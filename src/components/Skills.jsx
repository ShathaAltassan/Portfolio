import { useLanguage } from '../i18n/LanguageContext.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import GithubActivity from './GithubActivity.jsx';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section className="skills" id="skills">
      <div className="shell">
        <SectionHead eyebrow={t.ui.eyebrows.skills} title={t.skills.title} />

        <div className="skills-grid">
          {t.skills.categories.map((category, i) => (
            <Reveal className="skill-category" delay={i * 60} key={category.title}>
              <h3>{category.title}</h3>
              <div className="skill-items">
                {category.items.map((item) => (
                  <div className="skill-item" key={item.label}>
                    {item.icon ? (
                      <i className={item.icon} />
                    ) : (
                      <img src={item.img} alt="" />
                    )}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <GithubActivity />
      </div>
    </section>
  );
}
