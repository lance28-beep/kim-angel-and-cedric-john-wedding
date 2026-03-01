"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const qrOptions = [
  { id: "pnb", label: "PNB", src: "/QR/PNB.png" },
  { id: "bpi", label: "BPI", src: "/QR/BPI.png" },
] as const

type QrOption = (typeof qrOptions)[number]

export function Registry() {
  const [selectedId, setSelectedId] = useState<QrOption["id"]>("pnb")
  const selected = qrOptions.find((opt) => opt.id === selectedId) ?? qrOptions[0]

  return (
    <Section id="registry" className="relative overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-3 md:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#FDECEF]/85 mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          With Love &amp; Gratitude
        </p>
        
        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          Gift Wishes
        </h2>
        
   
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/60" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDECEF]/80 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/80 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDECEF]/80 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/60" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white/10 backdrop-blur-md border border-[#FDECEF]/25 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-7">
          <p
            className={`${cormorant.className} text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed text-center`}
          >
            With all that we have, we&apos;ve been truly blessed.
            <br />
            Your presence and prayers are all that we request.
            <br />
            But if you desire to give nonetheless,
            <br />
            monetary gift is one we humbly suggest.
          </p>

          {/* QR toggle */}
          <div className="mt-3 sm:mt-4 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              {qrOptions.map((opt) => {
                const isActive = opt.id === selectedId
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedId(opt.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border text-sm sm:text-base font-semibold transition-all ${
                      isActive
                        ? "bg-white text-[#3D5033] border-white shadow-md"
                        : "bg-white/5 text-white/85 border-white/30 hover:bg-white/15"
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#FDECEF]/40 shadow-md">
              <Image
                src={selected.src}
                alt={`${selected.label} QR Code`}
                width={160}
                height={160}
                className="rounded-xl"
              />
              <p
                className={`${cormorant.className} text-[10px] sm:text-xs text-center text-[#3D5033] mt-2`}
              >
                Scan to transfer
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
