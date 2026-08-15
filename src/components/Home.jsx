import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Full Stack Developer'],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
      fadeOut: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <section className="home" id="home">
      <div className="max-width">
        <div className="home-content">
          <div className="text-container">
            <div className="text-2">Shatha Altasan</div>
            <div className="text-3">
              <span ref={typedRef} className="typing" />
            </div>
            <div className="text-1" data-aos="fade-up" style={{ lineHeight: 1.8 }}>
              Creating Efficient, Dynamic,
              <br />
              and Responsive Web Solutions
            </div>

            <br />
            <div className="icons" data-aos="fade-up">
              <a href="https://www.linkedin.com/in/shatha-altassan/" target="_blank" rel="noreferrer">
                <img src="/images/linkedin icon.png" alt="LinkedIn" style={{ width: 40, height: 40 }} />
              </a>
              <a href="mailto:shatha.altassan@outlook.com">
                <img src="/images/email icon.png" alt="Email" style={{ width: 40, height: 40 }} />
              </a>
              <a href="tel:+966505191283">
                <img src="/images/phone icon.png" alt="Phone" style={{ width: 40, height: 40 }} />
              </a>
              <a href="https://github.com/shathaaltassan" target="_blank" rel="noreferrer">
                <img src="/images/github icon.png" alt="GitHub" style={{ width: 40, height: 40 }} />
              </a>
              <a href="https://wa.me/966505191283" target="_blank" rel="noreferrer">
                <img src="/images/WhatsApp.png" alt="WhatsApp" style={{ width: 43 }} />
              </a>
            </div>
          </div>
          <div className="image-container" data-aos="fade-right">
            <img src="/images/hi.png" alt="Hi Image" />
          </div>
        </div>
      </div>
    </section>
  );
}
