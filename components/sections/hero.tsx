"use client"

import { useEffect, useState, useMemo } from "react"
import { Heart, Sparkles, Download } from "lucide-react"

const desktopImages = [
    "/desktop-background/couple (1).jpg",
    "/desktop-background/couple (2).jpg",
    "/desktop-background/couple (3).jpg",
    "/desktop-background/couple (4).jpg",
    "/desktop-background/couple (5).jpg",
    "/desktop-background/couple (6).jpg",
    "/desktop-background/couple (7).jpg",
    "/desktop-background/couple (8).jpg",
    "/desktop-background/couple (9).jpg",
    "/desktop-background/couple (10).jpg",
    "/desktop-background/couple (11).jpg",
    "/desktop-background/couple (12).jpg",
    "/desktop-background/couple (13).jpg",
    "/desktop-background/couple (14).jpg",
    "/desktop-background/couple (15).jpg",
    "/desktop-background/couple (16).jpg",
    "/desktop-background/couple (17).jpg",
    "/desktop-background/couple (18).jpg",
    "/desktop-background/couple (19).jpg",
    "/desktop-background/couple (20).jpg",
    "/desktop-background/couple (21).jpg",
    "/desktop-background/couple (22).jpg",
    "/desktop-background/couple (23).jpg", 
    "/desktop-background/couple (24).jpg",
    "/desktop-background/couple (25).jpg",
    "/desktop-background/couple (26).jpg",
    "/desktop-background/couple (27).jpg",
    "/desktop-background/couple (28).jpg",
    "/desktop-background/couple (29).jpg",
    "/desktop-background/couple (30).jpg",
    "/desktop-background/couple (31).jpg",
    "/desktop-background/couple (32).jpg",
    "/desktop-background/couple (33).jpg",
    "/desktop-background/couple (34).jpg",
    "/desktop-background/couple (35).jpg",
    "/desktop-background/couple (36).jpg",
    "/desktop-background/couple (37).jpg",
    "/desktop-background/couple (38).jpg",
    "/desktop-background/couple (39).jpg",
    "/desktop-background/couple (40).jpg",
    "/desktop-background/couple (41).jpg",
    "/desktop-background/couple (42).jpg",
    "/desktop-background/couple (43).jpg",
    "/desktop-background/couple (44).jpg",
    "/desktop-background/couple (45).jpg",
    "/desktop-background/couple (46).jpg",
    "/desktop-background/couple (47).jpg",
    "/desktop-background/couple (48).jpg",
    "/desktop-background/couple (49).jpg",
    "/desktop-background/couple (50).jpg",
    "/desktop-background/couple (51).jpg",
    "/desktop-background/couple (52).jpg",
    "/desktop-background/couple (53).jpg",
    "/desktop-background/couple (54).jpg",
    "/desktop-background/couple (55).jpg",
    "/desktop-background/couple (56).jpg",
    "/desktop-background/couple (57).jpg",
    "/desktop-background/couple (58).jpg",
    "/desktop-background/couple (59).jpg",
    "/desktop-background/couple (60).jpg",
    "/desktop-background/couple (61).jpg",
    "/desktop-background/couple (62).jpg",
    "/desktop-background/couple (63).jpg",
    "/desktop-background/couple (64).jpg",
    "/desktop-background/couple (65).jpg",
    "/desktop-background/couple (66).jpg",
    "/desktop-background/couple (67).jpg",
    "/desktop-background/couple (68).jpg",
    "/desktop-background/couple (69).jpg",
    "/desktop-background/couple (70).jpg",
    "/desktop-background/couple (71).jpg",
    "/desktop-background/couple (72).jpg",

]

const mobileImages = [
    "/mobile-background/couple (1).jpg",
    "/mobile-background/couple (2).jpg",
    "/mobile-background/couple (3).jpg",
    "/mobile-background/couple (4).jpg",
    "/mobile-background/couple (5).jpg",
    "/mobile-background/couple (6).jpg",
    "/mobile-background/couple (7).jpg",
    "/mobile-background/couple (8).jpg",
    "/mobile-background/couple (9).jpg",
    "/mobile-background/couple (10).jpg",
    "/mobile-background/couple (11).jpg",
    "/mobile-background/couple (12).jpg",
    "/mobile-background/couple (13).jpg",
    "/mobile-background/couple (14).jpg",
    "/mobile-background/couple (15).jpg",
    "/mobile-background/couple (16).jpg",
    "/mobile-background/couple (17).jpg",
    "/mobile-background/couple (18).jpg",
    "/mobile-background/couple (19).jpg",
    "/mobile-background/couple (20).jpg",

]

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    // Check on mount
    checkScreenSize()
    
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Get the appropriate image array based on screen size
  const backgroundImages = useMemo(() => {
    return isMobile ? mobileImages : desktopImages
  }, [isMobile])

  // Preload images progressively - show first image immediately
  useEffect(() => {
    setImagesLoaded(false)
    setCurrentImageIndex(0)
    
    // Load first image with priority to show it immediately
    const firstImg = new Image()
    firstImg.src = backgroundImages[0]
    firstImg.onload = () => {
      setImagesLoaded(true) // Show first image immediately
    }
    
    // Then preload a small lookahead set in background (avoid preloading all)
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) return
      backgroundImages.slice(1, 3).forEach((src) => {
        const img = new Image()
        img.decoding = 'async'
        img.loading = 'lazy' as any
        img.src = src
      })
    }, 200)
  }, [backgroundImages])

  useEffect(() => {
    if (!imagesLoaded) return
    
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageTimer)
  }, [imagesLoaded, backgroundImages])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (imagesLoaded) {
      setIsVisible(true)
    }
  }, [imagesLoaded])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#AFC8E6]">
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded && backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              willChange: "opacity",
            }}
          />
        ))}
        {/* Enhanced gradient overlay with better depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#AFC8E6]/95 via-[#AFC8E6]/50 via-[#AFC8E6]/30 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#AFC8E6]/20 z-0" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-end min-h-screen pb-12 sm:pb-20 md:pb-28 lg:pb-40 xl:pb-48">
        <div className={`w-full max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
                    {/* Decorative divider */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 py-2">
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-[#F1EDE2]/60 to-[#F1EDE2]" />
              <Heart size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F1EDE2] fill-[#F1EDE2]/40 drop-shadow-md animate-pulse" />
              <Sparkles size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#F1EDE2]/80 drop-shadow-md" />
              <Heart size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F1EDE2] fill-[#F1EDE2]/40 drop-shadow-md animate-pulse" />
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-[#F1EDE2]/60 to-[#F1EDE2]" />
            </div>
          {/* Invitation header */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-[#FFFFFF]/95 drop-shadow-lg tracking-wider uppercase">
              PLEASE JOIN US FOR
            </p>
  
          </div>

          {/* The Big Bang Wedding */}
          <div className="space-y-2 sm:space-y-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#F1EDE2] drop-shadow-2xl tracking-wide"
              style={{
                textShadow: "0 2px 20px rgba(241, 237, 226, 0.6), 0 4px 40px rgba(175, 200, 230, 0.5), 0 8px 60px rgba(0, 0, 0, 0.4)",
              }}
            >
              The Big Bang Wedding
            </h2>
            {/* <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-[#FFFFFF]/90 drop-shadow-lg"
              style={{
                textShadow: "0 2px 10px rgba(175, 200, 230, 0.8), 0 1px 3px rgba(0,0,0,0.7)",
              }}
            >
              of
            </p> */}
          </div>

          {/* Couple names */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold tracking-[0.02em] sm:tracking-[0.03em] md:tracking-[0.04em] drop-shadow-2xl leading-tight whitespace-nowrap flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8"
              style={{
                color: '#FFFFFF',
                textShadow: "0 2px 20px rgba(216, 176, 176, 0.4), 0 4px 40px rgba(175, 200, 230, 0.6), 0 8px 60px rgba(0, 0, 0, 0.5)",
                fontFamily: "var(--font-serif)",
                letterSpacing: "0.05em",
              }}
            >
              <span className="inline-block transform transition-all duration-700 hover:scale-105">
                Nikki
              </span>
              <span className="text-[#D8B0B0] text-[1.2em]">&</span>
              <span className="inline-block transform transition-all duration-700 hover:scale-105">
                Geofrey
              </span>
            </h1>
            {/* Elegant divider */}
            <div className="h-0.5 sm:h-1 w-20 sm:w-24 md:w-32 lg:w-40 mx-auto bg-gradient-to-r from-transparent via-[#D8B0B0] to-transparent shadow-[0_0_10px_rgba(216,176,176,0.5)]" />
          </div>

          {/* Date and time information */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 pt-2 sm:pt-4">
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-[#FFFFFF] drop-shadow-lg"
              style={{
                textShadow: "0 2px 12px rgba(175, 200, 230, 0.8), 0 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              at 1:30 PM, 23rd December 2025
            </p>

            {/* Venue information */}
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-[#F1EDE2] drop-shadow-lg tracking-wide"
              style={{
                textShadow: "0 2px 10px rgba(175, 200, 230, 0.9), 0 1px 4px rgba(241, 237, 226, 0.5)",
              }}
            >
              St. Rose of Lima Parish Bacacay, Albay
            </p>
          </div>

          {/* CTA Buttons - Horizontal layout on all devices */}
          <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center items-center max-w-2xl mx-auto w-full px-2">
            <a
              href="#narrative"
              className="group flex-1 max-w-[200px] sm:max-w-none sm:min-w-[140px] md:min-w-[160px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-500 ease-out uppercase tracking-wider text-[10px] sm:text-xs md:text-sm whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "#AFC8E6",
                borderColor: "rgba(241, 237, 226, 0.5)",
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(175, 200, 230, 0.5), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(175, 200, 230, 0.9)";
                e.currentTarget.style.borderColor = "rgba(241, 237, 226, 0.8)";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(175, 200, 230, 0.7), 0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(241, 237, 226, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#AFC8E6";
                e.currentTarget.style.borderColor = "rgba(241, 237, 226, 0.5)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(175, 200, 230, 0.5), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                Our Love Story
                <Heart size={12} className="w-3 h-3 sm:w-4 sm:h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F1EDE2]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
              />
            </a>
            <a
              href="#guest-list"
              className="group flex-1 max-w-[200px] sm:max-w-none sm:min-w-[140px] md:min-w-[160px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-500 ease-out uppercase tracking-wider text-[10px] sm:text-xs md:text-sm whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "#D8B0B0",
                borderColor: "rgba(241, 237, 226, 0.5)",
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(216, 176, 176, 0.5), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(216, 176, 176, 0.9)";
                e.currentTarget.style.borderColor = "rgba(241, 237, 226, 0.8)";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(216, 176, 176, 0.7), 0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(241, 237, 226, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#D8B0B0";
                e.currentTarget.style.borderColor = "rgba(241, 237, 226, 0.5)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(216, 176, 176, 0.5), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                RSVP
                <Sparkles size={12} className="w-3 h-3 sm:w-4 sm:h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFFFFF]/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
              />
            </a>
            <a
              href="/Details/Wedding-Invitation-1%20(1).pdf"
              download="Wedding-Invitation.pdf"
              className="group flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-500 ease-out uppercase tracking-wider text-[10px] sm:text-xs md:text-sm whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "transparent",
                borderColor: "#F1EDE2",
                color: "#F1EDE2",
                boxShadow: "0 4px 20px rgba(241, 237, 226, 0.3), 0 2px 6px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(241, 237, 226, 0.1)";
                e.currentTarget.style.borderColor = "#F1EDE2";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(241, 237, 226, 0.5), 0 4px 12px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "#F1EDE2";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(241, 237, 226, 0.3), 0 2px 6px rgba(0,0,0,0.2)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                <Download size={16} className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#F1EDE2" }} />
                <span className="hidden sm:inline">Invitation</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
