import { useState, useEffect, useRef, type MouseEvent } from 'react';

interface EnvelopeOpeningStrings {
  fallbackGuest: string;
  invitedText: string;
  fonts: {
    title: string;
    secondary: string;
  };
}

interface EnvelopeOpeningProps {
  onComplete: () => void;
  guestName?: string;
  strings: EnvelopeOpeningStrings;
}

interface HeartParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
  grow: number;
}

interface HeartCanvasProps {
  animate: boolean;
  heartsRef: React.MutableRefObject<HeartParticle[]>;
  initialCount?: number;
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

function HeartCanvas({ animate, heartsRef, initialCount = 28 }: HeartCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(1);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = [
      'rgba(255, 118, 145, 1)',
      'rgba(255, 93, 131, 1)',
      'rgba(249, 115, 165, 1)',
      'rgba(251, 146, 196, 1)',
      'rgba(240, 95, 138, 1)',
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initHearts = () => {
      if (heartsRef.current.length > 0) return;
      const generated: HeartParticle[] = [];
      for (let i = 0; i < initialCount; i++) {
        generated.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * canvas.height * 0.5,
          radius: Math.random() * 16 + 14,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(Math.random() * 0.35 + 0.18),
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.4 + 0.5,
          grow: Math.random() * 0.02 + 0.01,
        });
      }
      heartsRef.current = generated;
    };

    resizeCanvas();
    initHearts();
    window.addEventListener('resize', resizeCanvas);

    const animateLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartsRef.current.forEach((heart) => {
        heart.x += heart.vx * speedRef.current;
        heart.y += heart.vy * speedRef.current;
        heart.radius += heart.grow;

        if (heart.x < -heart.radius) heart.x = canvas.width + heart.radius;
        if (heart.x > canvas.width + heart.radius) heart.x = -heart.radius;
        if (heart.y < -heart.radius) heart.y = canvas.height + heart.radius * 1.5;

        drawHeart(ctx, heart);
      });
      frameRef.current = requestAnimationFrame(animateLoop);
    };

    animateLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [heartsRef, initialCount]);

  useEffect(() => {
    speedRef.current = animate ? 1.8 : 1;
  }, [animate]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'transparent' }} />;
}

export function EnvelopeOpening({ onComplete, guestName, strings }: EnvelopeOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);
  const heartsRef = useRef<HeartParticle[]>([]);
  const completeTimer = useRef<number | null>(null);
  const invitedBackground = new URL('../../imports/invited.png', import.meta.url).href;

  useEffect(() => {
    return () => {
      if (completeTimer.current) {
        window.clearTimeout(completeTimer.current);
      }
    };
  }, []);

  const addHeartsAt = (x: number, y: number) => {
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
      });
    }

    if (heartsRef.current.length > 140) {
      heartsRef.current.splice(0, heartsRef.current.length - 140);
    }
  };

  const handleScreenClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isOpening) {
      addHeartsAt(event.clientX, event.clientY);
      return;
    }
    setIsOpening(true);
    addHeartsAt(event.clientX, event.clientY);

    completeTimer.current = window.setTimeout(() => {
      onComplete();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden cursor-pointer" onClick={handleScreenClick}>
      <HeartCanvas animate={isOpening} heartsRef={heartsRef} initialCount={28} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,157,189,0.18),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),transparent_28%)] pointer-events-none" />

      <div className="relative w-96 h-72">
        {/* Envelope body */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-lg shadow-2xl border-2 border-[#e91e63]/30" />

        {/* Envelope flap */}
        <div
          className="absolute top-0 left-0 w-full origin-top transition-all duration-1000 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            height: '150px',
            transform: isOpening ? 'translateY(-16px) rotateX(-160deg)' : 'translateY(0) rotateX(0deg)',
          }}
        >
          <div className="w-0 h-0 border-l-[192px] border-l-transparent border-r-[192px] border-r-transparent border-t-[150px] border-t-[#e91e63]/80" />
        </div>

        {/* Letter inside */}
        <div
          className={`absolute inset-4 rounded shadow-xl flex flex-col items-center justify-center transition-all duration-1000 delay-300 ${
            isOpening ? 'translate-y-[-100px] opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{
            backgroundColor: '#ffffff',
            backgroundImage: `url(${invitedBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'soft-light',
          }}
        >
          <div className={`${strings.fonts.secondary} text-4xl text-[#1a1a2e] mb-2`}>{guestName || strings.fallbackGuest}</div>
          <div className={`${strings.fonts.secondary} text-2xl text-[#e91e63]`}>{strings.invitedText}</div>
          <div className="mt-4 text-2xl">💕</div>
        </div>

        {/* Rose decoration */}
        <div
          className={`absolute -bottom-8 right-12 text-6xl transition-all duration-1000 delay-500 ${
            isOpening ? 'opacity-100 scale-100 rotate-12' : 'opacity-0 scale-0'
          }`}
        >
          🌹
        </div>
      </div>
    </div>
  );
}
