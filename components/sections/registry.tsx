"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"
import { QRCodeCanvas } from "qrcode.react"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const bankAccounts = [
  {
    id: "pnb-php",
    label: "PNB • PHP Savings",
    bank: "Philippine National Bank (PNB) - PHP Savings",
    name: "Kim Angel Manlolo",
    number: "243810104700",
  },
  {
    id: "pnb-usd",
    label: "PNB • USD Savings",
    bank: "Philippine National Bank (PNB) - USD Savings",
    name: "Kim Angel Manlolo",
    number: "243860071506",
  },
  {
    id: "bpi-php",
    label: "BPI • PHP Savings",
    bank: "Bank of the Philippine Islands (BPI) Savings",
    name: "Cedric John Sta. Lucia",
    number: "4949728167",
  },
] as const

type BankAccount = (typeof bankAccounts)[number]

export function Registry() {
  const [selectedAccountId, setSelectedAccountId] = useState<BankAccount["id"]>("pnb-php")
  const selectedAccount =
    bankAccounts.find((account) => account.id === selectedAccountId) ?? bankAccounts[0]

  const qrValue = `${selectedAccount.bank}\n${selectedAccount.name}\n${selectedAccount.number}`

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

          {/* Bank details with toggleable QR */}
          <div className="mt-3 sm:mt-4">
            <h3
              className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#FDECEF] tracking-[0.22em] uppercase text-center mb-3 sm:mb-4`}
            >
              Bank Details (Optional)
            </h3>

            {/* Account toggle */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              {bankAccounts.map((account) => {
                const isActive = account.id === selectedAccountId
                return (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => setSelectedAccountId(account.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[10px] sm:text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-white text-[#3D5033] border-white shadow-md"
                        : "bg-white/5 text-white/85 border-white/30 hover:bg-white/15"
                    }`}
                  >
                    {account.label}
                  </button>
                )
              })}
            </div>

            {/* Selected account info + QR */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center sm:items-start justify-center">
              <div className="bg-black/20 rounded-xl border border-white/20 p-3 sm:p-4 flex-1 min-w-[12rem] max-w-sm">
                <p
                  className={`${cormorant.className} text-[11px] sm:text-sm text-white/90 leading-relaxed text-center sm:text-left`}
                >
                  <span className="font-semibold block">{selectedAccount.bank}</span>
                  <span className="block mt-1">{selectedAccount.name}</span>
                  <span className="block mt-1 text-[11px] sm:text-sm tracking-widest">
                    {selectedAccount.number}
                  </span>
                </p>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#FDECEF]/40 shadow-md">
                <QRCodeCanvas
                  value={qrValue}
                  includeMargin
                  size={140}
                  className="bg-white rounded-xl"
                />
                <p
                  className={`${cormorant.className} text-[9px] sm:text-[11px] text-center text-[#3D5033] mt-2`}
                >
                  Scan to view account details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
