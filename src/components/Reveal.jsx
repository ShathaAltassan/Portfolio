import { useEffect, useRef, useState } from 'react';

/**
 * Fades + lifts its children into view once, the first time they enter the
 * viewport. Replaces the old AOS setup with something quieter and smoother.
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }

    // If it's already at/above the fold (e.g. after a fast scroll), show now.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setShown(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px 12% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
