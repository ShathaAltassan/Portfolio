import { Suspense, lazy, useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const AiAssistant = lazy(() => import('./components/AiAssistant.jsx'));

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

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <div className="sky" aria-hidden="true" />
      <div className="moon" aria-hidden="true" />

      <LoadingScreen />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Suspense fallback={null}>
        <AiAssistant />
      </Suspense>

      <main>
        <Home />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer theme={theme} />
    </>
  );
}
