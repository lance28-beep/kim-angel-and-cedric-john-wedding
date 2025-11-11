"use client"

import React from "react"
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
  "Parents of the Groom",
  "Parents of the Bride",
  "Best Man",
  "Maid/Matron of Honor",
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
  const SectionTitle = ({ 
    children,
    align = "center",
    className = ""
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

  // Helper component for name items with role title (supports alignment)
  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember
    align?: "left" | "center" | "right"
    showRole?: boolean
  }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-1 sm:py-1.5 md:py-2 leading-relaxed`}>
        <p className={`text-slate-700 text-[13px] sm:text-sm md:text-base font-medium ${textAlign}`}>{member.Name}</p>
        {showRole && member.RoleTitle && (
          <p className={`text-slate-500 text-[10px] sm:text-[11px] md:text-xs font-normal mt-0.5 leading-snug ${textAlign}`}>
            {member.RoleTitle}
          </p>
        )}
      </div>
    )
  }

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
        <div className="mb-5 sm:mb-7 md:mb-9 lg:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-5 sm:mb-7 md:mb-9 lg:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2.5 sm:mb-3.5 md:mb-5">
          {leftTitle && (
            <SectionTitle align="right" className="pr-3 sm:pr-4 md:pr-6">{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-3 sm:pl-4 md:pl-6">{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden bg-transparent"
    >
      {/* Bottom corner decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
          Wedding Entourage
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-[#F1EDE2] mb-3 sm:mb-4">
          Organizational Chart
        </h3>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* White card with elegant border */}
        <div className="relative bg-white/95 backdrop-blur-sm border border-[#F1EDE2]/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Inner gold border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#F1EDE2] rounded-lg sm:rounded-xl pointer-events-none" />
          {/* Card content */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            {/* Global font import for Anton and category label class */}
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
              .anton-regular {
                font-family: "Anton", sans-serif;
                font-weight: 400;
                font-style: normal;
              }
            `}</style>
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-[#F1EDE2]" />
                  <span className="text-[#AFC8E6] font-serif text-lg">Loading entourage...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <p className="text-red-500 font-serif text-lg mb-2">{error}</p>
                  <button
                    onClick={fetchEntourage}
                    className="text-[#AFC8E6] hover:text-[#D8B0B0] font-serif underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : entourage.length === 0 ? (
              <div className="text-center py-24">
                <Users className="h-16 w-16 text-[#F1EDE2]/50 mx-auto mb-4" />
                <p className="text-[#AFC8E6] font-serif text-lg">No entourage members yet</p>
              </div>
            ) : (
            <>
              {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                const members = grouped[category] || []
                
                if (members.length === 0) return null

                // Special handling for The Couple - display Bride and Groom side by side
                if (category === "The Couple") {
                   const groom = members.find(m => m.RoleTitle?.toLowerCase().includes('groom'))
                  const bride = members.find(m => m.RoleTitle?.toLowerCase().includes('bride'))
                  
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                          <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
                        <div className="px-3 sm:px-4 md:px-6">
                          {groom && <NameItem member={groom} align="right" />}
                        </div>
                        <div className="px-3 sm:px-4 md:px-6">
                          {bride && <NameItem member={bride} align="left" />}
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
                  
                  // Helper function to sort parents: father first, then mother
                  const sortParents = (members: EntourageMember[]) => {
                    return [...members].sort((a, b) => {
                      const aIsFather = a.RoleTitle?.toLowerCase().includes('father') ?? false
                      const bIsFather = b.RoleTitle?.toLowerCase().includes('father') ?? false
                      
                      // Father comes first
                      if (aIsFather && !bIsFather) return -1
                      if (!aIsFather && bIsFather) return 1
                      return 0
                    })
                  }
                  
                  // Only render once (when processing "Parents of the Groom")
                  if (category === "Parents of the Groom") {
                    return (
                      <div key="Parents">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Parents of the Groom" rightTitle="Parents of the Bride">
                          {(() => {
                            const leftArr = sortParents(parentsGroom)
                            const rightArr = sortParents(parentsBride)
                            const maxLen = Math.max(leftArr.length, rightArr.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = leftArr[i]
                              const right = rightArr[i]
                              rows.push(
                                <React.Fragment key={`parents-row-${i}`}>
                                  <div key={`parent-groom-${i}`} className="px-3 sm:px-4 md:px-6">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                                  </div>
                                  <div key={`parent-bride-${i}`} className="px-3 sm:px-4 md:px-6">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Parents of the Bride" since it's already rendered above
                  return null
                }

                // Special handling for Maid/Matron of Honor and Best Man - combine into single two-column layout
                if (category === "Maid/Matron of Honor" || category === "Best Man") {
                  // Get both honor attendant groups
                  const maidOfHonor = grouped["Maid/Matron of Honor"] || []
                  const bestMan = grouped["Best Man"] || []
                  
                  // Only render once (when processing "Best Man")
                  if (category === "Best Man") {
                    return (
                      <div key="HonorAttendants">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Best Man" rightTitle="Maid/Matron of Honor">
                          {(() => {
                            const maxLen = Math.max(bestMan.length, maidOfHonor.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = bestMan[i]
                              const right = maidOfHonor[i]
                              rows.push(
                                <React.Fragment key={`honor-row-${i}`}>
                                  <div key={`bestman-cell-${i}`} className="px-3 sm:px-4 md:px-6">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                                  </div>
                                  <div key={`maid-cell-${i}`} className="px-3 sm:px-4 md:px-6">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Maid/Matron of Honor" since it's already rendered above
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
                          <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Bridesmaids" rightTitle="Groomsmen">
                          {(() => {
                            const maxLen = Math.max(bridesmaids.length, groomsmen.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = bridesmaids[i]
                              const right = groomsmen[i]
                              rows.push(
                                <React.Fragment key={`bridal-row-${i}`}>
                                  <div key={`bridesmaid-cell-${i}`} className="px-3 sm:px-4 md:px-6">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                                  </div>
                                  <div key={`groomsman-cell-${i}`} className="px-3 sm:px-4 md:px-6">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
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
                          <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Candle Sponsors" rightTitle="Veil Sponsors">
                          {(() => {
                            const maxLen = Math.max(candleSponsors.length, veilSponsors.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = candleSponsors[i]
                              const right = veilSponsors[i]
                              rows.push(
                                <React.Fragment key={`sponsors-row-${i}`}>
                                  <div key={`candle-cell-${i}`} className="px-3 sm:px-4 md:px-6">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                                  </div>
                                  <div key={`veil-cell-${i}`} className="px-3 sm:px-4 md:px-6">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
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
                      <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                        <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                      </div>
                    )}
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        const SINGLE_COLUMN_SECTIONS = new Set([
                          "Best Man",
                          "Maid/Matron of Honor",
                          "Ring Bearer",
                          "Coin Bearer",
                          "Bible Bearer",
                          "Presider",
                        ])
                        // Special rule: Cord Sponsors with exactly 2 names should be displayed as two columns meeting at center
                        if (category === "Cord Sponsors" && members.length === 2) {
                          const left = members[0]
                          const right = members[1]
                          return (
                            <>
                              <div className="px-3 sm:px-4 md:px-6">
                                <NameItem member={left} align="right" />
                              </div>
                              <div className="px-3 sm:px-4 md:px-6">
                                <NameItem member={right} align="left" />
                              </div>
                            </>
                          )
                        }
                        if (SINGLE_COLUMN_SECTIONS.has(category) || members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-2 sm:gap-2.5">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Default two-column sections: render row-by-row pairs to keep alignment on small screens
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-3 sm:px-4 md:px-6">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-3 sm:px-4 md:px-6">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
              
              {/* Display any other categories not in the ordered list */}
              {Object.keys(grouped).filter(cat => !ROLE_CATEGORY_ORDER.includes(cat)).map((category) => {
                const members = grouped[category]
                return (
                  <div key={category}>
                    <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                      <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                    </div>
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        if (members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-2 sm:gap-2.5">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Pair row-by-row for other categories as well
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-3 sm:px-4 md:px-6">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-3 sm:px-4 md:px-6">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-1 sm:py-1.5 md:py-2" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
            </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
