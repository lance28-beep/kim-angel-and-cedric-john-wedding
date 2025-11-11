"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { Heart, Sparkles } from "lucide-react"
import { siteConfig } from "@/content/site"
import StaggeredMenu from "./StaggeredMenu"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'bg-[#AFC8E6] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(175,200,230,0.5)] border-b border-[#F1EDE2]/40' 
        : 'bg-[#AFC8E6]/95 backdrop-blur-lg border-b border-[#F1EDE2]/30'
    }`}>
      {/* Elegant glow effect when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#F1EDE2]/15 via-[#D8B0B0]/10 to-[#F1EDE2]/15 pointer-events-none" />
      )}
      {/* Subtle texture overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D8B0B0]/5 via-transparent to-[#D8B0B0]/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-12 sm:h-20">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 sm:gap-2.5 relative">
                {/* Decorative dots with accent colors */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#F1EDE2] to-[#D8B0B0] group-hover:shadow-[0_0_8px_rgba(216,176,176,0.8)]" />
                </div>
                
                <div className="relative">
                  <Heart
                    size={20}
                    className="sm:size-6 group-hover:fill-[#D8B0B0] group-hover:text-[#F1EDE2] group-active:scale-110 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] text-[#F1EDE2] group-hover:drop-shadow-[0_2px_12px_rgba(216,176,176,0.9)]"
                  />
                  {/* Enhanced sparkle effect */}
                  <Sparkles 
                    size={10} 
                    className="absolute -top-1 -right-1 text-[#D8B0B0] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 drop-shadow-md group-hover:drop-shadow-[0_0_6px_rgba(216,176,176,0.8)]" 
                  />
                </div>
                
                <div className="text-base sm:text-2xl md:text-3xl font-serif font-bold group-hover:text-[#F1EDE2] group-active:text-[#F1EDE2] transition-all duration-500 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] text-[#F1EDE2] group-hover:drop-shadow-[0_2px_15px_rgba(216,176,176,0.7)]">
                  {siteConfig.couple.brideNickname} & {siteConfig.couple.groomNickname}
                </div>
                
                {/* Decorative dots with accent colors */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#F1EDE2] to-[#D8B0B0] group-hover:shadow-[0_0_8px_rgba(216,176,176,0.8)]" />
                </div>
              </div>
              <div className="text-[9px] sm:text-xs font-sans tracking-[0.15em] ml-6 sm:ml-8 group-hover:text-[#F1EDE2] group-hover:tracking-[0.2em] group-active:tracking-[0.2em] transition-all duration-500 font-light text-[#F1EDE2]/90 drop-shadow-md group-hover:drop-shadow-[0_2px_8px_rgba(216,176,176,0.6)]">
                {siteConfig.ceremony.date}
              </div>
            </div>
            
            {/* Enhanced decorative underline with gradient */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D8B0B0] via-[#F1EDE2] to-[#D8B0B0] group-hover:w-full transition-all duration-700 rounded-full group-hover:shadow-[0_0_8px_rgba(216,176,176,0.7)]" />
            
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8B0B0]/0 via-[#F1EDE2]/15 to-[#D8B0B0]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
              className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all duration-500 relative group drop-shadow-md ${
                    isActive 
                      ? 'text-[#F1EDE2] bg-gradient-to-br from-[#D8B0B0]/35 via-[#F1EDE2]/25 to-[#D8B0B0]/35 backdrop-blur-md shadow-[0_4px_15px_rgba(216,176,176,0.5)] border border-[#F1EDE2]/60' 
                      : 'hover:text-[#F1EDE2] hover:bg-gradient-to-br hover:from-[#D8B0B0]/25 hover:via-[#F1EDE2]/15 hover:to-[#D8B0B0]/25 hover:backdrop-blur-md hover:border hover:border-[#F1EDE2]/50 hover:shadow-lg text-[#F1EDE2]/90 hover:scale-105 active:scale-95'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D8B0B0] via-[#F1EDE2] to-[#D8B0B0] transition-all duration-500 rounded-full ${
                    isActive ? 'w-full shadow-[0_0_8px_rgba(216,176,176,0.8)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_6px_rgba(216,176,176,0.6)]'
                  }`} />
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#D8B0B0] animate-pulse shadow-[0_0_6px_rgba(216,176,176,0.9)]" />
                  )}
                  {/* Subtle accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F1EDE2]/0 via-[#D8B0B0]/10 to-[#F1EDE2]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Link>
              )
            })}
          </div>

          <div className="md:hidden absolute right-2 top-0 z-20">
            {/* Decorative halo to improve tap target and visual affordance */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#F1EDE2]/25 via-[#D8B0B0]/20 to-transparent blur-lg pointer-events-none" />
            <div className="absolute inset-0 rounded-full ring-1 ring-[#F1EDE2]/40 pointer-events-none" />
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering={true}
              menuButtonColor="#F1EDE2"
              openMenuButtonColor="#D8B0B0"
              changeMenuColorOnOpen={true}
              colors={["#AFC8E6", "#D8B0B0", "#F1EDE2", "#AFC8E6", "#D8B0B0"]}
              accentColor="#F1EDE2"
              isFixed={true}
              onMenuOpen={() => {}}
              onMenuClose={() => {}}
            />
          </div>
        </div>

      </div>
    </nav>
  )
}
