import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function About() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Shatha Altasan'],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <section className="about" id="about">
      <div className="max-width">
        <h2 className="title" data-aos="fade-down">About Me</h2>
        <div className="about-content">
          <div className="column left" data-aos="fade-right">
            <img src="/images/about.png" alt="" />
          </div>
          <div className="column right" data-aos="fade-up">
            <div className="text">
              I'm <span ref={typedRef} className="typing-2" />
            </div>
            <p className="paragraph">
              Full Stack Developer with a Computer Science degree, specializing in creating dynamic, responsive web
              applications. Experienced in both front-end and back-end technologies, including React.js, FastAPI,
              Flask, and database systems like PostgreSQL and MongoDB. Committed to clean code, intuitive UI/UX
              design, and efficient development practices. Passionate about leveraging technology to create
              impactful digital solutions while continuously expanding my technical expertise.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1-CoSev9pBAnSc1W-nEqfbD7AAq5TWX2_?usp=drive_link"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
