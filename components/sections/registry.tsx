"use client"

import { Section } from "@/components/section"
import { Gift, Heart, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function Registry() {
  const [showGCash, setShowGCash] = useState(false)
  
  return (
    <Section id="registry" className="relative py-16 md:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-12 md:mb-16">
        <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white text-balance drop-shadow-lg">
            Monetary Gifts
          </h2>
          <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
        </div>
        <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-sans max-w-3xl mx-auto px-4">
          Your love and presence are more than enough. If you wish to bless us with a monetary gift,
          please feel free to use the option below. Thank you for being part of our story.
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        {/* Appreciation Note */}
        <div className="rounded-2xl p-5 sm:p-8 md:p-10 border bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-md shadow-lg mb-8 sm:mb-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#525E2C' }}>A Note from Us</h3>
              <Heart className="w-6 h-6 text-primary ml-2" />
            </div>
            <p className="leading-relaxed text-base sm:text-lg font-normal max-w-2xl mx-auto" style={{ color: '#525E2C' }}>
              With all that we have, we are truly blessed. Your presence and prayers are what we request.
              But if you desire to give nonetheless, monetary gift is the one we suggest.
            </p>
          </div>
        </div>

        {/* GCash QR Card */}
        <div className="rounded-2xl border bg-gradient-to-br from-card to-card/80 p-5 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="mb-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg ring-4 ring-blue-500/20">
                  <span className="text-white font-bold text-2xl sm:text-3xl">G</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mb-1" style={{ color: '#525E2C' }}>GCash</h3>
                  <p className="text-xs sm:text-base" style={{ color: '#525E2C' }}>Send your monetary gift</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGCash(v => !v)}
                aria-expanded={showGCash}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm sm:text-base font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 shrink-0 shadow-lg hover:shadow-xl hover:scale-105"
                style={{ 
                  backgroundColor: '#525E2C',
                  color: '#D1AB6D'
                }}
              >
                {showGCash ? "Hide QR" : "Show QR"}
              </button>
            </div>
          </div>

          {/* QR Code Display */}
          <div className={`transition-all duration-500 overflow-hidden ${showGCash ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="mb-4 text-sm sm:text-lg leading-relaxed" style={{ color: '#525E2C' }}>Scan the QR code below or download it to send via your GCash app</p>
            
            <a
              href="/QR/GCASH.png"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open full-size GCash QR in a new tab"
              className="block group"
            >
              <div className="aspect-square w-full overflow-hidden rounded-2xl border-2 sm:border-4 border-white/20 bg-gradient-to-br from-white to-gray-50 p-4 sm:p-10 ring-0 group-hover:ring-4 ring-blue-500/30 transition-all duration-300 group-hover:scale-[1.02] shadow-inner">
                <Image
                  src="/QR/GCASH.png"
                  alt="GCash QR Code"
                  width={800}
                  height={800}
                  priority
                  className="h-full w-full object-contain drop-shadow-2xl"
                />
              </div>
            </a>
            
            {/* Instructions */}
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-1" style={{ color: '#525E2C' }}>How to use:</p>
                  <ol className="text-xs sm:text-base space-y-1 list-decimal list-inside ml-2" style={{ color: '#525E2C' }}>
                    <li>Open your GCash app</li>
                    <li>Tap on "Scan QR"</li>
                    <li>Point your camera at this QR code</li>
                    <li>Enter your desired amount and send</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="/QR/GCASH.png"
                download
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/20 bg-card/80 backdrop-blur-sm hover:bg-card hover:border-white/40 px-5 py-3 text-sm sm:text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 group"
                style={{ color: '#525E2C' }}
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Download QR</span>
              </a>
              <a
                href="/QR/GCASH.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 text-sm sm:text-base font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 group shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Open Full Size</span>
              </a>
            </div>
          </div>
        </div>

        {/* Thank you message */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-sm sm:text-lg text-white italic">
            Thank you for your generosity ❤️
          </p>
        </div>
      </div>
    </Section>
  )
}
