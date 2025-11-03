"use client"

import { useState, useEffect, useMemo } from "react"
import { Loader2, Users } from "lucide-react"

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Bride",
  "Parents of the Groom",
  "Maid/Matron of Honor",
  "Best Man",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Bridesmaids",
  "Groomsmen",
  "Flower Girls",
  "Ring/Coin Bearers",
]

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntourage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEntourage()

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}
    
    entourage.forEach((member) => {
      const category = member.RoleCategory || "Other"
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })
    
    return grouped
  }, [entourage])

  // Helper component for elegant section titles
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-[#BB8A3D] mb-4 sm:mb-6 text-center tracking-wide">
      {children}
    </h3>
  )

  // Helper component for name items with role title
  const NameItem = ({ member }: { member: EntourageMember }) => (
    <div className="flex flex-col items-center justify-center py-2 sm:py-2.5">
      <p className="text-[#FFF6E7] text-base sm:text-lg font-medium text-center">{member.Name}</p>
      {member.RoleTitle && (
        <p className="text-[#CDAC77] text-xs sm:text-sm font-light text-center mt-1">{member.RoleTitle}</p>
      )}
    </div>
  )

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({ 
    children, 
    leftTitle, 
    rightTitle,
    singleTitle,
    centerContent = false 
  }: { 
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-8 sm:mb-10 md:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 mb-4 sm:mb-6">
          {leftTitle && (
            <SectionTitle>{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle>{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden"
    >
      {/* Decorative background elements for motif cohesion */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Floating geometric shapes */}
        <div className="hidden sm:block absolute top-8 left-6 w-24 h-24 bg-[#BB8A3D]/10 rounded-full blur-2xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-10 w-20 h-20 bg-[#CDAC77]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="hidden sm:block absolute bottom-16 left-10 w-28 h-28 bg-[#BB8A3D]/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="sm:hidden absolute top-6 right-6 w-14 h-14 bg-[#CDAC77]/12 rounded-full blur-lg" />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#CDAC77]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/35 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDAC77]/30 to-transparent" />
        
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
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-28 sm:w-36 md:w-48 lg:w-56 opacity-70 rotate-180 select-none"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-[#CDAC77]/30" />
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#BB8A3D] rounded-full" />
            <div className="w-1 h-1 bg-[#FFF6E7] rounded-full self-center" />
            <div className="w-2 h-2 bg-[#BB8A3D] rounded-full" />
          </div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#BB8A3D]/60 to-[#CDAC77]/30" />
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FFF6E7] mb-6 text-balance drop-shadow-2xl relative">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#BB8A3D] via-[#CDAC77] to-[#FFF6E7]">Wedding Entourage</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#BB8A3D]/20 blur-2xl -z-10">Wedding Entourage</span>
        </h2>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#BB8A3D] mb-3 sm:mb-4">
          Organizational Chart
        </h3>

        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
          <div className="w-1 h-1 bg-[#CDAC77] rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
        </div>
      </div>

      {/* Enhanced entourage content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-[#BB8A3D]" />
                <span className="text-[#FFF6E7] font-serif text-lg">Loading entourage...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <p className="text-red-500 font-serif text-lg mb-2">{error}</p>
                <button
                  onClick={fetchEntourage}
                  className="text-[#BB8A3D] hover:text-[#CDAC77] font-serif underline"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : entourage.length === 0 ? (
            <div className="text-center py-24">
              <Users className="h-16 w-16 text-[#BB8A3D]/50 mx-auto mb-4" />
              <p className="text-[#FFF6E7] font-serif text-lg">No entourage members yet</p>
            </div>
          ) : (
            <>
              {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                const members = grouped[category] || []
                
                if (members.length === 0) return null

                // Special handling for The Couple - display Bride and Groom side by side
                if (category === "The Couple") {
                  const bride = members.find(m => m.RoleTitle?.toLowerCase().includes('bride'))
                  const groom = members.find(m => m.RoleTitle?.toLowerCase().includes('groom'))
                  
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-4 mb-8">
                          <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
                        <div className="flex flex-col items-center">
                          <p className="text-[#CDAC77] text-xs sm:text-sm mb-1 font-light">Bride</p>
                          {bride && (
                            <p className="text-[#FFF6E7] text-base sm:text-lg font-medium">{bride.Name}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-center">
                          <p className="text-[#CDAC77] text-xs sm:text-sm mb-1 font-light">Groom</p>
                          {groom && (
                            <p className="text-[#FFF6E7] text-base sm:text-lg font-medium">{groom.Name}</p>
                          )}
                        </div>
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Special handling for Parents sections - combine into single two-column layout
                if (category === "Parents of the Bride" || category === "Parents of the Groom") {
                  // Get both parent groups
                  const parentsBride = grouped["Parents of the Bride"] || []
                  const parentsGroom = grouped["Parents of the Groom"] || []
                  
                  // Only render once (when processing "Parents of the Bride")
                  if (category === "Parents of the Bride") {
                    return (
                      <div key="Parents">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-4 mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Parents of the Bride" rightTitle="Parents of the Groom">
                          <div className="space-y-3">
                            {parentsBride.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                          <div className="space-y-3">
                            {parentsGroom.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Parents of the Groom" since it's already rendered above
                  return null
                }

                // Special handling for Maid/Matron of Honor and Best Man - combine into single two-column layout
                if (category === "Maid/Matron of Honor" || category === "Best Man") {
                  // Get both honor attendant groups
                  const maidOfHonor = grouped["Maid/Matron of Honor"] || []
                  const bestMan = grouped["Best Man"] || []
                  
                  // Only render once (when processing "Maid/Matron of Honor")
                  if (category === "Maid/Matron of Honor") {
                    return (
                      <div key="HonorAttendants">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-4 mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Maid/Matron of Honor" rightTitle="Best Man">
                          <div className="space-y-3">
                            {maidOfHonor.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                          <div className="space-y-3">
                            {bestMan.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Best Man" since it's already rendered above
                  return null
                }

                // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                if (category === "Bridesmaids" || category === "Groomsmen") {
                  // Get both bridal party groups
                  const bridesmaids = grouped["Bridesmaids"] || []
                  const groomsmen = grouped["Groomsmen"] || []
                  
                  // Only render once (when processing "Bridesmaids")
                  if (category === "Bridesmaids") {
                    return (
                      <div key="BridalParty">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-4 mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Bridesmaids" rightTitle="Groomsmen">
                          <div className="space-y-3">
                            {bridesmaids.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                          <div className="space-y-3">
                            {groomsmen.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Groomsmen" since it's already rendered above
                  return null
                }

                // Special handling for Candle/Veil Sponsors sections - combine into single two-column layout
                if (category === "Candle Sponsors" || category === "Veil Sponsors") {
                  // Get both sponsor groups
                  const candleSponsors = grouped["Candle Sponsors"] || []
                  const veilSponsors = grouped["Veil Sponsors"] || []
                  
                  // Only render once (when processing "Candle Sponsors")
                  if (category === "Candle Sponsors") {
                    return (
                      <div key="Sponsors">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-4 mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Candle Sponsors" rightTitle="Veil Sponsors">
                          <div className="space-y-3">
                            {candleSponsors.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                          <div className="space-y-3">
                            {veilSponsors.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Veil Sponsors" since it's already rendered above
                  return null
                }

                // Default: single title, centered content
                return (
                  <div key={category}>
                    {categoryIndex > 0 && (
                      <div className="flex justify-center py-4 mb-8">
                        <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                      </div>
                    )}
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {members.map((member, idx) => (
                        <div key={idx}>
                          <NameItem member={member} />
                        </div>
                      ))}
                    </TwoColumnLayout>
                  </div>
                )
              })}
              
              {/* Display any other categories not in the ordered list */}
              {Object.keys(grouped).filter(cat => !ROLE_CATEGORY_ORDER.includes(cat)).map((category) => {
                const members = grouped[category]
                return (
                  <div key={category}>
                    <div className="flex justify-center py-4 mb-8">
                      <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                    </div>
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {members.map((member, idx) => (
                        <div key={idx}>
                          <NameItem member={member} />
                        </div>
                      ))}
                    </TwoColumnLayout>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
