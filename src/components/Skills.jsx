const SKILL_CATEGORIES = [
  {
    title: 'Full Stack Development',
    items: [
      { icon: 'fab fa-html5', label: 'HTML5' },
      { icon: 'fab fa-css3-alt', label: 'CSS3' },
      { icon: 'fab fa-js', label: 'JavaScript' },
      { icon: 'fab fa-react', label: 'React.js' },
      { icon: 'fab fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fas fa-server', label: 'FastAPI' },
      {
        img: '/images/sql.png',
        imgStyle: { width: 35, height: 35, marginRight: 1 },
        label: 'PostgreSQL/pgAdmin',
      },
      { icon: 'fas fa-leaf', label: 'MongoDB' },
      {
        img: '/images/flask.png',
        imgStyle: { width: 35, height: 35, marginRight: 1, filter: 'brightness(1.3)' },
        label: 'Flask',
      },
      { icon: 'fab fa-docker', label: 'Docker' },
    ],
  },
  {
    title: 'Programming & Tools',
    items: [
      { icon: 'fab fa-python', label: 'Python' },
      { icon: 'fab fa-java', label: 'Java' },
      { icon: 'fas fa-code', label: 'C#' },
      { icon: 'fas fa-file-code', label: 'C/C++' },
      { icon: 'fab fa-git-alt', label: 'Git' },
      { icon: 'fab fa-github', label: 'GitHub' },
      { icon: 'fas fa-terminal', label: 'Command Line' },
    ],
  },
  {
    title: 'AI & Computer Vision',
    items: [
      { icon: 'fas fa-brain', label: 'Machine Learning' },
      { icon: 'fas fa-eye', label: 'Computer Vision' },
      { icon: 'fas fa-camera', label: 'OpenCV' },
      { icon: 'fas fa-fire', label: 'PyTorch' },
      { icon: 'fas fa-microchip', label: 'Deep Learning' },
    ],
  },
  {
    title: 'Development Expertise',
    items: [
      { icon: 'fas fa-project-diagram', label: 'Single-Page Applications' },
      { icon: 'fas fa-code-branch', label: 'Component Architecture' },
      { icon: 'fas fa-random', label: 'State Management' },
      { icon: 'fas fa-mobile-alt', label: 'Responsive Design' },
    ],
  },
  {
    title: 'Soft Skills',
    items: [
      { icon: 'fas fa-users', label: 'Teamwork' },
      { icon: 'fas fa-comments', label: 'Communication' },
      { icon: 'fas fa-lightbulb', label: 'Problem Solving' },
      { icon: 'fas fa-tasks', label: 'Time Management' },
    ],
  },
];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="max-width" data-aos="fade-down">
        <h2 className="title" data-aos="fade-up">My Skills</h2>
        <div className="skills-content">
          <div className="skills-grid" data-aos="fade-up">
            {SKILL_CATEGORIES.map((category) => (
              <div className="skill-category" key={category.title}>
                <h3>{category.title}</h3>
                <div className="skill-items">
                  {category.items.map((item) => (
                    <div className="skill-item" key={item.label}>
                      {item.icon ? (
                        <i className={item.icon} />
                      ) : (
                        <img src={item.img} alt={item.label} style={item.imgStyle} />
                      )}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
