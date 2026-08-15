const EXPERIENCE = [
  {
    aos: 'fade-right',
    title: 'Teaching Assistant',
    org: 'Qassim University | Saudi Arabia',
    period: 'Jan 2025 – Present',
    points: [
      'Assisted in course instruction by clarifying concepts and supporting faculty members.',
      'Contributed to an effective learning environment by enhancing student understanding.',
      'Delivered course content and participated in curriculum development aligned with educational quality standards.',
    ],
  },
  {
    aos: 'fade-left',
    title: 'Full Stack Developer',
    org: 'Inteli Dexer Company | Saudi Arabia',
    period: 'Jan 2025 – Present',
    points: [
      'Promoted to Full Stack Developer role, handling both front-end and back-end development.',
      'Develop and maintain web applications using React.js for front-end and FastAPI for back-end services.',
      'Implement and manage databases using PostgreSQL with pgAdmin, and containerize applications using Docker.',
      'Collaborate in a remote environment, following version control best practices with Git and GitHub.',
      'Design and implement RESTful APIs, ensuring seamless integration between front-end and back-end services.',
    ],
  },
  {
    aos: 'fade-right',
    title: 'Internship, Electronics and Power System Engineer',
    org: 'Smart Methods Company | Saudi Arabia',
    period: 'June 2023 – Aug 2023',
    points: [
      'Designed and programmed electrical circuits for robotic components using Arduino and C++, enhancing the efficiency and performance of robotic systems.',
      'Applied advanced design techniques for high reliability and efficiency.',
      'Collaborated with cross-functional teams to ensure timely delivery and technical compliance.',
    ],
  },
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="max-width">
        <h2 className="title" data-aos="fade-down">My Experience</h2>
        <div className="experience-content">
          <div className="timeline">
            {EXPERIENCE.map((item) => (
              <div className="timeline-item" data-aos={item.aos} key={item.title}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <h4>{item.org}</h4>
                  <h5>{item.period}</h5>
                  <ul className="role-points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
