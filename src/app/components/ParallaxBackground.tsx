import { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
}

export function ParallaxBackground({ children, speed = 0.5 }: ParallaxBackgroundProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset * speed}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
