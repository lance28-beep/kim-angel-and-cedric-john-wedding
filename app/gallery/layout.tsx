"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    if (navbar) navbar.style.display = "none"
    return () => {
      if (navbar) navbar.style.display = ""
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Simple top bar with only Back link */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#AFC8E6]/80 border-b border-[#D8B0B0]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#F1EDE2] font-semibold px-4 py-2 rounded-full border border-[#D8B0B0]/50 hover:bg-[#D8B0B0]/20 hover:border-[#D8B0B0] transition-all duration-200 font-sans"
          >
            ← Back to main page
          </Link>
          <div className="text-xs text-[#F1EDE2]/70 font-sans">Gallery</div>
        </div>
      </div>
      {children}
    </div>
  )
}






