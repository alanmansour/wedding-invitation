import { useState, useEffect } from 'react';
import backsidePhoto from '../../imports/photo_1.png';
import couplePhoto from '../../imports/photo_2.jpg';

interface InvitationCardStrings {
  dearLabel: string;
  dearGuest: string;
  coupleNames: string;
  requestHonor: string;
  celebrationLine: string;
  dateText: string;
  timeText: string;
  addressLine: string;
  venueName: string;
  city: string;
  flipButton: string;
  backButton: string;
  storyTitle: string;
  story: string;
  fonts: {
    title: string;
    secondary: string;
    address: string;
    story: string;
  };
}

interface InvitationCardProps {
  backgroundImage?: string;
  guestName?: string;
  strings: InvitationCardStrings;
  isPlaying: boolean;
  onToggleAudio: () => void;
}

export function InvitationCard({ backgroundImage, guestName, strings, isPlaying, onToggleAudio }: InvitationCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coupleNamesVisible, setCoupleNamesVisible] = useState(false);
  const bgImage = backgroundImage || backsidePhoto;

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 100);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = window.setTimeout(() => setCoupleNamesVisible(true), 500);
      return () => window.clearTimeout(timeout);
    }
  }, [isVisible]);

  return (
    <div className={`perspective-1000 w-full max-w-3xl px-4 transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
    }`}>
      {/* Audio Control Button */}
      <button
        onClick={onToggleAudio}
        className="fixed top-4 right-4 z-50 w-8 h-8 bg-[#f59dbd]/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#e37ba5] transition-all hover:scale-110"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <span className="text-white text-sm">⏸️</span>
        ) : (
          <span className="text-white text-sm">🎵</span>
        )}
      </button>

      <div
        className={`relative w-full preserve-3d transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ minHeight: '800px' }}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden ${
            isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
            {guestName && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4">
                <div className={`${strings.fonts.secondary} text-xl sm:text-2xl md:text-3xl text-[#f59dbd] mb-1`}>
                  {strings.dearLabel}
                </div>
                <div className={`${strings.fonts.secondary} text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-lg whitespace-nowrap leading-tight`}>
                  {guestName}
                </div>
              </div>
            )}

            <div className={`text-center space-y-8 ${guestName ? 'mt-14' : 'mt-12'}`}>

              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent mx-auto" />

              <div className="space-y-3">
                <div className={`${strings.fonts.secondary} text-2xl lg:text-4xl text-[#f59dbd]`}>
                  {strings.requestHonor}
                </div>
                <div className={`${strings.fonts.secondary} text-2xl lg:text-4xl text-[#f59dbd]`}>
                  {strings.celebrationLine}
                </div>
              </div>

              <div className={`${strings.fonts.title} text-5xl lg:text-8xl mb-4 drop-shadow-lg transition-opacity duration-1000 ease-out ${
                coupleNamesVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                {strings.coupleNames}
              </div>

              <div className="space-y-4 mt-8s">
                <div className={`${strings.fonts.secondary} text-3xl lg:text-5xl text-white`}>
                  {strings.dateText}
                </div>
                <div className={`${strings.fonts.secondary} text-3xl lg:text-5xl text-[#f59dbd]`}>
                  {strings.timeText}
                </div>
              </div>

              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent mx-auto" />

              <div className="space-y-3">
                <div className={`${strings.fonts.title} text-4xl lg:text-5xl text-[#f59dbd]`}>
                  {strings.venueName}
                </div>
                <div className={`${strings.fonts.address} text-lg lg:text-xl text-white`}>
                  {strings.addressLine}
                </div>
                <div className={`${strings.fonts.secondary} text-3xl lg:text-4xl text-white`}>
                  {strings.city}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsFlipped(true)}
              className="absolute bottom-4 left-4 px-8 py-3 bg-[#f59dbd] text-white font-['Dancing_Script'] text-lg rounded-full shadow-lg hover:bg-[#e37ba5] transition-all hover:scale-105"
            >
              {strings.flipButton}
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden rotate-y-180 ${
            isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${couplePhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
            <div className="text-center space-y-6 max-w-lg bg-black/10 rounded-2xl p-8 border-2 border-[#f59dbd]/30">
              <div className={`${strings.fonts.title} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f59dbd] mb-6`}>
                {strings.storyTitle}
              </div>

              <div className="space-y-6">
                <div>
                    <div className={`${strings.fonts.story} text-xl sm:text-xl md:text-xl lg:text-2xl text-white mb-4 max-h-96 overflow-y-scroll pr-2 whitespace-pre-line ${
                      isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}>
                    {strings.story}
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent" />

              </div>
            </div>

            <button
              onClick={() => setIsFlipped(false)}
              className="absolute bottom-4 left-4 px-8 py-3 bg-[#f59dbd] text-white font-['Dancing_Script'] text-lg rounded-full shadow-lg hover:bg-[#e37ba5] transition-all hover:scale-105"
            >
              {strings.backButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
