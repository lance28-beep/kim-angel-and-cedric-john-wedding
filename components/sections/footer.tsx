"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Instagram, Facebook, MapPin, Calendar, Clock, Heart, MessageCircle } from "lucide-react"

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
      className="relative z-20 mt-16 text-cream overflow-hidden bg-gradient-to-b from-[#402921] via-[#583016] to-[#402921]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#BB8A3D]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-[#CDAC77]/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#BB8A3D]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#CDAC77]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDAC77]/25 to-transparent" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-tl-3xl" />
        {/* Decorative corner images */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-36 sm:w-44 md:w-56 lg:w-64 opacity-80 select-none"
        />
        {/* <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-28 sm:w-36 md:w-48 lg:w-56 opacity-70 rotate-180 select-none"
        /> */}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Wedding date presentation */}
        <motion.div className="flex justify-center px-2 sm:px-4 mb-16" variants={fadeInUp}>
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-xs sm:text-sm md:text-base text-[#E0CFB5] font-semibold uppercase tracking-[0.2em] mb-3 drop-shadow-md">
                Save The Date
              </p>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#D1AB6D]/50" />
                <div className="w-1.5 h-1.5 bg-[#D1AB6D] rounded-full" />
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#D1AB6D]/50" />
              </div>
            </div>

            {/* Date Section */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                {/* Day and Month */}
                <div className="text-center sm:text-right">
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#F0F0F0] leading-none drop-shadow-lg">
                    January
                  </p>
                  <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#D1AB6D] leading-none mt-1 drop-shadow-lg">
                    10
                  </p>
                </div>
                
                {/* Separator */}
                <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-[#D1AB6D]/50 to-transparent" />
                
                {/* Year */}
                <div className="text-center sm:text-left">
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#F0F0F0] leading-none drop-shadow-lg">
                    2026
                  </p>
                </div>
              </div>
            </div>

            {/* Time Section */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D1AB6D] rounded-full animate-pulse" />
                <p className="text-lg sm:text-xl md:text-2xl font-sans font-semibold text-[#E0CFB5] tracking-wide drop-shadow-md">
                  2:00 PM
                </p>
                <div className="w-2 h-2 bg-[#D1AB6D] rounded-full animate-pulse" />
              </div>
            </div>

            {/* Bottom decorative element */}
            <div className="flex items-center justify-center mt-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D1AB6D]/40 to-transparent" />
              <div className="mx-3 w-1 h-1 bg-[#E0CFB5] rounded-full" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#D1AB6D]/40 to-transparent" />
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
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white">Erda & Russell</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-lora text-white/95">
                  <Calendar className="w-5 h-5 text-white/80" />
                  <span className="text-lg">January 10, 2026</span>
                </div>
                <div className="flex items-center gap-3 font-lora text-white/90">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <span>San Jose the Husband of Mary Parish, Buyagan, La Trinidad, Benguet</span>
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
                  <span>San Jose the Husband of Mary Parish, Buyagan, La Trinidad, Benguet</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span>2:00 PM</span>
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
                  <span>D & L Garden Pavilion, Halsema Highway, La Trinidad, Benguet</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h4 className="font-playfair font-bold text-xl mb-6 flex items-center gap-3 text-white">
                <div className="w-2 h-8 bg-white/50 rounded-full" /> Get in Touch
              </h4>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.facebook.com/knginalawagan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
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
              <p className="text-white/85 font-lora text-sm">© {year} Erda & Russell. All rights reserved.</p>
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

        {/* Floating Messenger Button */}
        <a
          href="https://m.me/knginalawagan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on Messenger"
          className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 bg-[#0084FF] hover:bg-[#006AFF] text-white rounded-full shadow-2xl p-4 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          style={{ boxShadow: '0 0 24px 4px #0084FF55, 0 4px 24px 0 #0002' }}
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </footer>
  )
}


