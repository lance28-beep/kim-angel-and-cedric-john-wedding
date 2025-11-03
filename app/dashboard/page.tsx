"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Lock,
  Users,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  Search,
  RefreshCw,
  Plus,
  AlertCircle,
  Bell,
  UserCheck,
  Crown,
  UserPlus,
} from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Message: string
}

interface GuestRequest {
  Name: string
  Email: string
  Phone: string
  RSVP: string
  Message: string
}

interface Entourage {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"guests" | "requests" | "entourage" | "principalsponsor">("guests")
  
  // Guest Request state
  const [guestRequests, setGuestRequests] = useState<GuestRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<GuestRequest[]>([])
  const [searchRequestQuery, setSearchRequestQuery] = useState("")
  const [editingRequest, setEditingRequest] = useState<GuestRequest | null>(null)

  // Entourage state
  const [entourage, setEntourage] = useState<Entourage[]>([])
  const [filteredEntourage, setFilteredEntourage] = useState<Entourage[]>([])
  const [searchEntourageQuery, setSearchEntourageQuery] = useState("")
  const [editingEntourage, setEditingEntourage] = useState<Entourage | null>(null)
  const [showEntourageForm, setShowEntourageForm] = useState(false)

  // Shared confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmTitle, setConfirmTitle] = useState<string>("")
  const [confirmMessage, setConfirmMessage] = useState<string>("")
  const confirmActionRef = useRef<null | (() => Promise<void> | void)>(null)

  // PrincipalSponsor state
  const [principalSponsors, setPrincipalSponsors] = useState<PrincipalSponsor[]>([])
  const [filteredPrincipalSponsors, setFilteredPrincipalSponsors] = useState<PrincipalSponsor[]>([])
  const [searchPrincipalSponsorQuery, setSearchPrincipalSponsorQuery] = useState("")
  const [editingPrincipalSponsor, setEditingPrincipalSponsor] = useState<PrincipalSponsor | null>(null)
  const [showPrincipalSponsorForm, setShowPrincipalSponsorForm] = useState(false)

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
    RSVP: "",
    Message: "",
  })

  // Entourage form state
  const [entourageFormData, setEntourageFormData] = useState({
    Name: "",
    RoleCategory: "",
    RoleTitle: "",
    Email: "",
  })

  // PrincipalSponsor form state
  const [principalSponsorFormData, setPrincipalSponsorFormData] = useState({
    MalePrincipalSponsor: "",
    FemalePrincipalSponsor: "",
  })

  // Password - you can change this!
  const DASHBOARD_PASSWORD = "wedding2026" // Change this to your preferred password

  // Check if already authenticated
  useEffect(() => {
    const authStatus = sessionStorage.getItem("dashboardAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      fetchGuests()
      fetchGuestRequests()
      fetchEntourage()
      fetchPrincipalSponsors()
    }
  }, [])

  // Filter guests based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests(guests)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query) ||
      (guest.Email && guest.Email.toLowerCase().includes(query))
    )

    setFilteredGuests(filtered)
  }, [searchQuery, guests])

  // Filter guest requests based on search
  useEffect(() => {
    if (!searchRequestQuery.trim()) {
      setFilteredRequests(guestRequests)
      return
    }

    const query = searchRequestQuery.toLowerCase()
    const filtered = guestRequests.filter((request) =>
      request.Name.toLowerCase().includes(query) ||
      (request.Email && request.Email.toLowerCase().includes(query))
    )

    setFilteredRequests(filtered)
  }, [searchRequestQuery, guestRequests])

  // Filter entourage based on search
  useEffect(() => {
    if (!searchEntourageQuery.trim()) {
      setFilteredEntourage(entourage)
      return
    }

    const query = searchEntourageQuery.toLowerCase()
    const filtered = entourage.filter((member) =>
      member.Name.toLowerCase().includes(query) ||
      member.RoleTitle.toLowerCase().includes(query) ||
      member.RoleCategory.toLowerCase().includes(query) ||
      (member.Email && member.Email.toLowerCase().includes(query))
    )

    setFilteredEntourage(filtered)
  }, [searchEntourageQuery, entourage])

  // Filter principal sponsors based on search
  useEffect(() => {
    if (!searchPrincipalSponsorQuery.trim()) {
      setFilteredPrincipalSponsors(principalSponsors)
      return
    }

    const query = searchPrincipalSponsorQuery.toLowerCase()
    const filtered = principalSponsors.filter((sponsor) =>
      sponsor.MalePrincipalSponsor.toLowerCase().includes(query) ||
      sponsor.FemalePrincipalSponsor.toLowerCase().includes(query)
    )

    setFilteredPrincipalSponsors(filtered)
  }, [searchPrincipalSponsorQuery, principalSponsors])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      setGuests(data)
      setFilteredGuests(data)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGuestRequests = async () => {
    try {
      const response = await fetch("/api/guest-requests")
      if (!response.ok) {
        throw new Error("Failed to fetch guest requests")
      }
      const data = await response.json()
      setGuestRequests(data)
      setFilteredRequests(data)
    } catch (error) {
      console.error("Error fetching guest requests:", error)
    }
  }

  const fetchEntourage = async () => {
    try {
      const response = await fetch("/api/entourage")
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data = await response.json()
      setEntourage(data)
      setFilteredEntourage(data)
    } catch (error) {
      console.error("Error fetching entourage:", error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true)
      setError(null)
      sessionStorage.setItem("dashboardAuth", "true")
      fetchGuests()
      fetchGuestRequests()
      fetchEntourage()
      fetchPrincipalSponsors()
    } else {
      setError("Incorrect password. Please try again.")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("dashboardAuth")
    setPassword("")
    setGuests([])
    setFilteredGuests([])
  }

  const handleAddGuest = async () => {
    if (!formData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to add guest")
      }

      setSuccessMessage("Guest added successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      setFormData({ Name: "", Email: "", RSVP: "", Message: "" })
      setShowAddForm(false)
      await fetchGuests()
    } catch (error) {
      console.error("Error adding guest:", error)
      setError("Failed to add guest")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateGuest = async () => {
    if (!editingGuest || !formData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

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
        throw new Error("Failed to update guest")
      }

      setSuccessMessage("Guest updated successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      setEditingGuest(null)
      setFormData({ Name: "", Email: "", RSVP: "", Message: "" })
      await fetchGuests()
    } catch (error) {
      console.error("Error updating guest:", error)
      setError("Failed to update guest")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteGuest = async (guestName: string) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/guests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: guestName }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete guest")
      }

      setSuccessMessage("Guest deleted successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchGuests()
    } catch (error) {
      console.error("Error deleting guest:", error)
      setError("Failed to delete guest")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClick = (guest: Guest) => {
    setEditingGuest(guest)
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Message: guest.Message || "",
    })
    setShowAddForm(false)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingGuest(null)
    setFormData({ Name: "", Email: "", RSVP: "", Message: "" })
  }

  const handleAddRequestToGuestList = async (request: GuestRequest) => {
    if (!confirm(`Add ${request.Name} to the guest list?`)) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Add to guest list
      const addResponse = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: request.Name,
          Email: request.Email,
          RSVP: "",
          Message: request.Message,
        }),
      })

      if (!addResponse.ok) {
        throw new Error("Failed to add to guest list")
      }

      // Delete from requests
      const deleteResponse = await fetch("/api/guest-requests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: request.Name }),
      })

      if (!deleteResponse.ok) {
        throw new Error("Failed to remove from requests")
      }

      setSuccessMessage(`${request.Name} added to guest list!`)
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchGuests()
      await fetchGuestRequests()
    } catch (error) {
      console.error("Error adding request to guest list:", error)
      setError("Failed to add request to guest list")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRequest = async (requestName: string) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: requestName }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete request")
      }

      setSuccessMessage("Request deleted successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchGuestRequests()
    } catch (error) {
      console.error("Error deleting request:", error)
      setError("Failed to delete request")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditRequestClick = (request: GuestRequest) => {
    setEditingRequest(request)
    setRequestFormData({
      Name: request.Name,
      Email: request.Email && request.Email !== "Pending" ? request.Email : "",
      Phone: request.Phone || "",
      RSVP: request.RSVP || "",
      Message: request.Message || "",
    })
  }

  const handleUpdateRequest = async () => {
    if (!editingRequest || !requestFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          Name: requestFormData.Name,
          Email: requestFormData.Email || "Pending",
          Phone: requestFormData.Phone,
          RSVP: requestFormData.RSVP,
          Message: requestFormData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update request")
      }

      setSuccessMessage("Request updated successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      setEditingRequest(null)
      setRequestFormData({ Name: "", Email: "", Phone: "", RSVP: "", Message: "" })
      await fetchGuestRequests()
    } catch (error) {
      console.error("Error updating request:", error)
      setError("Failed to update request")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelRequest = () => {
    setEditingRequest(null)
    setRequestFormData({ Name: "", Email: "", Phone: "", RSVP: "", Message: "" })
  }

  // Entourage CRUD handlers
  const handleAddEntourage = async () => {
    if (!entourageFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/entourage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: entourageFormData.Name,
          RoleCategory: entourageFormData.RoleCategory,
          RoleTitle: entourageFormData.RoleTitle,
          Email: entourageFormData.Email,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add entourage member")
      }

      setSuccessMessage("Entourage member added successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      setShowEntourageForm(false)
      setEntourageFormData({ Name: "", RoleCategory: "", RoleTitle: "", Email: "" })
      await fetchEntourage()
      window.dispatchEvent(new Event("entourageUpdated"))
    } catch (error) {
      console.error("Error adding entourage member:", error)
      setError("Failed to add entourage member")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateEntourage = async () => {
    if (!editingEntourage || !entourageFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/entourage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: editingEntourage.Name, // Original name for lookup
          Name: entourageFormData.Name,
          RoleCategory: entourageFormData.RoleCategory,
          RoleTitle: entourageFormData.RoleTitle,
          Email: entourageFormData.Email,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update entourage member")
      }

      setSuccessMessage("Entourage member updated successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      setShowEntourageForm(false)
      setEditingEntourage(null)
      setEntourageFormData({ Name: "", RoleCategory: "", RoleTitle: "", Email: "" })
      await fetchEntourage()
      window.dispatchEvent(new Event("entourageUpdated"))
    } catch (error) {
      console.error("Error updating entourage member:", error)
      setError("Failed to update entourage member")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEntourage = async (memberName: string) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/entourage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: memberName }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete entourage member")
      }

      setSuccessMessage("Entourage member deleted successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchEntourage()
      window.dispatchEvent(new Event("entourageUpdated"))
    } catch (error) {
      console.error("Error deleting entourage member:", error)
      setError("Failed to delete entourage member")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditEntourageClick = (member: Entourage) => {
    setEditingEntourage(member)
    setEntourageFormData({
      Name: member.Name,
      RoleCategory: member.RoleCategory || "",
      RoleTitle: member.RoleTitle || "",
      Email: member.Email && member.Email !== "Pending" ? member.Email : "",
    })
  }

  const handleCancelEntourage = () => {
    setShowEntourageForm(false)
    setEditingEntourage(null)
    setEntourageFormData({ Name: "", RoleCategory: "", RoleTitle: "", Email: "" })
  }

  // PrincipalSponsor functions
  const fetchPrincipalSponsors = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/principal-sponsor")
      if (!response.ok) {
        throw new Error("Failed to fetch principal sponsors")
      }
      const data = await response.json()
      setPrincipalSponsors(data)
    } catch (error) {
      console.error("Error fetching principal sponsors:", error)
      setError("Failed to fetch principal sponsors")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPrincipalSponsor = async () => {
    if (!principalSponsorFormData.MalePrincipalSponsor) {
      setError("Male Principal Sponsor is required")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/principal-sponsor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(principalSponsorFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to add principal sponsor")
      }

      setSuccessMessage("Principal sponsor added successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      setShowPrincipalSponsorForm(false)
      setPrincipalSponsorFormData({ MalePrincipalSponsor: "", FemalePrincipalSponsor: "" })
      await fetchPrincipalSponsors()
    } catch (error) {
      console.error("Error adding principal sponsor:", error)
      setError("Failed to add principal sponsor")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePrincipalSponsor = async () => {
    if (!editingPrincipalSponsor || !principalSponsorFormData.MalePrincipalSponsor) {
      setError("Male Principal Sponsor is required")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/principal-sponsor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalName: editingPrincipalSponsor.MalePrincipalSponsor,
          MalePrincipalSponsor: principalSponsorFormData.MalePrincipalSponsor,
          FemalePrincipalSponsor: principalSponsorFormData.FemalePrincipalSponsor,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update principal sponsor")
      }

      setSuccessMessage("Principal sponsor updated successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      setShowPrincipalSponsorForm(false)
      setEditingPrincipalSponsor(null)
      setPrincipalSponsorFormData({ MalePrincipalSponsor: "", FemalePrincipalSponsor: "" })
      await fetchPrincipalSponsors()
    } catch (error) {
      console.error("Error updating principal sponsor:", error)
      setError("Failed to update principal sponsor")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePrincipalSponsor = async (maleName: string) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/principal-sponsor", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ MalePrincipalSponsor: maleName }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete principal sponsor")
      }

      setSuccessMessage("Principal sponsor deleted successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchPrincipalSponsors()
    } catch (error) {
      console.error("Error deleting principal sponsor:", error)
      setError("Failed to delete principal sponsor")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPrincipalSponsorClick = (sponsor: PrincipalSponsor) => {
    setEditingPrincipalSponsor(sponsor)
    setPrincipalSponsorFormData({
      MalePrincipalSponsor: sponsor.MalePrincipalSponsor,
      FemalePrincipalSponsor: sponsor.FemalePrincipalSponsor || "",
    })
  }

  const handleCancelPrincipalSponsor = () => {
    setShowPrincipalSponsorForm(false)
    setEditingPrincipalSponsor(null)
    setPrincipalSponsorFormData({ MalePrincipalSponsor: "", FemalePrincipalSponsor: "" })
  }

  const getRSVPStats = () => {
    const attending = guests.filter((g) => g.RSVP === "Yes").length
    const notAttending = guests.filter((g) => g.RSVP === "No").length
    const pending = guests.filter((g) => !g.RSVP || g.RSVP.trim() === "").length
    return { attending, notAttending, pending, total: guests.length }
  }

  const stats = getRSVPStats()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#402921] via-[#583016] to-[#402921] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-[#BB8A3D]/30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#BB8A3D] to-[#CDAC77] rounded-full mb-4">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-[#402921] mb-2">
                Wedding Dashboard
              </h1>
              <p className="text-[#402921]/70 font-sans">
                Enter password to access
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter dashboard password"
                  className="w-full px-4 py-3 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-semibold text-sm">{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white py-3 rounded-xl font-semibold"
              >
                Access Dashboard
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E7] to-[#FFF6E7]/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#BB8A3D] via-[#CDAC77] to-[#BB8A3D] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">Wedding Dashboard</h1>
              <p className="text-white/90 text-sm">Manage your guest list and RSVPs</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => {
                  fetchGuests()
                  fetchGuestRequests()
                  fetchEntourage()
                  fetchPrincipalSponsors()
                }}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Lock className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-[#BB8A3D]/20">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#BB8A3D]" />
              <span className="text-2xl sm:text-3xl font-bold text-[#402921]">{stats.total}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#402921]/70 font-sans">Total Guests</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 shadow-md border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              <span className="text-2xl sm:text-3xl font-bold text-green-600">{stats.attending}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#402921]/70 font-sans">Attending</p>
          </div>

          <div className="bg-red-50 rounded-2xl p-6 shadow-md border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              <span className="text-2xl sm:text-3xl font-bold text-red-600">{stats.notAttending}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#402921]/70 font-sans">Not Attending</p>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-6 shadow-md border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              <span className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.pending}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#402921]/70 font-sans">Pending</p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6 shadow-md border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              <span className="text-2xl sm:text-3xl font-bold text-orange-600">{guestRequests.length}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#402921]/70 font-sans">Requests</p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 shadow-md border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              <span className="text-2xl sm:text-3xl font-bold text-purple-600">{entourage.length}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#402921]/70 font-sans">Entourage</p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 shadow-md border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">{principalSponsors.length}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#402921]/70 font-sans">Principal Sponsors</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl p-1 sm:p-2 shadow-md border border-[#BB8A3D]/20 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab("guests")}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeTab === "guests"
                  ? "bg-gradient-to-r from-[#BB8A3D] to-[#CDAC77] text-white shadow-lg"
                  : "text-[#402921] hover:bg-[#FFF6E7]"
              }`}
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              Guest List
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 relative ${
                activeTab === "requests"
                  ? "bg-gradient-to-r from-[#BB8A3D] to-[#CDAC77] text-white shadow-lg"
                  : "text-[#402921] hover:bg-[#FFF6E7]"
              }`}
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              Guest Requests
              {guestRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full min-w-[18px] h-4 sm:min-w-[20px] sm:h-5 px-1 flex items-center justify-center">
                  {guestRequests.length > 99 ? '99+' : guestRequests.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("entourage")}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeTab === "entourage"
                  ? "bg-gradient-to-r from-[#BB8A3D] to-[#CDAC77] text-white shadow-lg"
                  : "text-[#402921] hover:bg-[#FFF6E7]"
              }`}
            >
              <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
              Entourage
            </button>
            <button
              onClick={() => setActiveTab("principalsponsor")}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeTab === "principalsponsor"
                  ? "bg-gradient-to-r from-[#BB8A3D] to-[#CDAC77] text-white shadow-lg"
                  : "text-[#402921] hover:bg-[#FFF6E7]"
              }`}
            >
              <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
              Principal Sponsors
            </button>
          </div>
        </div>

        {/* Guest List Tab Content */}
        {activeTab === "guests" && (
          <>
        {/* Search and Add Guest */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#BB8A3D]/20 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#402921]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guests by name or email..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                />
              </div>
            </div>
            <Button
              onClick={() => {
                setShowAddForm(true)
                setEditingGuest(null)
                setFormData({ Name: "", Email: "", RSVP: "", Message: "" })
              }}
              className="bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Guest
            </Button>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-semibold text-sm">{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-600 font-semibold text-sm">{error}</span>
            </div>
          )}

          {/* Add/Edit Form */}
          {(showAddForm || editingGuest) && (
            <div className="bg-[#FFF6E7]/50 rounded-xl p-6 border-2 border-[#BB8A3D]/30 mb-4">
              <h3 className="text-xl font-bold text-[#402921] mb-4 font-sans">
                {editingGuest ? "Edit Guest" : "Add New Guest"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.Name}
                    onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.Email}
                    onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                    RSVP Status *
                  </label>
                  <select
                    value={formData.RSVP}
                    onChange={(e) => setFormData({ ...formData, RSVP: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans bg-white transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="Yes">Attending</option>
                    <option value="No">Not Attending</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                    Message
                  </label>
                  <input
                    type="text"
                    value={formData.Message}
                    onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={editingGuest ? handleUpdateGuest : handleAddGuest}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white"
                >
                  {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Save"}
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Guest List */}
        <div className="bg-white rounded-2xl shadow-md border border-[#BB8A3D]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#BB8A3D]/10 to-[#CDAC77]/10">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Email</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-[#402921] font-sans">RSVP</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Message</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-[#402921] font-sans">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#402921]/10">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#402921]/60 font-sans">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          <span>Loading guests...</span>
                        </div>
                      ) : (
                        "No guests found"
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest, index) => (
                    <tr key={index} className="hover:bg-[#FFF6E7]/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#402921] font-sans">{guest.Name}</td>
                      <td className="px-6 py-4 text-[#402921]/70 font-sans">
                        {guest.Email && guest.Email !== "Pending" ? guest.Email : "-"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {guest.RSVP === "Yes" && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            <CheckCircle className="h-4 w-4" />
                            Attending
                          </span>
                        )}
                        {guest.RSVP === "No" && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                            <XCircle className="h-4 w-4" />
                            Not Attending
                          </span>
                        )}
                        {guest.RSVP === "Maybe" && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                            <AlertCircle className="h-4 w-4" />
                            Maybe
                          </span>
                        )}
                        {!guest.RSVP || guest.RSVP.trim() === "" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                            Pending
                          </span>
                        ) : null}
                      </td>
                      <td className="px-6 py-4 text-[#402921]/70 font-sans max-w-xs truncate">
                        {guest.Message || "-"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(guest)}
                            className="p-2 text-[#BB8A3D] hover:bg-[#BB8A3D]/10 rounded-lg transition-colors"
                            title="Edit guest"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setConfirmTitle("Delete Guest")
                              setConfirmMessage(`Are you sure you want to delete ${guest.Name}?`)
                              confirmActionRef.current = () => handleDeleteGuest(guest.Name)
                              setConfirmOpen(true)
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete guest"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}

        {/* Guest Requests Tab Content */}
        {activeTab === "requests" && (
          <>
            {/* Search Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#BB8A3D]/20 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#402921]/40" />
                    <input
                      type="text"
                      value={searchRequestQuery}
                      onChange={(e) => setSearchRequestQuery(e.target.value)}
                      placeholder="Search requests by name or email..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                    />
                  </div>
                </div>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-semibold text-sm">{successMessage}</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-semibold text-sm">{error}</span>
                </div>
              )}

              {/* Edit Form */}
              {editingRequest && (
                <div className="bg-[#FFF6E7]/50 rounded-xl p-6 border-2 border-[#BB8A3D]/30 mb-4">
                  <h3 className="text-xl font-bold text-[#402921] mb-4 font-sans">
                    Edit Request
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={requestFormData.Name}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={requestFormData.Email}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={requestFormData.Phone}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Message
                      </label>
                      <input
                        type="text"
                        value={requestFormData.Message}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={handleUpdateRequest}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white"
                    >
                      {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Save"}
                    </Button>
                    <Button onClick={handleCancelRequest} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-2xl shadow-md border border-[#BB8A3D]/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#BB8A3D]/10 to-[#CDAC77]/10">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Name</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Phone</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Message</th>
                      <th className="text-center px-6 py-4 text-sm font-bold text-[#402921] font-sans">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#402921]/10">
                    {filteredRequests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[#402921]/60 font-sans">
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw className="h-5 w-5 animate-spin" />
                              <span>Loading requests...</span>
                            </div>
                          ) : (
                            "No guest requests found"
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.map((request, index) => (
                        <tr key={index} className="hover:bg-[#FFF6E7]/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-[#402921] font-sans">{request.Name}</td>
                          <td className="px-6 py-4 text-[#402921]/70 font-sans">
                            {request.Email && request.Email !== "Pending" ? request.Email : "-"}
                          </td>
                          <td className="px-6 py-4 text-[#402921]/70 font-sans">
                            {request.Phone || "-"}
                          </td>
                          <td className="px-6 py-4 text-[#402921]/70 font-sans max-w-xs truncate">
                            {request.Message || "-"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleAddRequestToGuestList(request)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Add to guest list"
                              >
                                <UserCheck className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEditRequestClick(request)}
                                className="p-2 text-[#BB8A3D] hover:bg-[#BB8A3D]/10 rounded-lg transition-colors"
                                title="Edit request"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setConfirmTitle("Delete Request")
                                  setConfirmMessage(`Are you sure you want to delete the request from ${request.Name}?`)
                                  confirmActionRef.current = () => handleDeleteRequest(request.Name)
                                  setConfirmOpen(true)
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete request"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Entourage Tab Content */}
        {activeTab === "entourage" && (
          <>
            {/* Search Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#BB8A3D]/20 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#402921]/40" />
                    <input
                      type="text"
                      value={searchEntourageQuery}
                      onChange={(e) => setSearchEntourageQuery(e.target.value)}
                      placeholder="Search entourage by name, role, or email..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setShowEntourageForm(true)
                    setEditingEntourage(null)
                    setEntourageFormData({ Name: "", RoleCategory: "", RoleTitle: "", Email: "" })
                  }}
                  className="bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-semibold text-sm">{successMessage}</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-semibold text-sm">{error}</span>
                </div>
              )}

              {/* Add/Edit Form */}
              {(showEntourageForm || editingEntourage) && (
                <div className="bg-[#FFF6E7]/50 rounded-xl p-6 border-2 border-[#BB8A3D]/30 mb-4">
                  <h3 className="text-xl font-bold text-[#402921] mb-4 font-sans">
                    {editingEntourage ? "Edit Entourage Member" : "Add New Entourage Member"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={entourageFormData.Name}
                        onChange={(e) => setEntourageFormData({ ...entourageFormData, Name: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Role Category
                      </label>
                      <input
                        type="text"
                        value={entourageFormData.RoleCategory}
                        onChange={(e) => setEntourageFormData({ ...entourageFormData, RoleCategory: e.target.value })}
                        placeholder="e.g., Wedding Party, Family"
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Role Title
                      </label>
                      <input
                        type="text"
                        value={entourageFormData.RoleTitle}
                        onChange={(e) => setEntourageFormData({ ...entourageFormData, RoleTitle: e.target.value })}
                        placeholder="e.g., Best Man, Maid of Honor"
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Email
                      </label>
                      <input
                        type="email"
                        value={entourageFormData.Email}
                        onChange={(e) => setEntourageFormData({ ...entourageFormData, Email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={editingEntourage ? handleUpdateEntourage : handleAddEntourage}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white"
                    >
                      {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : (editingEntourage ? "Update" : "Add")}
                    </Button>
                    <Button onClick={handleCancelEntourage} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Entourage List */}
            <div className="bg-white rounded-2xl shadow-md border border-[#BB8A3D]/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#BB8A3D]/10 to-[#CDAC77]/10">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Name</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Role Category</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Role Title</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Email</th>
                      <th className="text-center px-6 py-4 text-sm font-bold text-[#402921] font-sans">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#402921]/10">
                    {filteredEntourage.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[#402921]/60 font-sans">
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw className="h-5 w-5 animate-spin" />
                              <span>Loading entourage...</span>
                            </div>
                          ) : (
                            "No entourage members found"
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredEntourage.map((member, index) => (
                        <tr key={index} className="hover:bg-[#FFF6E7]/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-[#402921] font-sans">{member.Name}</td>
                          <td className="px-6 py-4 text-[#402921]/70 font-sans">
                            {member.RoleCategory || "-"}
                          </td>
                          <td className="px-6 py-4 text-[#402921]/70 font-sans">
                            {member.RoleTitle || "-"}
                          </td>
                          <td className="px-6 py-4 text-[#402921]/70 font-sans">
                            {member.Email && member.Email !== "Pending" ? member.Email : "-"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditEntourageClick(member)}
                                className="p-2 text-[#BB8A3D] hover:bg-[#BB8A3D]/10 rounded-lg transition-colors"
                                title="Edit member"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setConfirmTitle("Delete Member")
                                  setConfirmMessage(`Are you sure you want to delete ${member.Name}?`)
                                  confirmActionRef.current = () => handleDeleteEntourage(member.Name)
                                  setConfirmOpen(true)
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete member"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PrincipalSponsor Tab Content */}
        {activeTab === "principalsponsor" && (
          <>
            {/* Search Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#BB8A3D]/20 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#402921]/40" />
                    <input
                      type="text"
                      value={searchPrincipalSponsorQuery}
                      onChange={(e) => setSearchPrincipalSponsorQuery(e.target.value)}
                      placeholder="Search by name..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setShowPrincipalSponsorForm(true)
                    setEditingPrincipalSponsor(null)
                    setPrincipalSponsorFormData({ MalePrincipalSponsor: "", FemalePrincipalSponsor: "" })
                  }}
                  className="bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sponsors
                </Button>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-semibold text-sm">{successMessage}</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-semibold text-sm">{error}</span>
                </div>
              )}

              {/* Add/Edit Form */}
              {(showPrincipalSponsorForm || editingPrincipalSponsor) && (
                <div className="bg-[#FFF6E7]/50 rounded-xl p-6 border-2 border-[#BB8A3D]/30 mb-4">
                  <h3 className="text-xl font-bold text-[#402921] mb-4 font-sans">
                    {editingPrincipalSponsor ? "Edit Principal Sponsors" : "Add New Principal Sponsors"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Male Principal Sponsor *
                      </label>
                      <input
                        type="text"
                        value={principalSponsorFormData.MalePrincipalSponsor}
                        onChange={(e) => setPrincipalSponsorFormData({ ...principalSponsorFormData, MalePrincipalSponsor: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#402921] mb-2 font-sans">
                        Female Principal Sponsor
                      </label>
                      <input
                        type="text"
                        value={principalSponsorFormData.FemalePrincipalSponsor}
                        onChange={(e) => setPrincipalSponsorFormData({ ...principalSponsorFormData, FemalePrincipalSponsor: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-[#402921]/20 focus:border-[#402921] rounded-xl text-sm font-sans placeholder:text-[#402921]/40 transition-all duration-300 focus:ring-4 focus:ring-[#402921]/10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={editingPrincipalSponsor ? handleUpdatePrincipalSponsor : handleAddPrincipalSponsor}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-[#402921] to-[#583016] hover:from-[#583016] hover:to-[#583016] text-white"
                    >
                      {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : (editingPrincipalSponsor ? "Update" : "Add")}
                    </Button>
                    <Button onClick={handleCancelPrincipalSponsor} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* PrincipalSponsor List */}
            <div className="bg-white rounded-2xl shadow-md border border-[#BB8A3D]/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#BB8A3D]/10 to-[#CDAC77]/10">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Male Principal Sponsor</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#402921] font-sans">Female Principal Sponsor</th>
                      <th className="text-center px-6 py-4 text-sm font-bold text-[#402921] font-sans">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#402921]/10">
                    {filteredPrincipalSponsors.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-[#402921]/60 font-sans">
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw className="h-5 w-5 animate-spin" />
                              <span>Loading sponsors...</span>
                            </div>
                          ) : (
                            "No principal sponsors found"
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredPrincipalSponsors.map((sponsor, index) => (
                        <tr key={index} className="hover:bg-[#FFF6E7]/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-[#402921] font-sans">{sponsor.MalePrincipalSponsor}</td>
                          <td className="px-6 py-4 text-[#402921]/70 font-sans">
                            {sponsor.FemalePrincipalSponsor || "-"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditPrincipalSponsorClick(sponsor)}
                                className="p-2 text-[#BB8A3D] hover:bg-[#BB8A3D]/10 rounded-lg transition-colors"
                                title="Edit sponsors"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setConfirmTitle("Delete Sponsors")
                                  setConfirmMessage(`Are you sure you want to delete ${sponsor.MalePrincipalSponsor}?`)
                                  confirmActionRef.current = () => handleDeletePrincipalSponsor(sponsor.MalePrincipalSponsor)
                                  setConfirmOpen(true)
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete sponsors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Global Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          if (confirmActionRef.current) confirmActionRef.current()
        }}
      />
    </div>
  )
}


// Confirm Modal Component (inline for simplicity)
function ConfirmModal({ open, title, message, onCancel, onConfirm }: { open: boolean; title: string; message: string; onCancel: () => void; onConfirm: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#BB8A3D]/30">
        <div className="px-5 py-4 border-b border-[#BB8A3D]/20">
          <h3 className="text-base sm:text-lg font-bold text-[#402921]">{title}</h3>
        </div>
        <div className="px-5 py-4 text-sm sm:text-base text-[#402921]/80">
          {message}
        </div>
        <div className="px-5 py-4 flex justify-end gap-2 border-t border-[#BB8A3D]/20">
          <button onClick={onCancel} className="px-3 py-2 text-sm rounded-lg border border-[#402921]/20 text-[#402921] hover:bg-[#FFF6E7]">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  )
}