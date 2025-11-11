"use client"

import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3 className={`anton-regular text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase text-[#BB8A3D] mb-2 sm:mb-3 md:mb-4 tracking-[0.15em] ${textAlign} ${className}`}>
        {children}
      </h3>
    )
  }

  // Helper component for name items with alignment
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-1 sm:py-1.5 md:py-2 w-full`}>
        <p className={`text-slate-700 text-[13px] sm:text-sm md:text-base font-medium leading-snug break-words ${textAlign}`}>{name}</p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative bg-gradient-to-b from-[#AFC8E6] via-[#D8B0B0]/90 to-[#AFC8E6] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#F1EDE2]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#F1EDE2]/5 to-transparent" />
        
        {/* Bottom-left flower decoration */}
        <img
          src="/decoration/left-bottom-left-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-90 select-none pointer-events-none"
        />
        
        {/* Bottom-right flower decoration */}
        <img
          src="/decoration/left-bottom-left-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-10 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-90 select-none pointer-events-none scale-x-[-1]"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4 text-balance">
          Principal Sponsors
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-[#F1EDE2] mb-3 sm:mb-4">
          Our Beloved Godparents
        </h3>
      </div>

      {/* Sponsors content */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* White card with elegant border */}
        <div className="relative bg-white/95 backdrop-blur-sm border border-[#F1EDE2]/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Inner gold border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#F1EDE2] rounded-lg sm:rounded-xl pointer-events-none" />
          
          {/* Card content */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            {/* Global font for Anton to match Entourage section */}
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
              .anton-regular {
                font-family: "Anton", sans-serif;
                font-weight: 400;
                font-style: normal;
              }
            `}</style>
            <div className="relative z-10 w-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#F1EDE2]/30 border-t-[#F1EDE2] rounded-full animate-spin" />
                    <span className="text-[#AFC8E6] font-serif text-lg">Loading sponsors...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <p className="text-red-500 font-serif text-lg mb-2">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-[#AFC8E6] hover:text-[#D8B0B0] font-serif underline"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-[#AFC8E6] font-serif text-lg">No sponsors yet</p>
                </div>
              ) : (
                <div className="mb-5 sm:mb-7 md:mb-9 lg:mb-12">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2.5 sm:mb-3.5 md:mb-5">
                    <SectionTitle align="right" className="pr-3 sm:pr-4 md:pr-6">Male Principal Sponsors</SectionTitle>
                    <SectionTitle align="left" className="pl-3 sm:pl-4 md:pl-6">Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-3 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <>
                        <div key={`male-${idx}-${pair.MalePrincipalSponsor || 'empty'}`} className="px-3 sm:px-4 md:px-6">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-1 sm:py-1.5 md:py-2" />
                          )}
                        </div>
                        <div key={`female-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`} className="px-3 sm:px-4 md:px-6">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-1 sm:py-1.5 md:py-2" />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
