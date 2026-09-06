import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let fadeTimeout;
    let hideTimeout;

    const start = () => {
      fadeTimeout = setTimeout(() => {
        setFadeOut(true);
        hideTimeout = setTimeout(() => setHidden(true), 700);
      }, 1600);
    };

    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start);
    }

    return () => {
      window.removeEventListener('load', start);
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="logo-container">
        <img src="/images/LOGO02.png" alt="Loading" />
        <div className="loading-progress">
          <div className="loading-bar" />
        </div>
      </div>
    </div>
  );
}
