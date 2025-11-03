"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
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

interface Guest {
  Name: string
  Email: string
  RSVP: string
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
    Message: "",
  })

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
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
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
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
    setFormData({ Name: "", Email: "", RSVP: "", Message: "" })
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
        setRequestFormData({ Name: "", Email: "", Phone: "", Message: "" })
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
    setRequestFormData({ Name: "", Email: "", Phone: "", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <Section id="guest-list" className="relative py-24 md:py-36">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#BB8A3D]/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-20 w-20 h-20 bg-[#CDAC77]/15 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-[#BB8A3D]/8 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#CDAC77]/12 rounded-full blur-lg animate-pulse" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDAC77]/25 to-transparent" />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-40 sm:w-56 md:w-64 lg:w-72 opacity-80 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-40 sm:w-56 md:w-64 lg:w-72 opacity-80 select-none transform scale-x-[-1]"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-40 sm:w-56 md:w-64 lg:w-72 opacity-80 select-none rotate-180"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-40 sm:w-56 md:w-64 lg:w-72 opacity-80 select-none transform rotate-180 scale-x-[-1]"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-1 md:gap-3 mb-2 md:mb-4">
          <Sparkles className="text-[#FFF6E7]/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" />
          <span className="text-[#FFF6E7]/80 font-lora text-xs md:text-sm uppercase tracking-wider">We'd Love to Celebrate With You</span>
          <Sparkles className="text-[#FFF6E7]/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
          <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FFF6E7] mb-4 md:mb-6 text-balance drop-shadow-lg relative overflow-visible">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#BB8A3D] via-[#CDAC77] to-[#FFF6E7]">
              RSVP
            </span>
            <span className="absolute -inset-x-3 -inset-y-4 text-[#BB8A3D]/25 blur-[28px] -z-10 select-none pointer-events-none">
              RSVP
            </span>
          </h2>
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-[#CDAC77]/30" />
            <div className="w-2 h-2 rounded-full bg-[#BB8A3D]" />
            <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#BB8A3D]/60 to-[#CDAC77]/30" />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-[#FFF6E7]/90 font-sans max-w-2xl mx-auto leading-relaxed px-4">
            Please search for your name below to confirm your attendance and help us prepare for this special celebration
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto px-2 sm:px-4">
          <div className="relative overflow-visible">
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/90 rounded-3xl blur-sm -z-10"></div>
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-[#BB8A3D]/20 overflow-visible">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-[#BB8A3D] to-[#CDAC77] p-2 rounded-xl shadow-lg">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-[#402921] font-sans mb-1">
                      Find Your Name
                    </label>
                    <p className="text-xs sm:text-sm text-[#402921]/60 font-sans">
                      Type as you search to see instant results
                    </p>
                  </div>
                </div>
                <div ref={searchRef} className="relative overflow-visible">
                  <div className="relative">
                    <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#BB8A3D]/60 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type your name..."
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 sm:py-5 border-2 border-[#402921]/20 focus:border-[#BB8A3D] rounded-xl sm:rounded-2xl text-base sm:text-lg font-sans placeholder:text-[#402921]/40 transition-all duration-300 hover:border-[#BB8A3D]/40 focus:ring-4 focus:ring-[#BB8A3D]/10 bg-gradient-to-br from-white to-[#FFF6E7]/50 shadow-inner"
                    />
                  </div>
                  {/* Enhanced Autocomplete dropdown */}
                  {isSearching && filteredGuests.length > 0 && (
                    <div className="absolute z-[9999] w-full mt-3 bg-white border-2 border-[#BB8A3D]/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in duration-200">
                      {filteredGuests.map((guest, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(guest)}
                          className="w-full px-5 py-4 text-left hover:bg-gradient-to-r hover:from-[#BB8A3D]/10 hover:to-[#CDAC77]/5 transition-all duration-200 flex items-center gap-4 border-b border-[#402921]/5 last:border-b-0 group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#BB8A3D] to-[#CDAC77] rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
                            <div className="relative bg-gradient-to-br from-[#402921] to-[#583016] p-2 rounded-full">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[#402921] group-hover:text-[#BB8A3D] transition-colors duration-200 truncate">
                              {guest.Name}
                            </div>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="text-xs text-[#402921]/60 truncate mt-0.5">
                                {guest.Email}
                              </div>
                            )}
                          </div>
                          <div className="text-[#BB8A3D]/40 group-hover:text-[#BB8A3D] transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery && filteredGuests.length === 0 && (
                    <div className="absolute z-[9999] w-full mt-3 bg-gradient-to-br from-white to-[#FFF6E7]/30 border-2 border-[#BB8A3D]/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in duration-200">
                      <div className="p-5">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-xl flex-shrink-0">
                            <UserPlus className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#402921] mb-1">Not finding your name?</h4>
                            <p className="text-sm text-[#402921]/70">
                              We'd love to have you with us! Send a request to join the celebration.
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            setRequestFormData({ ...requestFormData, Name: searchQuery })
                            setShowRequestModal(true)
                          }}
                          className="w-full bg-gradient-to-r from-[#BB8A3D] to-[#CDAC77] hover:from-[#CDAC77] hover:to-[#BB8A3D] text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                          <UserPlus className="h-4 w-4 mr-2 inline" />
                          Request to Join
                        </Button>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-2xl mx-3 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#BB8A3D]/30 overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-[#BB8A3D] via-[#CDAC77] to-[#BB8A3D] p-4 sm:p-6 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
                        You're Invited!
                      </h3>
                    </div>
                    <p className="text-white/95 text-sm sm:text-base md:text-lg font-sans">
                      Hello <span className="font-extrabold text-[#FFE8B5] drop-shadow-[0_1px_6px_rgba(187,138,61,0.55)]">{selectedGuest?.Name}</span>, you are invited to our wedding!
                    </p>
                  </div>
                  {!hasResponded && (
                    <button
                      onClick={handleCloseModal}
                      className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8 max-h-[75vh] sm:max-h-[70vh] overflow-y-auto">
                {hasResponded ? (
                  // Thank you message for guests who already responded
                  <div className="text-center py-6 sm:py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4 sm:mb-6">
                      <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#402921] mb-2 sm:mb-3">
                      Thank You for Responding!
                    </h4>
                    <p className="text-[#402921]/80 text-sm sm:text-base mb-4 sm:mb-6">
                      We've received your RSVP and look forward to celebrating with you!
                    </p>
                    <div className="bg-gradient-to-br from-[#BB8A3D]/10 to-[#CDAC77]/5 rounded-xl p-4 sm:p-6 border border-[#BB8A3D]/20">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        {selectedGuest?.RSVP === "Yes" && (
                          <>
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            <span className="text-base sm:text-lg font-semibold text-green-600">
                              You're Attending!
                            </span>
                          </>
                        )}
                        {selectedGuest?.RSVP === "No" && (
                          <>
                            <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            <span className="text-base sm:text-lg font-semibold text-red-600">
                              Unable to Attend
                            </span>
                          </>
                        )}
                      </div>
                      {selectedGuest?.Message && (
                        <p className="text-xs sm:text-sm text-[#402921]/80 italic">
                          "{selectedGuest.Message}"
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={handleCloseModal}
                      className="mt-4 sm:mt-6 bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white px-6 sm:px-8 py-3 rounded-xl"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  // RSVP Form for guests who haven't responded
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRSVP()
                    }}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Can you attend? */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#402921] mb-2 sm:mb-4 font-sans">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#BB8A3D]" />
                        Can you attend? *
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                          className={`relative p-3 sm:p-6 rounded-2xl border-4 transition-all duration-300 ${
                            formData.RSVP === "Yes"
                              ? "border-green-500 bg-green-50 shadow-lg scale-105"
                              : "border-[#402921]/20 bg-white hover:border-[#BB8A3D]/40 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <CheckCircle
                              className={`h-6 w-6 sm:h-8 sm:w-8 ${
                                formData.RSVP === "Yes" ? "text-green-600" : "text-[#402921]/40"
                              }`}
                            />
                            <span
                              className={`text-base sm:text-xl font-bold ${
                                formData.RSVP === "Yes"
                                  ? "text-green-600"
                                  : "text-[#402921]"
                              }`}
                            >
                              Yes!
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                          className={`relative p-3 sm:p-6 rounded-2xl border-4 transition-all duration-300 ${
                            formData.RSVP === "No"
                              ? "border-red-500 bg-red-50 shadow-lg scale-105"
                              : "border-[#402921]/20 bg-white hover:border-[#BB8A3D]/40 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <XCircle
                              className={`h-6 w-6 sm:h-8 sm:w-8 ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#402921]/40"
                              }`}
                            />
                            <span
                              className={`text-base sm:text-xl font-bold ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#402921]"
                              }`}
                            >
                              Sorry, No
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Message to the couple */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#402921] mb-2 sm:mb-3 font-sans">
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#BB8A3D]" />
                        Your Message to the Couple
                        <span className="text-xs sm:text-sm font-normal text-[#402921]/60">(Optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        onChange={handleFormChange}
                        placeholder="Share your excitement, well wishes, or any special dietary requirements..."
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10 resize-none bg-white/80"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#402921] mb-2 sm:mb-3 font-sans">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#BB8A3D]" />
                        Your Email Address
                        <span className="text-xs sm:text-sm font-normal text-[#402921]/60">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10 bg-white/80"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3 sm:pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-3">
                            <RefreshCw className="h-5 w-5 animate-spin" />
                            <span className="text-sm sm:text-base">Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <Heart className="h-5 w-5" />
                            <span className="text-sm sm:text-base">Submit RSVP</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Success message overlay */}
              {success && (
                <div className="absolute inset-0 bg-green-500/95 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
                  <div className="text-center p-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6 backdrop-blur-md">
                      <CheckCircle className="h-12 w-12 text-white animate-in zoom-in" />
                    </div>
                    <h4 className="text-3xl font-serif font-bold text-white mb-3">
                      Thank You!
                    </h4>
                    <p className="text-white/95 text-xl">
                      {success}
                    </p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="px-6 sm:px-8 pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-600 font-semibold text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Request to Join Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-2xl mx-3 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#BB8A3D]/30 overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-[#BB8A3D] via-[#CDAC77] to-[#BB8A3D] p-4 sm:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
                        Request to Join
                      </h3>
                    </div>
                    <p className="text-white/95 text-sm sm:text-base font-sans">
                      {requestFormData.Name ? (
                        <>Hi <span className="font-extrabold text-[#FFE8B5] drop-shadow-[0_1px_6px_rgba(187,138,61,0.55)]">{requestFormData.Name}</span> — want to celebrate with us? Send a request!</>
                      ) : (
                        <>Want to celebrate with us? Send a request!</>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseRequestModal}
                    className="text-white/80 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/20 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-8 max-h-[75vh] sm:max-h-[70vh] overflow-y-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitRequest()
                  }}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#402921] mb-2 sm:mb-3 font-sans">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#BB8A3D]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={requestFormData.Name}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10 bg-white/80"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#402921] mb-2 sm:mb-3 font-sans">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#BB8A3D]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={requestFormData.Email}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10 bg-white/80"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#402921] mb-2 sm:mb-3 font-sans">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#BB8A3D]" />
                      Phone Number
                      <span className="text-sm font-normal text-[#402921]/60">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={requestFormData.Phone}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10 bg-white/80"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#402921] mb-2 sm:mb-3 font-sans">
                      <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#BB8A3D]" />
                      Message
                      <span className="text-sm font-normal text-[#402921]/60">(Optional)</span>
                    </label>
                    <textarea
                      name="Message"
                      value={requestFormData.Message}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                      placeholder="Share why you'd like to join the celebration..."
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10 resize-none bg-white/80"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 sm:pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          <span className="text-sm sm:text-base">Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <UserPlus className="h-5 w-5" />
                          <span className="text-sm sm:text-base">Send Request</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Success message overlay */}
              {requestSuccess && (
                <div className="absolute inset-0 bg-green-500/95 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
                  <div className="text-center p-6 sm:p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-white/20 rounded-full mb-4 sm:mb-6 backdrop-blur-md">
                      <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-white animate-in zoom-in" />
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 sm:mb-3">
                      Thank You!
                    </h4>
                    <p className="text-white/95 text-base sm:text-xl">
                      {requestSuccess}
                    </p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="px-6 sm:px-8 pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-600 font-semibold text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floating Status Messages (outside modals) */}
        {success && !showModal && !showRequestModal && !requestSuccess && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 shadow-lg animate-in slide-in-from-top">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="text-green-600 font-semibold text-sm sm:text-base">{success}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
