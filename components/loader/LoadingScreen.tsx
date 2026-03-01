import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update progress smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 160);

    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#606C60'
        }}
      />

      <div className="relative flex flex-col items-center justify-center w-full px-8 sm:px-12 md:px-16">
        {/* Monogram Logo */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          <div className="relative w-28 sm:w-40 h-28 sm:h-40">
            <Image
              src="/monogram/updatedMonogram.png"
              alt="Monogram"
              fill
              className="object-contain"
              priority
              style={{ filter: 'brightness(0) saturate(100%) invert(89%) sepia(5%) saturate(800%) hue-rotate(10deg) brightness(105%) contrast(90%)' }}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="text-center w-full max-w-sm sm:max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Couple names */}
          <div
            className="text-3xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 leading-tight"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400, fontStyle: 'normal', color: '#E1D5C7' }}
          >
            <div>{siteConfig.couple.groomNickname}</div>
            <div>&</div>
            <div>{siteConfig.couple.brideNickname}</div>
          </div>

          {/* Message */}
          <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
            <p
              className="text-sm sm:text-base leading-relaxed sm:leading-loose tracking-wide"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, color: '#E1D5C7' }}
            >
              Behind the scenes, something beautiful is gently coming together—woven with love, dreams, and shared moments. This space is being shaped with care, patience, and heartfelt intention.
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed sm:leading-loose tracking-wide"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, color: '#E1D5C7' }}
            >
              Please hold on for just a moment as we reveal something special, made not just to be seen, but to be felt.
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative w-full max-w-xs sm:max-w-sm h-0.5 mx-auto rounded-full overflow-hidden mb-3 sm:mb-4" style={{ backgroundColor: 'rgba(225, 213, 199, 0.3)' }}>
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%`, backgroundColor: '#E1D5C7' }}
            />
          </div>
          
          {/* Progress percentage */}
          <p
            className="text-[8px] sm:text-[9px] tracking-[0.2em]"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, color: '#E1D5C7' }}
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};