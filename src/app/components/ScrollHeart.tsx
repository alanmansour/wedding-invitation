import { useEffect, useState, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
  grow: number;
  decay: number;
}

function drawHeart(ctx: CanvasRenderingContext2D, heart: HeartParticle) {
  const { x, y, radius, color, opacity } = heart;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(radius / 16, radius / 16);
  ctx.beginPath();
  ctx.moveTo(0, -6);
  ctx.bezierCurveTo(-8, -18, -26, -10, -20, 6);
  ctx.bezierCurveTo(-16, 16, -4, 22, 0, 28);
  ctx.bezierCurveTo(4, 22, 16, 16, 20, 6);
  ctx.bezierCurveTo(26, -10, 8, -18, 0, -6);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.shadowColor = 'rgba(255, 255, 255, 0.25)';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
  ctx.globalAlpha = 1;
}

export function ScrollHeart() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<HeartParticle[]>([]);
  const speedRef = useRef(1);
  const pulseTimeoutRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(100, (scrolled / documentHeight) * 100);
      setScrollProgress(progress);
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartsRef.current = heartsRef.current
        .map((heart) => {
          heart.x += heart.vx * speedRef.current;
          heart.y += heart.vy * speedRef.current;
          heart.radius += heart.grow;
          heart.opacity -= heart.decay * speedRef.current;

          return heart;
        })
        .filter((heart) => {
          const alive = heart.opacity > 0.02 && heart.y > -heart.radius;
          if (alive) {
            drawHeart(ctx, heart);
          }
          return alive;
        });

      frameRef.current = requestAnimationFrame(animate);
    };

    const addHearts = (x: number, y: number) => {
      const colors = [
        'rgba(255, 118, 145, 1)',
        'rgba(255, 93, 131, 1)',
        'rgba(249, 115, 165, 1)',
        'rgba(251, 146, 196, 1)',
        'rgba(240, 95, 138, 1)',
      ];

      for (let i = 0; i < 12; i++) {
        const angle = Math.PI * 2 * (i / 12) + (Math.random() - 0.5) * 0.8;
        const speed = Math.random() * 1.2 + 0.6;
        heartsRef.current.push({
          x,
          y,
          radius: Math.random() * 4 + 4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * -1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.35 + 0.6,
          grow: Math.random() * 0.08 + 0.04,
          decay: Math.random() * 0.007 + 0.008,
        });
      }

      if (heartsRef.current.length > 140) {
        heartsRef.current.splice(0, heartsRef.current.length - 140);
      }
    };

    const handleClick = (event: MouseEvent) => {
      addHearts(event.clientX, event.clientY);
      speedRef.current = 1.8;
      if (pulseTimeoutRef.current) {
        window.clearTimeout(pulseTimeoutRef.current);
      }
      pulseTimeoutRef.current = window.setTimeout(() => {
        speedRef.current = 1;
      }, 800);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('click', handleClick);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (pulseTimeoutRef.current) window.clearTimeout(pulseTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-10" />
      {/* <div className="fixed top-1/2 right-8 -translate-y-1/2 z-40 hidden lg:block"> */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f59dbd', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f59dbd', stopOpacity: 0.7 }} />
            </linearGradient>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="url(#heartGradient)"
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={100 - scrollProgress}
            fill={scrollProgress >= 100 ? 'url(#heartGradient)' : 'none'}
            pathLength="100"
            style={{
              transition: 'fill 0.5s ease-out',
            }}
          />
        </svg>
        <div className="text-center mt-2">
          <span className="font-['Dancing_Script'] text-sm text-[#f59dbd]">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </>
  );
}
