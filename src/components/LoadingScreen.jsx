import { useEffect, useRef, useState } from 'react';

const INITIAL_PARTICLES = [
  { left: '20%', top: '20%', delay: '0s' },
  { left: '80%', top: '30%', delay: '0.3s' },
  { left: '40%', top: '60%', delay: '0.6s' },
  { left: '60%', top: '40%', delay: '0.9s' },
  { left: '30%', top: '70%', delay: '1.2s' },
  { left: '70%', top: '50%', delay: '1.5s' },
  { left: '50%', top: '30%', delay: '1.8s' },
  { left: '25%', top: '45%', delay: '2.1s' },
  { left: '75%', top: '65%', delay: '2.4s' },
  { left: '35%', top: '85%', delay: '2.7s' },
];

function repositionParticle(el) {
  el.style.left = `${Math.random() * 100}%`;
  el.style.top = `${Math.random() * 100}%`;
  el.style.animationDelay = `${Math.random() * 3}s`;
}

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const particleRefs = useRef([]);

  useEffect(() => {
    particleRefs.current.forEach((el) => el && repositionParticle(el));

    let fadeTimeout;
    let hideTimeout;

    const handleLoad = () => {
      fadeTimeout = setTimeout(() => {
        setFadeOut(true);
        hideTimeout = setTimeout(() => setHidden(true), 800);
      }, 2500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="particles">
        {INITIAL_PARTICLES.map((p, i) => (
          <div
            key={i}
            ref={(el) => (particleRefs.current[i] = el)}
            className="particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
            onAnimationEnd={(e) => repositionParticle(e.currentTarget)}
          />
        ))}
      </div>
      <div className="logo-container">
        <img src="/images/LOGO02.png" alt="Logo" className="loading-logo" />
        <div className="loading-progress">
          <div className="loading-bar" />
        </div>
      </div>
    </div>
  );
}
