"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const bankAccounts = [
  {
    id: "pnb-php",
    label: "PNB Savings - PHP",
    bank: "PNB Savings - PHP",
    name: "Kim Angel S Manlolo",
    number: "243810104700",
    qrSrc: "/QR/PNB.png",
  },
  {
    id: "pnb-usd",
    label: "PNB Savings - USD",
    bank: "PNB Savings - USD",
    name: "Kim Angel S Manlolo",
    number: "243860071506",
    qrSrc: "/QR/PNB.png",
  },
  {
    id: "bpi-php",
    label: "BPI Savings - PHP",
    bank: "BPI Savings - PHP",
    name: "Cedric John A Sta. Lucia",
    number: "4949728167",
    qrSrc: "/QR/BPI.png",
  },
] as const

type BankAccount = (typeof bankAccounts)[number]

export function Registry() {
  const [selectedId, setSelectedId] = useState<BankAccount["id"]>("pnb-php")
  const selected = bankAccounts.find((acc) => acc.id === selectedId) ?? bankAccounts[0]

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

          {/* Bank account toggle + details + QR */}
          <div className="mt-3 sm:mt-4">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              {bankAccounts.map((acc) => {
                const isActive = acc.id === selectedId
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setSelectedId(acc.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[10px] sm:text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-white text-[#3D5033] border-white shadow-md"
                        : "bg-white/5 text-white/85 border-white/30 hover:bg-white/15"
                    }`}
                  >
                    {acc.label}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
              <div className="bg-black/20 rounded-xl border border-white/20 p-3 sm:p-4 flex-1 min-w-0 max-w-sm w-full">
                <p className={`${cormorant.className} text-[11px] sm:text-sm text-white/90 leading-relaxed text-center sm:text-left`}>
                  <span className="font-semibold block">{selected.bank}</span>
                  <span className="block mt-1">{selected.name}</span>
                  <span className="block mt-1 text-[11px] sm:text-sm tracking-widest">{selected.number}</span>
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#FDECEF]/40 shadow-md flex-shrink-0">
                <Image
                  src={selected.qrSrc}
                  alt={`${selected.bank} QR Code`}
                  width={160}
                  height={160}
                  className="rounded-xl"
                />
                <p className={`${cormorant.className} text-[10px] sm:text-xs text-center text-[#3D5033] mt-2`}>
                  Scan to transfer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
