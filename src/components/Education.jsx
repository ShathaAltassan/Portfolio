export default function Education() {
  return (
    <section className="education" id="education">
      <div className="max-width">
        <h2 className="title" data-aos="fade-down">My Education</h2>
        <div className="education-content">
          <div className="education-card" data-aos="flip-up">
            <div className="education-icon">
              <i className="fas fa-graduation-cap" />
            </div>
            <div className="education-details">
              <h3>Bachelor degree in Computer Science</h3>
              <h4>Qassim University | Saudi Arabia</h4>
              <h5>2019 - 2024</h5>
              <div className="gpa-badge">
                <i className="fas fa-star" />
                <span>
                  GPA: 4.65/5 (Excellent) <br /> Graduated with honors
                </span>
              </div>
              <div className="education-achievements">
                <div className="achievement">
                  <a href="#face-detection-project" className="achievement-link">
                    <i className="fas fa-project-diagram" />
                    <span>Senior Project: Face Detection &amp; Recognition System</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
