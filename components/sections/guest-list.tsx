"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"

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

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  })

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests()
  }, [])

  // Filter guests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query)
    )

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      setGuests(data)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)
    
    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    })
    
    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
    
    // Show modal
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please select if you can attend")
      setTimeout(() => setError(null), 5000)
      return
    }

    // Validate guest count if attending
    if (formData.RSVP === "Yes" && (!formData.Guest || parseInt(formData.Guest) < 1)) {
      setError("Please enter the number of guests (minimum 1)")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? (formData.Guest || "1") : "0",
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!")
      setHasResponded(true)
      
      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"))
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false)
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      setError("Failed to submit RSVP. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" })
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.")
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting request:", error)
      setError("Failed to submit request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <Section id="guest-list" className="relative z-30 py-6 sm:py-10 md:py-12 lg:py-16">
      {/* Header */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-3 md:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
        >
          Confirm Your Attendance
        </p>
        
        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          RSVP
        </h2>
        
        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          Please search for your name below to confirm your presence at our special day
        </p>
        
        {/* RSVP Deadline */}
        <div className={`${cormorant.className} text-[11px] sm:text-xs md:text-sm text-white/95 font-normal max-w-xl mx-auto leading-relaxed px-2 mb-3 sm:mb-4 md:mb-5`}>
          <p className="mb-1 sm:mb-1.5">
            A courtesy of reply is appreciated. Please RSVP on or before:
          </p>
          <p className="font-semibold text-[#E0CFB5]">
            April 30, 2026
          </p>
        </div>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-[#D1AB6D] to-transparent" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#E0CFB5]/90 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/85 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#E0CFB5]/90 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-l from-transparent via-[#D1AB6D] to-transparent" />
        </div>
      </div>

      {/* Search Section */}
      <div className="relative z-10 max-w-2xl mx-auto px-2 sm:px-4 md:px-6 overflow-visible">
        {/* Card with elegant border */}
        <div className="relative bg-white/10 backdrop-blur-md border border-[#E0CFB5]/60 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg overflow-visible">
          {/* Card content */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6 overflow-visible">
            <div className="relative z-10 space-y-3 sm:space-y-4 overflow-visible">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-[#525E2C] p-1.5 sm:p-2 rounded-lg shadow-md">
                  <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm md:text-base font-semibold text-white font-sans mb-0.5 sm:mb-1">
                    Find Your Name
                  </label>
                  <p className="text-[10px] sm:text-xs text-white/80 font-sans">
                    Type as you search to see instant results
                  </p>
                </div>
              </div>
              <div ref={searchRef} className="relative z-[100]">
                <div className="relative">
                  <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#525E2C]/70 pointer-events-none transition-colors duration-200" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name..."
                    className="w-full pl-8 sm:pl-10 pr-2.5 sm:pr-3 py-2 sm:py-2.5 md:py-3 border-2 border-[#E0CFB5]/60 focus:border-[#525E2C] rounded-lg text-xs sm:text-sm font-sans text-[#243127] placeholder:text-[#909E8D]/70 transition-all duration-300 hover:border-[#525E2C]/70 focus:ring-2 focus:ring-[#525E2C]/20 bg-white shadow-sm focus:shadow-md"
                  />
                </div>
                {/* Autocomplete dropdown */}
                {isSearching && filteredGuests.length > 0 && (
                  <div 
                    className="absolute z-[9999] w-full mt-1 sm:mt-1.5 md:mt-2 bg-white/95 backdrop-blur-lg border border-[#E0CFB5]/70 rounded-lg sm:rounded-xl shadow-xl overflow-hidden" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%',
                      left: 0,
                      right: 0
                    }}
                  >
                    {filteredGuests.map((guest, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchSelect(guest)}
                        className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 text-left hover:bg-[#F0F0EE]/40 active:bg-[#E0CFB5]/40 transition-all duration-200 flex items-center gap-2 sm:gap-3 border-b border-[#E0CFB5]/40 last:border-b-0 group"
                      >
                        <div className="relative flex-shrink-0">
                          <div className="bg-[#525E2C] p-1 sm:p-1.5 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                            <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs sm:text-sm text-[#243127] group-hover:text-[#525E2C] transition-colors duration-200 truncate">
                            {guest.Name}
                          </div>
                          {guest.Email && guest.Email !== "Pending" && (
                            <div className="text-[10px] sm:text-xs text-[#909E8D]/80 truncate mt-0.5">
                              {guest.Email}
                            </div>
                          )}
                        </div>
                        <div className="text-[#909E8D]/70 group-hover:text-[#525E2C] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {searchQuery && filteredGuests.length === 0 && (
                  <div 
                    className="absolute z-[9999] w-full mt-1.5 sm:mt-2 bg-white/95 backdrop-blur-lg border-2 border-[#E0CFB5]/80 rounded-lg shadow-xl overflow-hidden" 
                    style={{ 
                      position: 'absolute', 
                      top: '100%',
                      left: 0,
                      right: 0
                    }}
                  >
                    <div className="p-2.5 sm:p-3 md:p-4">
                      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="bg-[#525E2C] p-1.5 sm:p-2 rounded-lg flex-shrink-0 shadow-sm">
                          <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-xs sm:text-sm text-[#243127] mb-1">Not finding your name?</h4>
                          <p className="text-[10px] sm:text-xs text-[#909E8D] leading-relaxed">
                            We'd love to have you with us! Send a request to join the celebration.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className="w-full !bg-[#525E2C] hover:!bg-[#909E8D] text-white py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                      >
                        <UserPlus className="h-3 w-3 mr-1.5 sm:mr-2 inline" />
                        Request to Join
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-lg mx-1 sm:mx-2 md:mx-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#E0CFB5]/80 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
              {/* Modal Header */}
              <div className="relative bg-[#525E2C] p-3 sm:p-4 md:p-5 lg:p-6 flex-shrink-0">
                <div className="relative flex items-start justify-between gap-1.5 sm:gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-serif font-bold text-white truncate">
                        You're Invited!
                      </h3>
                    </div>
                    <p className="text-white/95 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-sans leading-tight sm:leading-normal">
                      Hello <span className="font-extrabold text-[#FFFFFF] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{selectedGuest?.Name}</span>, you are invited to our wedding!
                    </p>
                  </div>
                  {!hasResponded && (
                    <button
                      onClick={handleCloseModal}
                      className="text-white/80 hover:text-white transition-colors p-0.5 sm:p-1 md:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                    >
                      <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 overflow-y-auto flex-1 min-h-0">
                {hasResponded ? (
                  // Thank you message for guests who already responded
                  <div className="text-center py-3 sm:py-4 md:py-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#E0CFB5] rounded-full mb-2 sm:mb-3 md:mb-4">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#525E2C]" />
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-[#243127] mb-1.5 sm:mb-2 md:mb-3">
                      Thank You for Responding!
                    </h4>
                    <p className="text-[#909E8D] text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3 md:mb-4 px-2">
                      We've received your RSVP and look forward to celebrating with you!
                    </p>
                    <div className="bg-[#F0F0EE]/40 rounded-lg p-2.5 sm:p-3 md:p-4 border border-[#E0CFB5]/70 space-y-2 sm:space-y-2.5 md:space-y-3">
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2">
                        {selectedGuest?.RSVP === "Yes" && (
                          <>
                            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
                            <span className="text-xs sm:text-sm md:text-base font-semibold text-green-600">
                              You're Attending!
                            </span>
                          </>
                        )}
                        {selectedGuest?.RSVP === "No" && (
                          <>
                            <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600" />
                            <span className="text-xs sm:text-sm md:text-base font-semibold text-red-600">
                              Unable to Attend
                            </span>
                          </>
                        )}
                      </div>
                      {selectedGuest?.RSVP === "Yes" && selectedGuest?.Guest && (
                        <div className="bg-[#F0F0EE]/60 rounded-lg p-2 sm:p-2.5 md:p-3 border border-[#E0CFB5]/80">
                          <div className="text-center">
                            <p className="text-[10px] sm:text-xs text-[#909E8D] mb-1 font-medium">Number of Guests</p>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#243127]">
                              {selectedGuest.Guest || "1"}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedGuest && selectedGuest.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="pt-1.5 sm:pt-2 border-t border-[#E0CFB5]/70">
                          <p className="text-[10px] sm:text-xs text-[#909E8D] italic px-1">
                            "{selectedGuest.Message}"
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="mt-3 sm:mt-4 md:mt-6 !bg-[#525E2C] hover:!bg-[#909E8D] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  // RSVP Form for guests who haven't responded
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRSVP()
                    }}
                    className="space-y-2.5 sm:space-y-3 md:space-y-4"
                  >
                    {/* Can you attend? */}
                    <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#243127] mb-1.5 sm:mb-2 font-sans">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#909E8D] flex-shrink-0" />
                        <span>Can you attend? *</span>
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, RSVP: "Yes", Guest: "1" }))
                          }
                          className={`relative p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.RSVP === "Yes"
                              ? "border-green-600 bg-green-50 shadow-md scale-105"
                              : "border-[#E0CFB5]/60 bg-white hover:border-[#909E8D]/70 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                            <CheckCircle
                              className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                                formData.RSVP === "Yes" ? "text-green-700" : "text-[#909E8D]/60"
                              }`}
                            />
                            <span
                              className={`text-xs sm:text-sm font-bold ${
                                formData.RSVP === "Yes" ? "text-green-700" : "text-[#243127]"
                              }`}
                            >
                              Yes!
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                          className={`relative p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.RSVP === "No"
                              ? "border-red-500 bg-red-50 shadow-md scale-105"
                              : "border-[#E0CFB5]/60 bg-white hover:border-[#909E8D]/70 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                            <XCircle
                              className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#909E8D]/60"
                              }`}
                            />
                            <span
                              className={`text-xs sm:text-sm font-bold ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#243127]"
                              }`}
                            >
                              Sorry, No
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Guest count defaults to one; no input needed */}

                    {/* Message to the couple */}
                    <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#243127] mb-1.5 sm:mb-2 font-sans flex-wrap">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#909E8D] flex-shrink-0" />
                        <span>Your Message to the Couple</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#909E8D]">(Optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        onChange={handleFormChange}
                        placeholder="Share your excitement..."
                        rows={3}
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-[#E0CFB5]/60 focus:border-[#525E2C] rounded-lg text-xs sm:text-sm font-sans text-[#243127] placeholder:text-[#909E8D]/70 transition-all duration-300 focus:ring-2 focus:ring-[#525E2C]/20 resize-none bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#243127] mb-1.5 sm:mb-2 font-sans flex-wrap">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#909E8D] flex-shrink-0" />
                        <span>Your Email Address</span>
                        <span className="text-[10px] sm:text-xs font-normal text-[#909E8D]">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com"
                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-[#E0CFB5]/60 focus:border-[#525E2C] rounded-lg text-xs sm:text-sm font-sans text-[#243127] placeholder:text-[#909E8D]/70 transition-all duration-300 focus:ring-2 focus:ring-[#525E2C]/20 bg-white"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 sm:pt-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full !bg-[#525E2C] hover:!bg-[#909E8D] text-white py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-1.5 sm:gap-2"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                            <span className="text-xs sm:text-sm">Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm">Submit RSVP</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Enhanced Success Overlay */}
              {success && (
                <div className="absolute inset-0 bg-[#525E2C]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-2 sm:p-3 md:p-4">
                  <div className="text-center p-3 sm:p-4 md:p-5 lg:p-6 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                      {/* Icon container */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-[#525E2C]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-white mb-2 sm:mb-3">
                      RSVP Confirmed!
                    </h4>
                    
                    {/* Message based on RSVP response */}
                    {formData.RSVP === "Yes" && (
                      <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                        <p className="text-white/95 text-xs sm:text-sm font-medium">
                          We're thrilled you'll be joining us!
                        </p>
                        <p className="text-white/80 text-[10px] sm:text-xs">
                          Your response has been recorded
                        </p>
                      </div>
                    )}
                    {formData.RSVP === "No" && (
                      <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3">
                        We'll miss you, but thank you for letting us know.
                      </p>
                    )}
                    {!formData.RSVP && (
                      <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3">
                        Thank you for your response!
                      </p>
                    )}
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-pulse" />
                      <p className="text-white/70 text-[10px] sm:text-xs">
                        This will close automatically
                      </p>
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !success && (
                <div className="px-2 sm:px-2.5 md:px-4 lg:px-6 xl:px-8 pb-2 sm:pb-2.5 md:pb-4 lg:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2 sm:p-2.5 md:p-3 lg:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-[10px] sm:text-xs md:text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Request to Join Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-lg mx-1 sm:mx-2 md:mx-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#E0CFB5]/80 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
              {/* Modal Header with Gradient */}
              <div className="relative bg-[#525E2C] p-3 sm:p-4 md:p-5 lg:p-6 flex-shrink-0">
                <div className="relative flex items-start justify-between gap-1.5 sm:gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <UserPlus className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-serif font-bold text-white truncate">
                        Request to Join
                      </h3>
                    </div>
                    <p className="text-white/95 text-[10px] sm:text-xs md:text-sm lg:text-base font-sans leading-tight sm:leading-normal">
                      {requestFormData.Name ? (
                        <>Hi <span className="font-extrabold text-[#FFFFFF] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{requestFormData.Name}</span> — want to celebrate with us? Send a request!</>
                      ) : (
                        <>Want to celebrate with us? Send a request!</>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseRequestModal}
                    className="text-white/80 hover:text-white transition-colors p-0.5 sm:p-1 md:p-1.5 lg:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 overflow-y-auto flex-1 min-h-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitRequest()
                  }}
                  className="space-y-2.5 sm:space-y-3 md:space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#243127] mb-1.5 sm:mb-2 font-sans">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#909E8D] flex-shrink-0" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={requestFormData.Name}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-[#E0CFB5]/60 focus:border-[#525E2C] rounded-lg text-xs sm:text-sm font-sans text-[#243127] placeholder:text-[#909E8D]/70 transition-all duration-300 focus:ring-2 focus:ring-[#525E2C]/20 bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#243127] mb-1.5 sm:mb-2 font-sans flex-wrap">
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#909E8D] flex-shrink-0" />
                      <span>Email Address</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#909E8D]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={requestFormData.Email}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-[#E0CFB5]/60 focus:border-[#525E2C] rounded-lg text-xs sm:text-sm font-sans text-[#243127] placeholder:text-[#909E8D]/70 transition-all duration-300 focus:ring-2 focus:ring-[#525E2C]/20 bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#243127] mb-1.5 sm:mb-2 font-sans flex-wrap">
                      <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#909E8D] flex-shrink-0" />
                      <span>Phone Number</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#909E8D]">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={requestFormData.Phone}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-[#E0CFB5]/60 focus:border-[#525E2C] rounded-lg text-xs sm:text-sm font-sans text-[#243127] placeholder:text-[#909E8D]/70 transition-all duration-300 focus:ring-2 focus:ring-[#525E2C]/20 bg-white"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#243127] mb-1.5 sm:mb-2 font-sans">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#909E8D] flex-shrink-0" />
                      <span>Number of Guests *</span>
                    </label>
                    <input
                      type="number"
                      name="Guest"
                      value={requestFormData.Guest}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                      min="1"
                      required
                      placeholder="How many guests?"
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-[#E0CFB5]/60 focus:border-[#525E2C] rounded-lg text-xs sm:text-sm font-sans text-[#243127] placeholder:text-[#909E8D]/70 transition-all duration-300 focus:ring-2 focus:ring-[#525E2C]/20 bg-white"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#243127] mb-1.5 sm:mb-2 font-sans flex-wrap">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#909E8D] flex-shrink-0" />
                      <span>Message</span>
                        <span className="text-[10px] sm:text-xs font-normal text-[#909E8D]">(Optional)</span>
                    </label>
                    <textarea
                      name="Message"
                      value={requestFormData.Message}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                      placeholder="Share why you'd like to join..."
                      rows={3}
                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-[#E0CFB5]/60 focus:border-[#525E2C] rounded-lg text-xs sm:text-sm font-sans text-[#243127] placeholder:text-[#909E8D]/70 transition-all duration-300 focus:ring-2 focus:ring-[#525E2C]/20 resize-none bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 sm:pt-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full !bg-[#525E2C] hover:!bg-[#909E8D] text-white py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-1.5 sm:gap-2"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                          <span className="text-xs sm:text-sm">Submitting...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm">Send Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Enhanced Success Overlay */}
              {requestSuccess && (
                <div className="absolute inset-0 bg-[#525E2C]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-2 sm:p-3 md:p-4">
                  <div className="text-center p-3 sm:p-4 md:p-5 lg:p-6 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                      {/* Icon container */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-6 w-6 sm:h-7 sm:h-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-[#525E2C]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-white mb-2 sm:mb-3">
                      Request Sent!
                    </h4>
                    
                    {/* Message */}
                    <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                      <p className="text-white/95 text-xs sm:text-sm font-medium">
                        We've received your request
                      </p>
                      <p className="text-white/85 text-[10px] sm:text-xs">
                        We'll review it and get back to you soon
                      </p>
                    </div>
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-pulse" />
                      <p className="text-white/70 text-[10px] sm:text-xs">
                        This will close automatically
                      </p>
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !requestSuccess && (
                <div className="px-2 sm:px-2.5 md:px-4 lg:px-6 xl:px-8 pb-2 sm:pb-2.5 md:pb-4 lg:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2 sm:p-2.5 md:p-3 lg:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-[10px] sm:text-xs md:text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-2 sm:mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-2 sm:p-3 md:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
              <span className="text-green-600 font-semibold text-xs sm:text-sm md:text-base">{success}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
