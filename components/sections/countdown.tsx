"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"
import { Heart, Sparkles } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: December 23, 2025 at 1:30 PM GMT+8
      // Compute using UTC to avoid timezone parsing inconsistencies across browsers
      // 1:30 PM GMT+8 == 05:30 AM UTC
      const targetDate = Date.UTC(2025, 11, 23, 5, 30, 0) // December is month 11 (0-indexed)
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Wedding has passed or is happening now
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-4 sm:gap-5">
      {/* Enhanced elegant card with better depth */}
      <div className="relative group">
        {/* Animated glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-br from-[#FFFFFF]/30 via-[#D8B0B0]/20 to-[#F1EDE2]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl animate-pulse" />
        
        {/* Outer glow ring */}
        <div className="absolute -inset-1 bg-gradient-to-br from-[#D8B0B0]/40 to-[#F1EDE2]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main card with enhanced styling */}
        <div className="relative bg-gradient-to-br from-white/98 via-white/95 to-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-10 lg:py-8 border-2 border-white/50 shadow-2xl hover:shadow-[0_20px_60px_rgba(216,176,176,0.4)] transition-all duration-500 hover:scale-105 hover:border-[#D8B0B0]/60 min-w-[70px] sm:min-w-[85px] md:min-w-[100px] lg:min-w-[120px] transform hover:-translate-y-2">
          {/* Shine effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={42}
              padding={8}
              gap={4}
              textColor="#AFC8E6"
              fontWeight={700}
              borderRadius={12}
              horizontalPadding={6}
              gradientHeight={12}
              gradientFrom="rgba(175,200,230,0.1)"
              gradientTo="transparent"
            />
          </div>
        </div>
      </div>

      {/* Enhanced label with better typography */}
      <span className="text-sm sm:text-base font-semibold text-[#FFFFFF] uppercase tracking-[0.15em] drop-shadow-lg" style={{
        textShadow: "0 2px 8px rgba(0,0,0,0.2), 0 1px 3px rgba(175,200,230,0.3)"
      }}>
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-[#AFC8E6] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Enhanced background elements with subtle patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/10 via-white/5 to-transparent" />
        
        {/* Subtle animated circles for visual interest */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#D8B0B0]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        {/* Bottom-left flower decoration with enhanced styling */}
        <img
          src="/decoration/rigth-bottom-corner-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-80 select-none pointer-events-none scale-x-[-1] transition-opacity duration-1000"
        />
        
        {/* Bottom-right flower decoration */}
        <img
          src="/decoration/rigth-bottom-corner-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-10 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-80 select-none pointer-events-none transition-opacity duration-1000"
        />
      </div>

      {/* Enhanced Header with decorative elements */}
      <div className={`relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Decorative divider above title */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-white/60 to-white" />
          <Heart size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-white fill-white/40 drop-shadow-md animate-pulse" />
          <Sparkles size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/80 drop-shadow-md" />
          <Heart size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-white fill-white/40 drop-shadow-md animate-pulse" />
          <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-white/60 to-white" />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFFFFF] mb-5 sm:mb-6 md:mb-8 drop-shadow-2xl" style={{
          textShadow: "0 4px 20px rgba(0,0,0,0.2), 0 2px 10px rgba(216,176,176,0.3), 0 8px 30px rgba(175,200,230,0.4)"
        }}>
          Countdown to Our Special Day
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-[#FFFFFF]/95 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg" style={{
          textShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          Every moment brings us closer to forever
        </p>
      </div>

      {/* Main countdown container with enhanced layout */}
      <div className={`relative z-10 transition-all duration-1000 ease-out delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20 flex-wrap px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Enhanced Wedding date presentation */}
        <div className="flex justify-center px-4">
          <div className="max-w-3xl w-full">
            {/* Save The Date Header with enhanced styling */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              {/* Top decorative elements */}
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
                <div className="w-1.5 h-1.5 bg-[#D8B0B0]/70 rounded-full shadow-lg" />
                <div className="w-1 h-1 bg-[#D8B0B0]/50 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#D8B0B0]/70 rounded-full shadow-lg" />
              </div>
              
              {/* Save The Date text with enhanced styling */}
              <p className="text-sm sm:text-base md:text-lg font-sans font-semibold text-[#FFFFFF] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-5 drop-shadow-md" style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)"
              }}>
                Save The Date
              </p>
              
              {/* Bottom decorative elements */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#D8B0B0]/70 rounded-full shadow-lg" />
                <div className="w-1 h-1 bg-[#D8B0B0]/50 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#D8B0B0]/70 rounded-full shadow-lg" />
              </div>
            </div>

            {/* Enhanced Date Section */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              {/* Month with enhanced styling */}
              <div className="mb-5 sm:mb-6 md:mb-8">
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-[#FFFFFF] leading-none drop-shadow-2xl" style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  textShadow: "0 4px 20px rgba(0,0,0,0.3), 0 2px 10px rgba(0,0,0,0.2)"
                }}>
                  December
                </p>
              </div>
              
              {/* Day and Year with enhanced layout */}
              <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10">
                {/* Day - Enhanced focal point */}
                <p className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-serif font-bold text-[#FFFFFF] leading-none drop-shadow-2xl transition-transform duration-500 hover:scale-105" style={{
                  textShadow: "0 6px 30px rgba(0,0,0,0.4), 0 3px 15px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.2)"
                }}>
                  23
                </p>
                
                {/* Enhanced vertical divider */}
                <div className="h-20 sm:h-24 md:h-28 lg:h-32 w-0.5 bg-gradient-to-b from-transparent via-[#D8B0B0]/60 to-transparent shadow-lg" />
                
                {/* Year with enhanced styling */}
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#FFFFFF] leading-none drop-shadow-xl" style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.3), 0 2px 10px rgba(0,0,0,0.2)"
                }}>
                  2025
                </p>
              </div>
            </div>

            {/* Enhanced Time Section */}
            <div className="text-center">
              {/* Top decorative elements */}
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
                <div className="w-1.5 h-1.5 bg-[#D8B0B0]/70 rounded-full shadow-lg" />
                <div className="w-1 h-1 bg-[#D8B0B0]/50 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#D8B0B0]/70 rounded-full shadow-lg" />
              </div>
              
              {/* Time with enhanced styling */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-semibold text-[#FFFFFF] tracking-wide mb-4 sm:mb-5 drop-shadow-lg" style={{
                textShadow: "0 3px 15px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)"
              }}>
                1:30 PM
              </p>
              
              {/* Bottom decorative elements */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#D8B0B0]/70 rounded-full shadow-lg" />
                <div className="w-1 h-1 bg-[#D8B0B0]/50 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#D8B0B0]/70 rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
