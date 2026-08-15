const PROJECTS = [
  {
    id: 'face-detection-project',
    img: '/images/P1.png',
    alt: 'Face Detection & Recognition System',
    type: 'AI & Computer Vision',
    title: 'Face Detection & Recognition System',
    description:
      'Developed a Python-based system using InceptionResNetV1 for Facial Recognition and MTCNN for Face Detection to count and identify known and unknown individuals in real-time video streams. Implemented real-time database connectivity for updating and querying face recognition results.',
    code: 'https://github.com/ShathaAltassan/FDR-SYSTEM-',
    demo: 'https://youtu.be/LlPWWpNDRnc',
  },
  {
    img: '/images/GamerX.png',
    alt: 'GamerX Online Gaming Store',
    type: 'Web Development',
    title: 'GamerX - React.js Gaming Store',
    description:
      'Developed GamerX, an online gaming store using React.js, showcasing a dynamic and user-friendly interface. The project integrates advanced state management for seamless functionality, modular components for scalability, and an optimized browsing experience designed for gaming enthusiasts.',
    code: 'https://github.com/ShathaAltassan/Gamer-X',
    demo: '#',
  },
  {
    img: '/images/P2.png',
    alt: 'Pong Game Project',
    type: 'Game Development',
    title: 'Pong Game Project',
    description:
      'Created a Pong game in C# with Windows Forms, featuring paddle and ball movement, collision detection, scoring, and optimized for smooth gameplay. This project was part of a visual programming course.',
    code: 'https://github.com/ShathaAltassan/PongGame',
    demo: 'https://github.com/ShathaAltassan/PongGame',
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="max-width">
        <h2 className="title" data-aos="fade-down">My Projects</h2>

        <div className="projects-container">
          {PROJECTS.map((project) => (
            <div className="project-card" id={project.id} data-aos="fade-up" key={project.title}>
              <div className="project-img">
                <img src={project.img} alt={project.alt} />
                <div className="project-overlay">
                  <div className="project-type">{project.type}</div>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={project.code} target="_blank" rel="noreferrer" className="btn-project">
                    <i className="fab fa-github" /> View Code
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer" className="btn-project btn-demo">
                    <i className="fas fa-external-link-alt" /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
