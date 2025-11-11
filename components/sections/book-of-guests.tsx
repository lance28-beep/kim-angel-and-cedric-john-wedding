"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"

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
      className="relative bg-gradient-to-b from-[#AFC8E6] via-[#D8B0B0]/90 to-[#AFC8E6] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle background elements to match Principal Sponsors */}
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
          Book of Guests
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FFFFFF]/90 font-sans font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
          See who's celebrating with us on our special day
        </p>
      </div>

      {/* Guests content */}
      <div className="relative z-10">
        {/* Stats card */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-white/95 backdrop-blur-sm border border-[#F1EDE2]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
              {/* Inner gold border */}
              <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#F1EDE2] rounded-lg sm:rounded-xl pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-[#AFC8E6] p-2 sm:p-3 rounded-full shadow-lg">
                    <Heart className="text-[#FFFFFF] h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-bold text-black">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-black/60 font-sans mt-1">
                      {guests.length} {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-black/80 font-sans leading-relaxed">
                  Thank you for confirming your RSVP! Your presence means the world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative bg-white/95 backdrop-blur-sm border border-[#F1EDE2]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl overflow-hidden">
            {/* Inner gold border */}
            <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#F1EDE2] rounded-lg sm:rounded-xl pointer-events-none" />
            
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-[#F1EDE2]" />
                  <span className="text-[#AFC8E6] font-sans text-lg">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-500 font-sans text-lg mb-2">{error}</p>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <div className="bg-[#AFC8E6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-[#FFFFFF]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-black mb-2">
                    No guests have RSVP'd yet
                  </h3>
                  <p className="text-sm sm:text-base text-black/70 font-sans max-w-md mx-auto leading-relaxed">
                    Be the first to RSVP and kick off the celebration!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 relative z-10">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#F1EDE2]/30 hover:border-[#F1EDE2]/50 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {/* Avatar */}
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-[#AFC8E6] text-[#FFFFFF] flex items-center justify-center font-semibold shadow-md ring-2 ring-white text-sm sm:text-base">
                          {getInitials(guest.Name)}
                        </div>
                      </div>
                      
                      {/* Guest Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                          <div className="flex-1">
                            <h4 className="font-sans text-base sm:text-lg md:text-xl font-semibold text-black mb-1 group-hover:text-[#D8B0B0] transition-colors duration-200">
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="flex items-center text-xs sm:text-sm text-black/60">
                                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 text-[#F1EDE2] flex-shrink-0" />
                                <span className="font-sans break-all">{guest.Email}</span>
                              </div>
                            )}
                          </div>
                          {/* Guest count badge */}
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-[#F1EDE2] flex-shrink-0" />
                            <span className="inline-flex items-center justify-center px-3 py-1 bg-[#F1EDE2]/10 text-[#D8B0B0] rounded-full text-xs sm:text-sm font-semibold border border-[#F1EDE2]/30">
                              {guest.Guest ? (parseInt(String(guest.Guest)) || 1) : 1} {parseInt(String(guest.Guest || '1')) === 1 ? 'guest' : 'guests'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Message */}
                        {guest.Message && (
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#F1EDE2]/20">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <MessageSquare className="h-4 w-4 text-[#F1EDE2] flex-shrink-0 mt-0.5" />
                              <p className="text-xs sm:text-sm md:text-base text-black/80 font-sans leading-relaxed italic flex-1">
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
