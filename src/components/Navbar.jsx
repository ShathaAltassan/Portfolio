import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${sticky ? ' sticky' : ''}`}>
      <div className="progress-container">
        <div className="progress-bar" id="myBar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="max-width">
        <div className="logo">
          <img src="/images/LOGO02.png" alt="Logo" className="logo-image" />
        </div>
        <ul className={`menu${menuOpen ? ' active' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="menu-btn" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-controls">
          <button id="theme-toggle" className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            <i className={`fas ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`} />
          </button>
          <div className="menu-btn" onClick={() => setMenuOpen((open) => !open)}>
            <i className={`material-icons${menuOpen ? ' active' : ''}`}>
              {menuOpen ? 'close' : 'menu'}
            </i>
          </div>
        </div>
      </div>
    </nav>
  );
}
