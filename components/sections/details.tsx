"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Utensils, Car, Shirt, Copy, Check, Navigation, Heart, Users, Camera, X, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImageModal) {
        setShowImageModal(null)
      }
    }
    
    if (showImageModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showImageModal])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.reception.location)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="details" className="relative bg-gradient-to-b from-[#F1EDE2] via-[#F1EDE2]/95 to-[#F1EDE2] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes with color palette */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#AFC8E6]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-[#D8B0B0]/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#AFC8E6]/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-[#D8B0B0]/12 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines with gradient */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#AFC8E6]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8B0B0]/25 to-transparent" />
        
        {/* Corner decorative elements with color palette */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#AFC8E6]/15 via-[#D8B0B0]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#AFC8E6]/15 via-[#D8B0B0]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#AFC8E6]/15 via-[#D8B0B0]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#AFC8E6]/15 via-[#D8B0B0]/10 to-transparent rounded-tl-3xl" />
      </div>

      <div className="relative z-10 text-center mb-12 sm:mb-16 lg:mb-20 px-4">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#AFC8E6]/60 to-[#D8B0B0]/30" />
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#AFC8E6] rounded-full" />
            <div className="w-1 h-1 bg-[#D8B0B0] rounded-full self-center" />
            <div className="w-2 h-2 bg-[#AFC8E6] rounded-full" />
          </div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#AFC8E6]/60 to-[#D8B0B0]/30" />
        </div>
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-balance drop-shadow-lg relative">
          <span className="relative z-10" style={{ color: '#1a1a1a' }}>
            Event Details
          </span>
        </h2>
        <p className="text-lg md:text-xl font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed mb-8" style={{ color: '#1a1a1a' }}>
          Everything you need to know about our special day
        </p>
        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D8B0B0]/40 to-[#D8B0B0]/20" />
          <div className="w-1 h-1 bg-[#D8B0B0] rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#D8B0B0]/40 to-[#D8B0B0]/20" />
        </div>
      </div>

      {/* Ceremony and Reception */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Ceremony */}
        <div 
          className="bg-gradient-to-br from-[#F1EDE2] via-[#D8B0B0]/25 to-[#F1EDE2] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(216,176,176,0.15)] border-2 border-[#AFC8E6]/60 hover:border-[#AFC8E6] hover:shadow-[0_12px_48px_rgba(175,200,230,0.25)] transition-all duration-700 hover:scale-[1.02] group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('ceremony')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Enhanced Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#AFC8E6]/20 via-[#D8B0B0]/15 to-[#AFC8E6]/20 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-[#D8B0B0]/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
          
          {/* Inner decorative border with gradient */}
          <div className="absolute inset-2 border border-[#AFC8E6]/40 rounded-2xl" />
          
          {/* Shimmer effect layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-3xl" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3 sm:gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`bg-gradient-to-br from-[#AFC8E6]/30 via-[#D8B0B0]/20 to-[#AFC8E6]/30 p-2.5 sm:p-3 md:p-4 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-lg ${hoveredCard === 'ceremony' ? 'scale-110 rotate-[3deg]' : ''}`}>
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="#D8B0B0" style={{ color: '#AFC8E6' }} />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>Ceremony</h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="p-2 sm:p-2.5 hover:bg-gradient-to-br hover:from-[#AFC8E6]/10 hover:to-[#AFC8E6]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Open in Google Maps"
                style={{ color: '#1a1a1a' }}
              >
                <Navigation className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.ceremony.location, 'ceremony')}
                className="p-2 sm:p-2.5 hover:bg-gradient-to-br hover:from-[#AFC8E6]/10 hover:to-[#AFC8E6]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Copy ceremony details"
                style={{ color: '#1a1a1a' }}
              >
                {copiedItems.has('ceremony') ? <Check className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 relative z-10">
            <p className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: '#1a1a1a' }}>{siteConfig.ceremony.venue}</p>
            <p className="text-xs sm:text-sm opacity-70" style={{ color: '#1a1a1a' }}>{siteConfig.ceremony.location.split(',')[1]?.trim() || siteConfig.ceremony.location.split(',')[0]?.trim()}, {siteConfig.ceremony.location.split(',')[2]?.trim() || ''}</p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base" style={{ color: '#1a1a1a' }}>
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: '#AFC8E6' }} />
              <span>
                {siteConfig.ceremony.date} at {siteConfig.ceremony.time}
              </span>
            </div>
          </div>
          
          {/* Ceremony Image */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div 
              className="relative w-full h-36 sm:h-44 md:h-52 rounded-2xl overflow-hidden shadow-lg cursor-pointer group/image transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98] border-2 border-[#AFC8E6]/30 group-hover:border-[#AFC8E6]/50"
              onClick={() => setShowImageModal('ceremony')}
            >
              <Image
                src="/Details/RoseofLimaParish.jpg"
                alt={siteConfig.ceremony.location}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#D8B0B0]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-[#AFC8E6]/0 group-hover:bg-[#AFC8E6]/20 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="bg-[#F1EDE2]/90 backdrop-blur-sm rounded-full p-3 shadow-xl border-2 border-[#AFC8E6]/40">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" style={{ color: '#AFC8E6' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-10">
            <button
              onClick={() => setShowImageModal('ceremony')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg text-white"
              style={{ background: 'linear-gradient(to right, #AFC8E6, #AFC8E6)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #9BB5D8, #AFC8E6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #AFC8E6, #AFC8E6)'
              }}
            >
              <Camera className="w-4 h-4" />
              <span>View Venue</span>
            </button>
            <button
              onClick={() => openInMaps(ceremonyMapsLink)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#D8B0B0]/15"
              style={{ borderColor: '#AFC8E6', color: '#1a1a1a' }}
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
          </div>
        </div>

        {/* Reception */}
        <div 
          className="bg-gradient-to-br from-[#F1EDE2] via-[#D8B0B0]/25 to-[#F1EDE2] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(216,176,176,0.15)] border-2 border-[#D8B0B0]/60 hover:border-[#D8B0B0] hover:shadow-[0_12px_48px_rgba(216,176,176,0.25)] transition-all duration-700 hover:scale-[1.02] group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('reception')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Enhanced Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#D8B0B0]/20 via-[#AFC8E6]/15 to-[#D8B0B0]/20 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-[#AFC8E6]/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
          
          {/* Inner decorative border with gradient */}
          <div className="absolute inset-2 border border-[#D8B0B0]/40 rounded-2xl" />
          
          {/* Shimmer effect layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-3xl" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3 sm:gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`bg-gradient-to-br from-[#D8B0B0]/30 via-[#AFC8E6]/20 to-[#D8B0B0]/30 p-2.5 sm:p-3 md:p-4 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-lg ${hoveredCard === 'reception' ? 'scale-110 rotate-[3deg]' : ''}`}>
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" style={{ color: '#D8B0B0' }} />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>Reception</h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(receptionMapsLink)}
                className="p-2 sm:p-2.5 hover:bg-gradient-to-br hover:from-[#D8B0B0]/10 hover:to-[#D8B0B0]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Open in Google Maps"
                style={{ color: '#1a1a1a' }}
              >
                <Navigation className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.reception.location, 'reception')}
                className="p-2 sm:p-2.5 hover:bg-gradient-to-br hover:from-[#D8B0B0]/10 hover:to-[#D8B0B0]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Copy reception details"
                style={{ color: '#1a1a1a' }}
              >
                {copiedItems.has('reception') ? <Check className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 relative z-10">
            <p className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: '#1a1a1a' }}>{siteConfig.reception.venue}</p>
            <p className="text-xs sm:text-sm opacity-70" style={{ color: '#1a1a1a' }}>{siteConfig.reception.location.split(',')[1]?.trim() || siteConfig.reception.location.split(',')[0]?.trim()}, {siteConfig.reception.location.split(',')[2]?.trim() || ''}</p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base" style={{ color: '#1a1a1a' }}>
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: '#D8B0B0' }} />
              <span>
                {siteConfig.reception.date} - {siteConfig.reception.time}
              </span>
            </div>
          </div>

          {/* Reception Image */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div 
              className="relative w-full h-36 sm:h-44 md:h-52 rounded-2xl overflow-hidden shadow-lg cursor-pointer group/image transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98] border-2 border-[#D8B0B0]/30 group-hover:border-[#D8B0B0]/50"
              onClick={() => setShowImageModal('reception')}
            >
              <Image
                src="/Details/treshijoshotelresort.png"
                alt={siteConfig.reception.location}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#AFC8E6]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-[#D8B0B0]/0 group-hover:bg-[#D8B0B0]/20 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="bg-[#F1EDE2]/90 backdrop-blur-sm rounded-full p-3 shadow-xl border-2 border-[#D8B0B0]/40">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" style={{ color: '#D8B0B0' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-10">
            <button
              onClick={() => setShowImageModal('reception')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg text-white"
              style={{ background: 'linear-gradient(to right, #D8B0B0, #D8B0B0)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #C89A9A, #D8B0B0)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #D8B0B0, #D8B0B0)'
              }}
            >
              <Camera className="w-4 h-4" />
              <span>View Venue</span>
            </button>
            <button
              onClick={() => openInMaps(receptionMapsLink)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#AFC8E6]/15"
              style={{ borderColor: '#D8B0B0', color: '#1a1a1a' }}
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="relative z-10 mb-8 sm:mb-12 lg:mb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="hidden sm:block h-px w-8 bg-gradient-to-r from-transparent to-[#AFC8E6]/50" />
            <div className="p-3 rounded-full shadow-lg" style={{ backgroundColor: '#D8B0B0', opacity: 0.25 }}>
              <Users className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#1a1a1a' }} />
            </div>
            <div className="hidden sm:block h-px w-8 bg-gradient-to-l from-transparent to-[#AFC8E6]/50" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#1a1a1a' }}>Important Information</h3>
          <p className="text-sm sm:text-base opacity-80" style={{ color: '#1a1a1a' }}>Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Dress Code */}
          <div className="bg-gradient-to-br from-[#F1EDE2] via-[#D8B0B0]/20 to-[#F1EDE2] backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-7 border-2 border-[#AFC8E6]/60 hover:border-[#AFC8E6] hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: '#D8B0B0', opacity: 0.15 }} />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 relative z-10">
              <div className="p-2 rounded-full shadow-md" style={{ backgroundColor: '#D8B0B0', opacity: 0.3 }}>
                <Shirt className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#1a1a1a' }} />
              </div>
              <h4 className="font-bold text-base sm:text-lg" style={{ color: '#1a1a1a' }}>Dress Code</h4>
            </div>
            
            {/* Theme Badge */}
            <div className="mb-4 relative z-10">
              <span className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full text-white shadow-md" style={{ backgroundColor: '#D8B0B0' }}>
                {siteConfig.dressCode.theme}
              </span>
            </div>

            {/* Color Palette */}
            {siteConfig.dressCode.colors && (
              <div className="mb-4 relative z-10">
                <p className="text-xs font-semibold mb-2" style={{ color: '#1a1a1a' }}>Color Palette</p>
                <div className="flex gap-2 flex-wrap">
                  {siteConfig.dressCode.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#AFC8E6]/25"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Principal Sponsors */}
            {siteConfig.dressCode.sponsors && (
              <div className="mb-4 rounded-lg p-3 border-2 relative z-10 bg-white/80" style={{ borderColor: '#AFC8E6' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#1a1a1a' }}>Principal Sponsors</p>
                <p className="text-xs mb-1" style={{ color: '#1a1a1a', opacity: 0.8 }}>Ladies: {siteConfig.dressCode.sponsors.ladies}</p>
                <p className="text-xs" style={{ color: '#1a1a1a', opacity: 0.8 }}>Gentlemen: {siteConfig.dressCode.sponsors.gentlemen}</p>
              </div>
            )}

            {/* Guests */}
            {siteConfig.dressCode.guests && (
              <div className="mb-4 rounded-lg p-3 border-2 relative z-10 bg-white/80" style={{ borderColor: '#AFC8E6' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#1a1a1a' }}>Guests</p>
                <p className="text-xs mb-1" style={{ color: '#1a1a1a', opacity: 0.8 }}>Ladies: {siteConfig.dressCode.guests.ladies}</p>
                <p className="text-xs mb-1" style={{ color: '#1a1a1a', opacity: 0.8 }}>Gentlemen: {siteConfig.dressCode.guests.gentlemen}</p>
                <p className="text-xs font-medium px-2 py-1 rounded text-white shadow-sm mt-2" style={{ backgroundColor: '#D8B0B0' }}>⚠️ {siteConfig.dressCode.note}</p>
              </div>
            )}
          </div>

          {/* Travel & Comfort - Combined */}
          <div className="bg-gradient-to-br from-[#F1EDE2] via-[#AFC8E6]/20 to-[#F1EDE2] backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-7 border-2 border-[#D8B0B0]/60 hover:border-[#D8B0B0] hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: '#AFC8E6', opacity: 0.1 }} />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 relative z-10">
              <div className="p-2 rounded-full shadow-md" style={{ backgroundColor: '#AFC8E6', opacity: 0.3 }}>
                <Car className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#1a1a1a' }} />
              </div>
              <h4 className="font-bold text-base sm:text-lg" style={{ color: '#1a1a1a' }}>Parking & Travel</h4>
            </div>
            
            <div className="space-y-3 relative z-10">
              {/* Parking Information */}
              <div className="bg-white/80 rounded-xl p-3 sm:p-4 border-2 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderColor: '#AFC8E6' }}>
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 rounded-full mt-0.5" style={{ backgroundColor: '#AFC8E6', opacity: 0.2 }}>
                    <Car className="w-3 h-3" style={{ color: '#AFC8E6' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold mb-1" style={{ color: '#1a1a1a' }}>Parking Available</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.8 }}>
                      Ample parking is available at both venues. We recommend arriving 15-20 minutes early.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-white/80 rounded-xl p-3 sm:p-4 border-2 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderColor: '#AFC8E6' }}>
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 rounded-full mt-0.5" style={{ backgroundColor: '#AFC8E6', opacity: 0.2 }}>
                    <Navigation className="w-3 h-3" style={{ color: '#AFC8E6' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold mb-1" style={{ color: '#1a1a1a' }}>Transportation</p>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: '#1a1a1a', opacity: 0.8 }}>
                      💡 Book transportation in advance for a stress-free day
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.8 }}>
                      Taxis, Grab, and private vehicles are welcome. Both venues are easily accessible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Travel Tips */}
              <div className="bg-white/90 rounded-xl p-3 sm:p-4 border-2 shadow-sm" style={{ borderColor: '#AFC8E6', backgroundColor: '#F1EDE2' }}>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#1a1a1a' }}>
                  <span className="text-sm">📍</span>
                  Quick Tips
                </p>
                <ul className="text-xs space-y-1.5" style={{ color: '#1a1a1a' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5" style={{ color: '#1a1a1a' }}>•</span>
                    <span>Plan your route ahead of time to avoid delays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5" style={{ color: '#1a1a1a' }}>•</span>
                    <span>Wear comfortable shoes for easy movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5" style={{ color: '#1a1a1a' }}>•</span>
                    <span>Coordinate with friends for carpooling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: 'rgba(241, 237, 226, 0.95)' }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#AFC8E6', opacity: 0.15 }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#D8B0B0', opacity: 0.15, animationDelay: '1s' }} />
          </div>

          <div className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group relative"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: '#AFC8E6', backgroundColor: '#F1EDE2' }}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: 'linear-gradient(to right, #AFC8E6, #D8B0B0, #AFC8E6)' }} />
            
            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-white backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: '#F1EDE2', borderColor: '#AFC8E6', color: '#1a1a1a' }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-red-500 transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2" style={{ backgroundColor: '#F1EDE2', borderColor: '#AFC8E6' }}>
                {showImageModal === 'ceremony' ? (
                  <>
                    <Heart className="w-4 h-4" fill="#D8B0B0" style={{ color: '#AFC8E6' }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: '#1a1a1a' }}>Ceremony Venue</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4" style={{ color: '#D8B0B0' }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: '#1a1a1a' }}>Reception Venue</span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden" style={{ backgroundColor: '#F1EDE2' }}>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
              
              {showImageModal === 'ceremony' ? (
                <Image
                  src="/Details/RoseofLimaParish.jpg"
                  alt={siteConfig.ceremony.location}
                  fill
                  className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                  sizes="95vw"
                  priority
                />
              ) : (
                <Image
                  src="/Details/treshijoshotelresort.png"
                  alt={siteConfig.reception.location}
                  fill
                  className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                  sizes="95vw"
                  priority
                />
              )}
            </div>

            {/* Enhanced content section */}
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t-2 relative" style={{ borderColor: '#AFC8E6', backgroundColor: '#F1EDE2' }}>
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#AFC8E6]/40 to-transparent" />
              
              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1a1a1a' }}>
                      {showImageModal === 'ceremony' ? (
                        <Heart className="w-6 h-6" fill="#D8B0B0" style={{ color: '#AFC8E6' }} />
                      ) : (
                        <Utensils className="w-6 h-6" style={{ color: '#D8B0B0' }} />
                      )}
                      {showImageModal === 'ceremony' ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70" style={{ color: '#1a1a1a' }}>
                      <MapPin className="w-4 h-4" style={{ color: '#AFC8E6' }} />
                      <span>{showImageModal === 'ceremony' ? siteConfig.ceremony.location : siteConfig.reception.location}</span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === 'ceremony' && (
                      <div className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border" style={{ color: '#1a1a1a', backgroundColor: '#D8B0B0', opacity: 0.25, borderColor: '#AFC8E6' }}>
                        <Clock className="w-4 h-4" style={{ color: '#AFC8E6' }} />
                        <span>{siteConfig.ceremony.date} at {siteConfig.ceremony.time}</span>
                      </div>
                    )}
                    {showImageModal === 'reception' && (
                      <div className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border" style={{ color: '#1a1a1a', backgroundColor: '#AFC8E6', opacity: 0.25, borderColor: '#D8B0B0' }}>
                        <Clock className="w-4 h-4" style={{ color: '#D8B0B0' }} />
                        <span>{siteConfig.reception.date} - {siteConfig.reception.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => copyToClipboard(
                        showImageModal === 'ceremony' 
                          ? siteConfig.ceremony.location
                          : siteConfig.reception.location,
                        `modal-${showImageModal}`
                      )}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#D8B0B0]/15 whitespace-nowrap"
                      title="Copy address"
                      style={{ borderColor: '#AFC8E6', color: '#1a1a1a' }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => openInMaps(showImageModal === 'ceremony' ? ceremonyMapsLink : receptionMapsLink)}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap text-white"
                      style={{ background: showImageModal === 'ceremony' ? 'linear-gradient(to right, #AFC8E6, #AFC8E6)' : 'linear-gradient(to right, #D8B0B0, #D8B0B0)' }}
                      onMouseEnter={(e) => {
                        if (showImageModal === 'ceremony') {
                          e.currentTarget.style.background = 'linear-gradient(to right, #9BB5D8, #AFC8E6)'
                        } else {
                          e.currentTarget.style.background = 'linear-gradient(to right, #C89A9A, #D8B0B0)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (showImageModal === 'ceremony') {
                          e.currentTarget.style.background = 'linear-gradient(to right, #AFC8E6, #AFC8E6)'
                        } else {
                          e.currentTarget.style.background = 'linear-gradient(to right, #D8B0B0, #D8B0B0)'
                        }
                      }}
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 text-xs opacity-60" style={{ color: '#1a1a1a' }}>
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">
                    Press ESC to close
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
