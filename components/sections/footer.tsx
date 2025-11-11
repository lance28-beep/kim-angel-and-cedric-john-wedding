"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2, MessageCircle } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  const quotes = [
    "In every love story, there's a moment when two hearts become one, and ours is just beginning.",
    "Two souls, one heart—forever entwined in the journey of love and faith together.",
    "Love is not about finding the perfect person, but learning to see an imperfect person perfectly."
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#story" },
    { label: "Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Snap & Share", href: "#snap-share" },
    { label: "RSVP", href: "#guest-list" },
  ] as const

  return (
    <footer 
      className="relative z-20 mt-16 text-cream overflow-hidden bg-gradient-to-b from-[#AFC8E6] via-[#D8B0B0] to-[#AFC8E6]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#D8B0B0]/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-[#F1EDE2]/18 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#D8B0B0]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#F1EDE2]/16 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8B0B0]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F1EDE2]/25 to-transparent" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#D8B0B0]/15 via-[#F1EDE2]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#D8B0B0]/15 via-[#F1EDE2]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#D8B0B0]/15 via-[#F1EDE2]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#D8B0B0]/15 via-[#F1EDE2]/10 to-transparent rounded-tl-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Wedding date presentation */}
        <motion.div className="flex justify-center px-4 mb-16" variants={fadeInUp}>
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-1 h-1 bg-white/60 rounded-full" />
              </div>
              
              {/* Save The Date text */}
              <p className="text-xs sm:text-sm md:text-base font-sans font-medium text-white uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                Save The Date
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-1 h-1 bg-white/60 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-white leading-none" style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 300
                }}>
                  December
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point */}
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-serif font-bold text-white leading-none drop-shadow-lg" style={{
                  textShadow: "0 4px 20px rgba(255, 255, 255, 0.3)"
                }}>
                  23
                </p>
                
                {/* Vertical divider */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-white/50" />
                
                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-none">
                  2025
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-1 h-1 bg-white/60 rounded-full" />
              </div>
              
              {/* Time */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-medium text-white tracking-wide mb-3 sm:mb-4">
                1:30 PM
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-1 h-1 bg-white/60 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12" variants={staggerChildren} initial="initial" animate="animate">
          {/* Couple Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white">Nikki & Geofrey</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-lora text-white/95">
                  <Calendar className="w-5 h-5 text-white/80" />
                  <span className="text-lg">December 23, 2025</span>
                </div>
                <div className="flex items-center gap-3 font-lora text-white/90">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <span>St. Rose of Lima Parish, Bacacay, Albay</span>
                </div>
              </div>
            </div>

            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className="font-lora text-white/95 italic text-lg leading-relaxed min-h-[80px]">
                "{displayedText}
                <span className="inline-block w-0.5 h-6 bg-white/95 ml-1 animate-pulse">|</span>"
              </blockquote>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-white/70 rounded-full" />
                <div className="w-2 h-2 bg-white/50 rounded-full" />
                <div className="w-2 h-2 bg-white/70 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-playfair font-bold text-xl text-white">Ceremony</h4>
              </div>
              <div className="space-y-3 font-lora text-white/90 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span>St. Rose of Lima Parish, Bacacay, Albay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span>1:30 PM</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-playfair font-bold text-xl text-white">Reception</h4>
              </div>
              <div className="space-y-3 font-lora text-white/90 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span>Tres Hijos Hotel and Resort, Sto. Domingo, Albay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span>4:30 PM</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h4 className="font-playfair font-bold text-xl mb-6 flex items-center gap-3 text-white">
                <div className="w-2 h-8 bg-white/50 rounded-full" /> Follow Us
              </h4>
              <div className="flex items-center gap-3 flex-wrap">
                <a 
                  href="https://www.facebook.com/nikkibalane" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="TikTok"
                >
                  <Music2 className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-playfair font-bold text-lg mb-4 text-white">Quick Links</h5>
              <div className="space-y-2">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className="block text-white/80 hover:text-white transition-colors duration-200 font-lora text-sm">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className="border-t border-white/20 pt-8" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/85 font-lora text-sm">© {year} Nikki & Geofrey. All rights reserved.</p>
              <p className="text-white/90 font-lora text-sm mt-1">
                Made with 💕 for our special day
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-1">
              <p className="text-white/80 font-lora text-xs">
                Developed by{" "}
                <a 
                  href="https://lance28-beep.github.io/portfolio-website/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                >
                  Lance Valle
                </a>
              </p>
              <p className="text-white/80 font-lora text-xs">
                Want a website like this? Visit{" "}
                <a 
                  href="https://www.facebook.com/WeddingInvitationNaga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
      
      {/* Floating Messenger Button */}
      <a
        href="https://m.me/nikkibalane"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on Messenger"
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 bg-[#0084FF] hover:bg-[#006AFF] text-white rounded-full shadow-2xl p-4 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
        style={{ boxShadow: '0 0 24px 4px #0084FF55, 0 4px 24px 0 #0002' }}
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  )
}


