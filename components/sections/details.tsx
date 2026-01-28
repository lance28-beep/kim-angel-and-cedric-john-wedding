"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import {
  Clock,
  Utensils,
  Car,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showImageModal) {
        setShowImageModal(null)
      }
    }

    if (showImageModal) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [showImageModal])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems((prev) => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.reception.location)}`

  // Palettes (used only for color chips in attire card)
  const principalAndPeerSponsorsPalette = [
    "#FFD4B2",
    "#E5C1A4",
    "#D1B096"

  ]
  const secondarySponsorsPalette = ["#F3D1C8", "#D38988"]
  const guestPalette = ["#86AE81", "#B3CEAF", "#E2EFE0", "#878787", "#B8B8B8"]

  const openInMaps = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <Section
      id="details"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#3D5033]"
    >
      {/* Background elements with burgundy motif (same as narrative section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#3D5033]/85 via-[#525E2C]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#3D5033]/90 via-[#525E2C]/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(144,158,141,0.22),transparent_55%)] opacity-80" />
      </div>

      {/* Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
        >
          Ceremony & Reception Details
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.9)" }}
        >
          Event Details
        </h2>

        <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-white/95 max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to join us as we say&nbsp;
          <span className="font-semibold text-white">“I do.”</span>
        </p>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-white/60 to-transparent" />
        </div>
      </div>

      {/* Ceremony & Reception Location (combined) */}
      <div className="relative z-10 mb-4 sm:mb-8 max-w-4xl mx-auto px-3 sm:px-5">
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#F0F0EE]/25 bg-gradient-to-b from-[#3D5033] via-[#525E2C] to-[#E0CFB5] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 group hover:scale-[1.01]">
          {/* Top image */}
          <div className="relative h-52 sm:h-72 md:h-96 w-full">
            <Image
              src="/Details/Patio Luisa.jpg"
              alt={siteConfig.ceremony.location}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D5033]/95 via-[#525E2C]/65 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end px-3 sm:px-6 pb-3 sm:pb-6 text-white">
              <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase opacity-85">
                Ceremony &amp; Reception
              </p>
              <h3 className="text-xl sm:text-3xl font-serif font-semibold tracking-wide drop-shadow-lg">
                {siteConfig.ceremony.venue}
              </h3>
            </div>
          </div>

          {/* Details panel */}
          <div className="bg-[#F0F0EE]/95 text-[#2E3A24] px-3 sm:px-6 py-4 sm:py-6 space-y-4 backdrop-blur-sm">
            <div className="space-y-2.5">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-[#243127]/90 leading-relaxed">
                  {siteConfig.ceremony.location}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 text-left">
                <div className="rounded-md border border-[#E0CFB5] bg-white/80 px-2.5 py-2 shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#525E2C] uppercase mb-0.5">
                    Date
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#3D5033]">
                    {siteConfig.ceremony.date}
                  </p>
                </div>
                <div className="rounded-md border border-[#E0CFB5] bg-white/80 px-2.5 py-2 shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#525E2C] uppercase mb-0.5">
                    Ceremony
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#3D5033]">
                    {siteConfig.ceremony.time}
                  </p>
                </div>
                <div className="rounded-md border border-[#E0CFB5] bg-white/80 px-2.5 py-2 shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#525E2C] uppercase mb-0.5">
                    Reception
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#3D5033]">
                    {siteConfig.reception.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#525E2C] text-white py-2.5 sm:py-3 shadow-lg hover:translate-y-[-2px] transition-all text-xs sm:text-sm font-semibold"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.ceremony.location, "ceremony")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#525E2C]/35 text-[#3D5033] py-2.5 sm:py-3 hover:bg-[#525E2C]/5 transition-all text-xs sm:text-sm font-semibold"
              >
                {copiedItems.has("ceremony") ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Address
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information - Compact for mobile */}
      <div className="relative z-10 mb-4 sm:mb-7 max-w-4xl mx-auto px-3 sm:px-5">
        <div className="text-center mb-3 sm:mb-5">
          <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            Important Information
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]">
            Kindly take note of these details to help the day flow smoothly and beautifully.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Attire Guidelines */}
          <div className="relative rounded-2xl border border-white/40 bg-white/85 backdrop-blur-lg shadow-[0_18px_40px_rgba(61,80,51,0.18)] p-3.5 sm:p-5 overflow-hidden">
            <div className="mb-2.5 sm:mb-3 relative z-10 text-center">
              <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#3D5033]">
                Attire &amp; Motif
              </h4>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-white/60 shadow-xl bg-white p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="text-center space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-[#3D5033]">
                  Formal attire inspired by our wedding palette is lovingly encouraged.
                </p>
                <p className="text-xs sm:text-sm text-[#2E3A24]/90">
                  Please dress within our wedding colors to help create a coordinated, elegant celebration.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-t border-[#F5E5D9] pt-4">
                  <h5 className="font-semibold text-xs sm:text-sm text-[#3D5033] mb-2">Principal &amp; Peer Sponsors</h5>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-[#2E3A24]">
                      Barong for Ninongs, Filipiniana or formal attire in cream or beige accents for Ninangs.
                    </p>
                    <div className="pt-1">
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#3D5033] mb-1">
                        Palette
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {principalAndPeerSponsorsPalette.map((color) => (
                          <span
                            key={color}
                            className="w-7 h-7 rounded-full border border-white/70 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#F5E5D9] pt-4">
                  <h5 className="font-semibold text-xs sm:text-sm text-[#3D5033] mb-2">Wedding Guests</h5>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-[#2E3A24]">
                      Semi-formal or formal attire in sage greens, soft neutrals, and light gold accents is warmly encouraged.
                    </p>
                    <div className="pt-1">
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#3D5033] mb-1">
                        Palette
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {guestPalette.map((color) => (
                          <span
                            key={color}
                            className="w-7 h-7 rounded-full border border-white/70 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#F5E5D9] pt-4">
                  <h5 className="font-semibold text-xs sm:text-sm text-[#3D5033] mb-2">Secondary Sponsors</h5>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-[#2E3A24]">
                      Coordinated gowns and attire using the warm, romantic tones from the palette below.
                    </p>
                    <div className="pt-1">
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#3D5033] mb-1">
                        Palette
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {secondarySponsorsPalette.map((color) => (
                          <span
                            key={color}
                            className="w-7 h-7 rounded-full border border-white/70 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] sm:text-sm text-center mt-2.5 sm:mt-3 text-[#3D5033] font-semibold">
              Note: We kindly request our guests to avoid wearing black attire as we celebrate this joyful occasion. For our chosen theme, we’d also love for everyone to wear long gowns, as mid-length dresses are not preferred.
            </p>
          </div>

          {/* Arrival Time & Reception Guidelines */}
          <div className="relative rounded-2xl border border-white/40 bg-white/85 backdrop-blur-lg shadow-[0_18px_40px_rgba(61,80,51,0.18)] p-3.5 sm:p-5 overflow-hidden">
            <div className="space-y-4 sm:space-y-5">
              {/* Arrival Time */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/60 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#3D5033] mb-3">
                    Arrival Time
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-[#2E3A24] leading-relaxed">
                      Kindly arrive by <span className="font-semibold text-[#3D5033]">3:45 PM</span> so we can begin the wedding ceremony promptly at exactly <span className="font-semibold text-[#3D5033]">4:15 PM</span>.
                    </p>
                    <p className="text-xs sm:text-sm text-[#2E3A24] leading-relaxed">
                      Your punctuality means so much to us — and don&apos;t forget to have a light snack beforehand so you can enjoy the celebration comfortably!
                    </p>
                  </div>
                </div>
              </div>

              {/* Reception Guidelines */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/60 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#3D5033] mb-3">
                    Reception Guidelines
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-[#2E3A24] leading-relaxed">
                      The seating will be formal, RSVP-style. That's why we're asking you to fill out this invitation form to secure your spot. Kindly do not bring plus ones unless explicitly stated in your invitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Parking - Compact, sage motif */}
          <div className="relative rounded-2xl border border-[#E0CFB5]/70 bg-[#F0F0EE]/90 backdrop-blur-lg shadow-[0_18px_40px_rgba(61,80,51,0.18)] p-3.5 sm:p-5 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md bg-white/95 border border-[#D1AB6D]/60">
                <Car className="w-3.5 h-3.5 text-[#525E2C]" />
              </div>
              <h4 className="font-semibold text-xs sm:text-base text-[#243127]">Parking &amp; Travel</h4>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Parking */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#E0CFB5]/80 bg-gradient-to-br from-white/95 via-[#F0F0EE]/95 to-white/90 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#525E2C]/90 text-[#F0F0EE]">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-[#243127]">Parking Available</p>
                    <p className="text-[10px] sm:text-xs text-[#37413A]/85">
                      Parking is available at the venue. Please arrive early to find a comfortable spot.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#E0CFB5]/80 bg-gradient-to-br from-white/95 via-[#F0F0EE]/95 to-white/90 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#909E8D]/90 text-[#F0F0EE]">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-[#243127]">Transportation</p>
                    <p className="text-[10px] sm:text-xs text-[#37413A]/85">
                      Private vehicles and local transport are welcome. Coordinate with friends or family and plan your
                      route ahead of time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#D1AB6D]/75 bg-gradient-to-br from-white/95 via-[#F0F0EE]/95 to-white/90">
                <p className="text-[11px] sm:text-sm font-semibold mb-2 flex items-center gap-2 text-[#243127]">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#525E2C]/10 text-[#525E2C]">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Quick Tips
                </p>
                <ul className="text-[10px] sm:text-xs space-y-1 text-[#37413A]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#525E2C] mt-0.5">•</span>
                    <span>Plan your route ahead to avoid unexpected delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#525E2C] mt-0.5">•</span>
                    <span>Please avoid walking during the ceremony. Approach the coordinator or wait to be guided.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#525E2C] mt-0.5">•</span>
                    <span>Coordinate carpooling with friends or family when possible.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(248, 241, 236, 0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#660033", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#B76E79", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "#6600331f", backgroundColor: "#FFF8F2" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, #660033, #B76E79, #F5E5D9)" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-white backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "#FFF8F2", borderColor: "#66003333", color: "#1a1a1a" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-red-500 transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "#FFF8F2", borderColor: "#66003333" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="#B76E79" style={{ color: "#660033" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#1a1a1a" }}>
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4" style={{ color: "#B76E79" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#1a1a1a" }}>
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "#FFF8F2" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src="/Details/Patio Luisa.jpg"
                alt={showImageModal === "ceremony" ? siteConfig.ceremony.location : siteConfig.reception.location}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t-2 relative"
              style={{ borderColor: "#6600331f", backgroundColor: "#FFF8F2" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#660033]/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3"
                      style={{ color: "#1a1a1a" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6" fill="#B76E79" style={{ color: "#660033" }} />
                      ) : (
                        <Utensils className="w-6 h-6" style={{ color: "#B76E79" }} />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70" style={{ color: "#1a1a1a" }}>
                      <MapPin className="w-4 h-4" style={{ color: "#660033" }} />
                      <span>
                        {showImageModal === "ceremony"
                          ? siteConfig.ceremony.location
                          : siteConfig.reception.location}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#2E3A24",
                          backgroundColor: "#E2EFE0",
                          opacity: 0.95,
                          borderColor: "#3D503333",
                        }}
                      >
                        <Clock className="w-4 h-4" style={{ color: "#3D5033" }} />
                        <span>
                          {siteConfig.ceremony.date} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#1a1a1a",
                          backgroundColor: "#FDECEF",
                          opacity: 0.9,
                          borderColor: "#B76E7933",
                        }}
                      >
                        <Clock className="w-4 h-4" style={{ color: "#B76E79" }} />
                        <span>
                          {siteConfig.reception.date} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? siteConfig.ceremony.location
                            : siteConfig.reception.location,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#F5E5D9]/25 whitespace-nowrap"
                      title="Copy address"
                      style={{ borderColor: "#66003333", color: "#1a1a1a" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap text-white"
                      style={{
                        background:
                          showImageModal === "ceremony"
                            ? "linear-gradient(to right, #660033, #B76E79)"
                            : "linear-gradient(to right, #B76E79, #F5E5D9)",
                      }}
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 text-xs opacity-65" style={{ color: "#1a1a1a" }}>
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}


