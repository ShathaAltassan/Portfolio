import { useLanguage } from '../i18n/LanguageContext.jsx';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section className="projects" id="projects">
      <div className="shell">
        <SectionHead eyebrow={t.ui.eyebrows.projects} title={t.projects.title} />

        <div className="projects-container">
          {t.projects.items.map((project, i) => (
            <Reveal className="project-card" id={project.id} delay={i * 60} key={project.title}>
              <div className="project-img">
                <img src={project.img} alt={project.alt} loading="lazy" />
                <div className="project-overlay">
                  <span className="project-type">{project.type}</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  {project.code && project.code !== '#' && (
                    <a href={project.code} target="_blank" rel="noreferrer" className="btn-project">
                      <i className="fab fa-github" /> {t.projects.codeLabel}
                    </a>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-project btn-demo"
                    >
                      <i className="fas fa-external-link-alt" /> {t.projects.demoLabel}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
