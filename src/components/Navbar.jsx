import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const RESUME_URL =
  'https://drive.google.com/drive/folders/1-CoSev9pBAnSc1W-nEqfbD7AAq5TWX2_?usp=drive_link';

export default function Navbar({ theme, toggleTheme }) {
  const { lang, toggleLang, t } = useLanguage();
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#experience', label: t.nav.experience },
    { href: '#education', label: t.nav.education },
    { href: '#projects', label: t.nav.projects },
    { href: '#skills', label: t.nav.skills },
    { href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.body.classList.toggle('menu-open', menuOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  return (
    <>
      <div className="nav-scroll-progress" aria-hidden="true">
        <div className="bar" style={{ width: `${progress}%` }} />
      </div>

      <nav className={`navbar${sticky ? ' sticky' : ''}`}>
        <div className="shell">
          <div className="logo">
            <a href="#home">
              <img
                src={theme === 'light' ? '/images/LOGO01.png' : '/images/LOGO02.png'}
                alt="Shatha Altasan"
                className="logo-image"
              />
            </a>
          </div>

          <ul className={`menu${menuOpen ? ' active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-controls">
            <button className="lang-toggle" aria-label="Toggle language" onClick={toggleLang}>
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
              <i className={`fas ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`} />
            </button>
            <a className="nav-resume" href={RESUME_URL} target="_blank" rel="noreferrer">
              {t.ui.resume}
            </a>
            <button
              className="menu-btn"
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i className="material-icons">{menuOpen ? 'close' : 'menu'}</i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
