'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { siteConfig } from '@/content/site';
import Image from 'next/image';


interface LoadingScreenProps {
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/boxes/box (1).webp' },
  { src: '/boxes/box (2).webp' },
  { src: '/boxes/box (3).webp' },
];

const MAIN_BW_IMAGE = '/boxes/mobile.webp';
const DESKTOP_BW_IMAGE = '/desktop-background/couple (21).webp';
const STAGGER_DELAY_MS = 4000; // Each image appears every 4 seconds
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());
  const onCompleteRef = useRef(onComplete);

    // Live countdown: days, hours, minutes until wedding
  const countdown = useMemo(() => {
    const weddingDate = new Date(siteConfig.wedding.date);
    const diff = weddingDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [now]);

  const countdownText = useMemo(() => {
    const { days } = countdown;
    if (days === 0) return 'TODAY IS THE DAY';
    if (days === 1) return 'ONE DAY TO GO';
    if (days >= 28 && days <= 31) return 'ONE MONTH TO GO';
    if (days >= 58 && days <= 62) return 'TWO MONTHS TO GO';
    if (days >= 88 && days <= 93) return 'THREE MONTHS TO GO';
    if (days >= 118 && days <= 123) return 'FOUR MONTHS TO GO';
    if (days >= 148 && days <= 153) return 'FIVE MONTHS TO GO';
    return `${days} DAYS TO GO`;
  }, [countdown.days]);

  // Wedding date derived from siteConfig.wedding.date
  const debutDateObj = new Date(siteConfig.wedding.date);
  const debutMonthName = debutDateObj
    .toLocaleString('default', { month: 'short' })
    .toUpperCase(); // e.g. "MAY"
  const debutDay = String(debutDateObj.getDate()).padStart(2, '0'); // e.g. "09"
  const debutYear = String(debutDateObj.getFullYear()); // e.g. "2026"

  const countdownNumbers = [debutMonthName, debutDay, debutYear]; // e.g. May, 09, 2026
  const countdownLabels = ['Month', 'Day', 'Year']; // should return Month, Day, Year

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(() => onCompleteRef.current(), 500);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;
  const productionCredit = '';



  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        {/* Mobile background */}
        <Image
          src={MAIN_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center md:hidden"
          sizes="100vw"
          priority
        />
        {/* Desktop background (md and above) */}
        <Image
          src={DESKTOP_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center hidden md:block"
          sizes="100vw"
          priority
        />
        {/* Base gradient overlay for image readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(18, 21, 35, 0.62) 0%, rgba(18, 21, 35, 0.18) 34%, rgba(18, 21, 35, 0.24) 70%, rgba(18, 21, 35, 0.72) 100%)`,
          }}
        />
        {/* Motif colour gradient — sits above image, behind all text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              160deg,
              rgba(82, 31, 52, 0.56) 0%,
              rgba(17, 43, 77, 0.30) 38%,
              rgba(194, 146, 62, 0.16) 70%,
              rgba(69, 19, 45, 0.66) 100%
            )`,
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Top: Save the Date + countdown */}
        <div className="flex flex-col items-center justify-center w-full pt-10 sm:pt-14 md:pt-20 px-4 sm:px-6 flex-shrink-0">
          <div className="w-full max-w-lg mx-auto flex flex-col items-center">

            {/* "Save the Date:" — Brittany Signature Script */}
            <h1
              className="text-center leading-none mb-1 sm:mb-2"
              style={{
                fontFamily: 'var(--font-brittany), cursive',
                fontSize: 'clamp(3.5rem, 14vw, 7rem)',
                color: '#f9f1e4',
                textShadow:
                  '0 2px 18px rgba(0,0,0,0.62), 0 0 30px rgba(214,170,96,0.32)',
                letterSpacing: '0.01em',
              }}
            >
              Save the Date
            </h1>

            {/* Thin accent rule */}
            <div
              className="w-24 sm:w-32 h-px my-3 sm:my-4"
              style={{
                background: `linear-gradient(90deg, transparent, var(--color-motif-accent), transparent)`,
              }}
            />

            {/* Countdown text — Agrandir Wide Bold */}
            <h2 className="text-center">
              <span
                className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.10em] sm:tracking-[0.14em] uppercase leading-tight px-2"
                style={{
                  fontFamily: 'var(--font-agrandir), sans-serif',
                  fontWeight: 700,
                  color: '#f4ebe0',
                  textShadow:
                    '0 2px 14px rgba(0,0,0,0.58), 0 0 24px rgba(202,152,74,0.38), 0 0 42px rgba(78,24,49,0.55)',
                }}
              >
                {countdownText}
              </span>
            </h2>

          </div>
        </div>

        {/* Spacer - lets B&W image dominate (upper 2/3) */}
        <div className="flex-1 min-h-[12vh]" />

        {/* Middle: Three color countdown boxes - staggered reveal */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 py-4 flex-shrink-0">
          {COUNTDOWN_BOXES.map((item, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={i}
                className="relative flex-1 max-w-[28vw] sm:max-w-[140px] md:max-w-[160px] aspect-[3/4] overflow-hidden rounded-3xl border border-white/45 bg-white/10 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(28px) scale(0.94)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <Image
                  src={item.src}
                  alt={coupleNames}
                  fill
                  className="object-cover scale-105"
                  sizes="(max-width: 640px) 28vw, 160px"
                />
                {/* Gradient overlay — darkens bottom for text contrast */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(
                      to bottom,
                      rgba(80,17,46,0.15) 0%,
                      rgba(24,44,73,0.12) 42%,
                      rgba(54,13,34,0.74) 100%
                    )`,
                  }}
                />

                {/* Counter number + label — centered in lower half */}
                <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-end pb-3 sm:pb-4">
                  <span
                    className="select-none leading-none font-black tracking-[0.03em]"
                    style={{
                      fontFamily: 'var(--font-agrandir), sans-serif',
                      fontSize: 'clamp(2rem, 9vw, 3.8rem)',
                      color: '#f7efe3',
                      textShadow:
                        '0 2px 12px rgba(0,0,0,0.72), 0 0 20px rgba(208,162,88,0.34)',
                    }}
                  >
                    {countdownNumbers[i]}
                  </span>
                  <span
                    className="mt-1 uppercase font-extrabold"
                    style={{
                      fontFamily: 'var(--font-agrandir), sans-serif',
                      fontSize: 'clamp(0.46rem, 1.8vw, 0.68rem)',
                      letterSpacing: '0.24em',
                      color: 'rgba(246, 236, 226, 0.92)',
                      textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                    }}
                  >
                    {countdownLabels[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Names + production credit + progress bar */}
        <div className="flex flex-col items-center justify-center w-full py-6 sm:py-8 px-4 flex-shrink-0">
          {/* "Almost ready for" — small caps label */}
          <p
            className="text-center text-[10px] sm:text-xs tracking-[0.30em] uppercase mb-1.5"
            style={{
              fontFamily: 'var(--font-agrandir), sans-serif',
              color: 'rgba(231, 223, 215, 0.92)',
              textShadow: '0 1px 8px rgba(0,0,0,0.6)',
            }}
          >
            Almost ready for
          </p>

          {/* Couple names — Brittany Signature Script */}
          <div
            className="text-center leading-none mb-1"
            style={{
              fontFamily: 'var(--font-brittany), cursive',
              fontSize: 'clamp(2.2rem, 9vw, 4.5rem)',
              color: '#f9f1e4',
              textShadow: '0 2px 16px rgba(0,0,0,0.58), 0 0 24px rgba(206,160,88,0.30)',
            }}
          >
            {coupleNames}
          </div>

          {productionCredit && (
            <p
              className="text-[10px] sm:text-xs font-sans tracking-wider"
              style={{ color: 'var(--color-motif-soft)' }}
            >
              {productionCredit}
            </p>
          )}

          {/* "Crafting your invitation experience" */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.28em] mt-4 mb-3 uppercase text-center "
            style={{
              fontFamily: 'var(--font-agrandir), sans-serif',
              color: 'rgba(231, 223, 215, 0.90)',
              textShadow: '0 1px 8px rgba(0,0,0,0.6)',
            }}
          >
            Getting Ready to Explore Our Wedding Website
          </p>
          <div className="w-full max-w-xs mx-auto">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #b88234 0%, #d6ac6d 55%, #efd2a4 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};