import { useEffect, useState } from 'react';
import AOS from 'aos';
import LoadingScreen from './components/LoadingScreen.jsx';
import Navbar from './components/Navbar.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    AOS.init({ easing: 'ease-in', delay: 100, duration: 300, offset: 100 });
    const refresh = () => AOS.refresh();
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <LoadingScreen />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <ScrollToTopButton />
      <Home />
      <br />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Contact />
      <Footer theme={theme} />
    </>
  );
}
