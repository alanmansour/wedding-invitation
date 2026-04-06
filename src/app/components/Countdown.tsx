import { useState, useEffect, useRef } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownStrings {
  title: string;
  subtitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  fonts: {
    title: string;
    secondary: string;
    countdown: string;
  };
}

interface CountdownProps {
  strings: CountdownStrings;
}

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

export function Countdown({ strings }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Wedding date and time in Denmark timezone
      const formatter = new Intl.DateTimeFormat('da-DK', {
        timeZone: 'Europe/Copenhagen',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const now = new Date();
      const weddingDate = new Date('2026-07-17T17:00:00');
      
      // Get current time in Denmark timezone
      const formatter2 = new Intl.DateTimeFormat('da-DK', {
        timeZone: 'Europe/Copenhagen',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const dnParts = formatter2.formatToParts(now);
      const dnMap: Record<string, string> = {};
      dnParts.forEach(part => {
        if (part.type !== 'literal') dnMap[part.type] = part.value;
      });

      const nowInDenmark = new Date(
        parseInt(dnMap.year),
        parseInt(dnMap.month) - 1,
        parseInt(dnMap.day),
        parseInt(dnMap.hour),
        parseInt(dnMap.minute),
        parseInt(dnMap.second)
      );

      const difference = weddingDate.getTime() - nowInDenmark.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-[#1a1a2e] to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, #f59dbd 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div
        ref={ref}
        className={`max-w-5xl w-full text-center relative z-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <div className="mb-12">
          <div className={`${strings.fonts.title} text-7xl text-[#f59dbd] mb-4 drop-shadow-lg`}>
            {strings.title}
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent mx-auto mb-8" />
          <div className={`${strings.fonts.secondary} text-3xl text-white`}>
            {strings.subtitle}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-[#f59dbd]/30 hover:scale-105 transition-transform duration-300">
            <div className={`${strings.fonts.countdown} text-5xl text-[#f59dbd] font-bold mb-2`}>
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className={`${strings.fonts.secondary} text-lg sm:text-xl text-white`}>
              {strings.days}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-[#f59dbd]/30 hover:scale-105 transition-transform duration-300">
            <div className={`${strings.fonts.countdown} text-5xl text-[#f59dbd] font-bold mb-2`}>
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className={`${strings.fonts.secondary} text-xl text-white`}>
              {strings.hours}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-[#f59dbd]/30 hover:scale-105 transition-transform duration-300">
            <div className={`${strings.fonts.countdown} text-5xl text-[#f59dbd] font-bold mb-2`}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className={`${strings.fonts.secondary} text-xl text-white`}>
              {strings.minutes}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-[#f59dbd]/30 hover:scale-105 transition-transform duration-300">
            <div className={`${strings.fonts.countdown} text-5xl text-[#f59dbd] font-bold mb-2`}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className={`${strings.fonts.secondary} text-xl text-white`}>
              {strings.seconds}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
