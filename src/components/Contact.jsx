export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="max-width">
        <h2 className="title" data-aos="fade-down">Contact Me</h2>
        <div className="contact-content" style={{ alignItems: 'left' }}>
          <div className="column left" data-aos="fade-right">
            <img src="/images/cont.png" alt="" />
          </div>
          <div className="column left" data-aos="flip-left">
            <div className="text">Let's Get in Touch</div>
            <p className="paragraph-3">
              I'm always excited to connect and explore new opportunities! Whether you have a project in mind, a
              question about my work, or if you're interested in discussing potential job opportunities, please
              don't hesitate to reach out. Let's collaborate and create something amazing together!
            </p>
            <div className="icons">
              <div className="row">
                <img src="/images/Location.png" alt="Location" style={{ width: 30, marginRight: 10 }} />
                <div className="info">
                  <div className="head" />
                  <div className="sub-title" style={{ fontSize: 19 }}>
                    Saudi Arabia - Al-Qassim
                  </div>
                </div>
              </div>
              <div className="row">
                <img src="/images/email icon.png" alt="Email" style={{ width: 30, height: 30, marginRight: 10 }} />
                <div className="info">
                  <div className="head" />
                  <div className="sub-title">
                    <a href="mailto:shatha.altassan@outlook.com" style={{ fontSize: 19 }}>
                      shatha.altassan@outlook.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="row">
                <img src="/images/phone icon.png" alt="Phone" style={{ width: 30, height: 30, marginRight: 10 }} />
                <div className="info">
                  <div className="head" />
                  <div className="sub-title">
                    <a href="tel:+966505191283" style={{ fontSize: 19 }}>
                      +966505191283
                    </a>
                  </div>
                </div>
              </div>

              <div className="row">
                <img
                  src="/images/linkedin icon.png"
                  alt="LinkedIn"
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
                <div className="info">
                  <div className="head" />
                  <div className="sub-title">
                    <a href="https://www.linkedin.com/in/shatha-altassan/" target="_blank" rel="noreferrer" style={{ fontSize: 19 }}>
                      LinkedIn-Shatha-Altasan
                    </a>
                    <br />
                  </div>
                </div>
              </div>

              <div className="row">
                <img src="/images/WhatsApp.png" alt="WhatsApp" style={{ width: 40, marginRight: -8 }} />
                <div className="info">
                  <div className="head" />
                  <div className="sub-title">
                    <a href="https://wa.me/966505191283" target="_blank" rel="noreferrer" style={{ fontSize: 19 }}>
                      WhatsApp
                    </a>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
