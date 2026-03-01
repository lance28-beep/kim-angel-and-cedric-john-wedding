"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"
import { siteContent } from "@/lib/content"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || '1', // Ensure Guest field exists
        }))
      
      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1
        return sum + guestCount
      }, 0)
      
      setGuests(attendingGuests)
      setTotalGuests(totalGuestCount)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <div
      id="guests"
      className="relative z-10 bg-[#909E8D] py-6 sm:py-12 md:py-16 lg:py-20 overflow-hidden isolate"
    >
      {/* Background elements with elegant sage motif (aligned with entourage section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical sage gradients to frame the guest book */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#3D4636]/90 via-[#909E8D]/75 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#3D4636]/95 via-[#909E8D]/70 to-transparent" />
        {/* Soft radial light in warm neutrals */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,207,181,0.28),transparent_55%)] opacity-90" />
        {/* Subtle diagonal wash of muted sage */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#909E8D]/25 via-transparent to-[#F0F0EE]/10 mix-blend-soft-light" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-3 md:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
        >
          Our Cherished Guests
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.9)" }}
        >
          Book of Guests
        </h2>

        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/95 font-light max-w-xl mx-auto leading-relaxed px-2 mb-3 sm:mb-4 md:mb-5`}>
          See who&apos;s celebrating with us on our special day. Kindly RSVP by {siteContent.details.rsvp.deadline}.
        </p>

        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-[#D1AB6D] to-transparent" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#E0CFB5]/90 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/85 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#E0CFB5]/90 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-l from-transparent via-[#D1AB6D] to-transparent" />
        </div>
      </div>

      {/* Guests content */}
      <div className="relative">
        {/* Stats card */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-[#F7F5F1]/95 backdrop-blur-md border border-[#E0CFB5]/80 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="bg-[#525E2C] p-1.5 sm:p-2 rounded-full shadow-lg border border-[#E0CFB5]/80">
                    <Heart className="text-[#F0F0EE] h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className={`${cormorant.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#243127]`}>
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                    </h3>
                    <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#556457] mt-0.5`}>
                      {guests.length} {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#37413A] leading-relaxed`}>
                  Thank you for confirming your RSVP! Your presence means the world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative bg-[#F7F5F1]/95 backdrop-blur-md border border-[#E0CFB5]/80 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-[#525E2C]" />
                  <span className={`${cormorant.className} text-[#37413A] text-sm sm:text-base`}>Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 mx-auto mb-3" />
                  <p className={`${cormorant.className} text-red-600 text-sm sm:text-base mb-2`}>{error}</p>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <div className="bg-[#F0F0EE] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md border border-[#E0CFB5]">
                    <Heart className="h-6 w-6 sm:h-7 sm:h-7 text-[#525E2C]" />
                  </div>
                  <h3 className={`${cormorant.className} text-base sm:text-lg md:text-xl font-semibold text-[#243127] mb-2`}>
                    No guests have RSVP&apos;d yet
                  </h3>
                  <p className={`${cormorant.className} text-xs sm:text-sm text-[#556457] max-w-md mx-auto leading-relaxed`}>
                    Be the first to RSVP and kick off the celebration!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 relative">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/70 backdrop-blur-sm rounded-md sm:rounded-lg p-2.5 sm:p-3 md:p-4 border border-[#E0CFB5]/80 hover:border-[#D1AB6D] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-white"
                  >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      {/* Avatar */}
                      <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-[#525E2C] text-[#F0F0EE] flex items-center justify-center font-semibold shadow-md ring-2 ring-[#E0CFB5]/70 text-[10px] sm:text-xs md:text-sm">
                          {getInitials(guest.Name)}
                        </div>
                      </div>
                      
                      {/* Guest Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className={`${cormorant.className} text-sm sm:text-base md:text-lg font-semibold text-[#243127] mb-0.5 group-hover:text-[#111814] transition-colors duration-200 truncate`}>
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="flex items-center text-[10px] sm:text-xs text-[#556457]">
                                <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-[#909E8D] flex-shrink-0" />
                                <span className={`${cormorant.className} break-all truncate`}>{guest.Email}</span>
                              </div>
                            )}
                          </div>
                          {/* Guest count badge */}
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                            <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#525E2C] flex-shrink-0" />
                            <span className={`${cormorant.className} inline-flex items-center justify-center px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#F0F0EE] text-[#243127] rounded-full text-[10px] sm:text-xs font-semibold border border-[#E0CFB5] whitespace-nowrap`}>
                              {guest.Guest ? (parseInt(String(guest.Guest)) || 1) : 1} {parseInt(String(guest.Guest || '1')) === 1 ? 'guest' : 'guests'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Message */}
                        {guest.Message && (
                          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#E0CFB5]/60">
                            <div className="flex items-start gap-1.5 sm:gap-2">
                              <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#909E8D] flex-shrink-0 mt-0.5" />
                              <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#37413A] leading-relaxed italic flex-1`}>
                                "{guest.Message}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
