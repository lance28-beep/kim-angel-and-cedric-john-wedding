"use client"

import React from "react"
import { useEffect, useMemo, useState, useRef } from "react"
import { Section } from "@/components/section"
import { Loader2, Users } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

/** Couple peer sponsors: [left, right] pairs for 2-column layout */
const PEER_COUPLES: [string, string][] = [
  ["Dr. Aprilee Sta. Lucia-Tolentino", "Mr. Joseph Dean Tolentino"],
  ["Mrs. Janzel Abad", "Dr. Chester Owen Diokno"],
  ["Mrs. Meg Angeli Borromeo", "Mr. Elbert June Borromeo"],
  ["Dr. Ardys Pelayo", "Dr. Jerald Pelayo"],
  ["Mrs. Christine Arengo", "Mr. Arturo Arengo"],
]
/** Single peer sponsors: 1-column centered */
const PEER_SINGLES: string[] = [
  "Mr. Warnet Hernandez",
  "Atty. Richmund Sta. Lucia",
]

export function PrincipalSponsors() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
      <h3
        className={`relative ${cormorant.className} text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold uppercase text-[#F0F0EE] mb-1.5 sm:mb-2 md:mb-3 tracking-[0.1em] sm:tracking-[0.15em] ${textAlign} ${className} transition-all duration-300`}
      >
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
      <div
        className={`relative flex flex-col ${containerAlign} justify-center py-1 sm:py-1.5 md:py-2.5 w-full group/item transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03]`}
      >
        {/* Hover highlight effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E0CFB5]/18 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-md" />

        <p
          className={`relative text-[#F0F0EE] text-[11px] sm:text-[13px] md:text-sm lg:text-base font-semibold leading-snug break-words ${textAlign} group-hover/item:text-white transition-all duration-300`}
        >
          {name}
        </p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      const data = await res.json()
      if (!res.ok) throw new Error((data as { error?: string })?.error || "Failed to load principal sponsors")
      setSponsors(Array.isArray(data) ? data : [])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load principal sponsors"
      console.error("Failed to load principal sponsors:", err)
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <div ref={sectionRef}>
      <Section
        id="sponsors"
        className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#525E2C]"
      >
        {/* Background elements with sage motif */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#3D4636]/90 via-[#525E2C]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#3D4636]/95 via-[#525E2C]/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,207,181,0.28),transparent_55%)] opacity-90" />
        </div>

        {/* Section Header */}
        <div
          className={`relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {/* Small label */}
          <p
            className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            Our Beloved Principal Sponsors
          </p>

          <h2
            className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.9)" }}
          >
            Standing with Kim &amp; Ced
          </h2>

          {/* Simple divider */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#D1AB6D] to-transparent" />
            <div className="w-1.5 h-1.5 bg-[#D1AB6D] rounded-full shadow-[0_0_12px_rgba(209,171,109,0.9)]" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-[#D1AB6D] to-transparent" />
          </div>
        </div>

        {/* Sponsors content */}
        <div
          className={`relative z-30 max-w-4xl mx-auto px-3 sm:px-5 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Card with sage & champagne theme */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden border border-[#E0CFB5]/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500 group">
            {/* Card content */}
            <div className="relative p-3 sm:p-6 md:p-8 z-10">
              <div className="relative z-10 w-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-24 sm:py-28 md:py-32">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-white/70" />
                    <span className="text-white/80 font-serif text-base sm:text-lg">Loading sponsors...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                  <div className="text-center mb-6">
                    <p className="text-red-300 font-serif text-base sm:text-lg mb-3">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-white/90 hover:text-white font-serif underline transition-colors duration-200"
                    >
                      Try again
                    </button>
                  </div>
                  {(PEER_COUPLES.length > 0 || PEER_SINGLES.length > 0) && (
                    <div className="w-full pt-6 border-t border-white/10">
                      <div className="pt-2 sm:pt-3 md:pt-4">
                        <SectionTitle align="center" className="mb-1 sm:mb-2">Junior Sponsors</SectionTitle>
                        <p className="text-white/75 font-serif text-base sm:text-lg text-center mb-4">our cherished young mentors</p>
                        {PEER_COUPLES.length > 0 && (
                          <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 items-stretch mb-4 sm:mb-6">
                            {PEER_COUPLES.map(([left, right], idx) => (
                              <React.Fragment key={`peer-couple-${idx}-${left}-${right}`}>
                                <div className="px-2 sm:px-3 md:px-4"><NameItem name={left} align="right" /></div>
                                <div className="px-2 sm:px-3 md:px-4"><NameItem name={right} align="left" /></div>
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                        {PEER_SINGLES.length > 0 && (
                          <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-0.5 sm:space-y-1">
                            {PEER_SINGLES.map((name) => (
                              <div key={name} className="w-full flex justify-center">
                                <NameItem name={name} align="center" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 space-y-6 sm:space-y-8">
                  {/* Principal Sponsors grid — from API only */}
                  <div>
                    <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 mb-1.5 sm:mb-2 md:mb-3">
                      <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">
                        Male Principal Sponsors
                      </SectionTitle>
                      <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">
                        Female Principal Sponsors
                      </SectionTitle>
                    </div>
                    {sponsorPairs.length === 0 ? (
                      <div className="text-center py-12 sm:py-16">
                        <Users className="h-12 w-12 sm:h-14 sm:w-14 text-white/40 mx-auto mb-2" />
                        <p className="text-white/75 font-serif text-sm sm:text-base">No principal sponsors yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 items-stretch">
                        {sponsorPairs.map((pair, idx) => (
                          <React.Fragment key={`pair-${idx}-${pair.MalePrincipalSponsor || 'empty'}-${pair.FemalePrincipalSponsor || 'empty'}`}>
                            <div className="px-2 sm:px-3 md:px-4">
                              {pair.MalePrincipalSponsor ? (
                                <NameItem name={pair.MalePrincipalSponsor} align="right" />
                              ) : (
                                <div className="py-0.5 sm:py-1 md:py-1.5" />
                              )}
                            </div>
                            <div className="px-2 sm:px-3 md:px-4">
                              {pair.FemalePrincipalSponsor ? (
                                <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                              ) : (
                                <div className="py-0.5 sm:py-1 md:py-1.5" />
                              )}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Joint Sponsors — hardcoded PEER_COUPLES and PEER_SINGLES only */}
                  {(PEER_COUPLES.length > 0 || PEER_SINGLES.length > 0) && (
                    <div className="pt-2 sm:pt-3 md:pt-4 border-t border-white/10">
                      <SectionTitle align="center" className="mb-1 sm:mb-2">Junior Sponsors</SectionTitle>
                      <p className="text-white/75 font-serif text-base sm:text-lg text-center mb-4">Our cherished young mentors</p>
                      {PEER_COUPLES.length > 0 && (
                        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 items-stretch mb-4 sm:mb-6">
                          {PEER_COUPLES.map(([left, right], idx) => (
                            <React.Fragment key={`peer-couple-${idx}-${left}-${right}`}>
                              <div className="px-2 sm:px-3 md:px-4"><NameItem name={left} align="right" /></div>
                              <div className="px-2 sm:px-3 md:px-4"><NameItem name={right} align="left" /></div>
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                      {PEER_SINGLES.length > 0 && (
                        <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-0.5 sm:space-y-1">
                          {PEER_SINGLES.map((name) => (
                            <div key={name} className="w-full flex justify-center">
                              <NameItem name={name} align="center" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </Section>
    </div>
  )
}