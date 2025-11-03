"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What are the theme and motif?",
    answer:
      "Theme: Classic. Motif colors: #402921, #BB8A3D, #CDAC77, #FFF6E7. [COLOR_PALETTE]",
  },
  {
    question: "What is the dress code?",
    answer:
      "Principal Sponsors are requested to wear any shade of Gold, while Guests are encouraged to come in Semi-formal attire and avoid casual clothing.",
  },
  {
    question: "When and where is the ceremony?",
    answer:
      "The ceremony will be held on January 10, 2026 at 2:00 PM at San Jose the Husband of Mary Parish, Buyagan, La Trinidad, Benguet.",
  },
  {
    question: "Where is the reception?",
    answer:
      "The reception will follow the ceremony at D & L Garden Pavilion, Halsema Highway, La Trinidad, Benguet.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Kindly RSVP by December 20,2025. Your response will help us finalize our guest list. Thank you!. [RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Ample parking is available at both venues. We recommend arriving 15-20 minutes early to secure a spot.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "While our venue has limited space, we kindly ask that any additional guests be included or declared in your RSVP so we can make the proper arrangements. Thank you so much for your understanding — we can't wait to celebrate together on our special day!",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We have a professional photographer, but you're welcome to take photos! We'll have a dedicated time for group photos after the ceremony.",
  },
  {
    question: "What should I do if I need to cancel my RSVP?",
    answer:
      "Please contact the couple directly as soon as possible if your plans change. They will update or remove you from the RSVP list manually.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      id="faq" 
      className="relative bg-gradient-to-b from-[#402921] via-[#583016] to-[#402921] py-20 md:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#BB8A3D]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-[#CDAC77]/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#BB8A3D]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#CDAC77]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDAC77]/25 to-transparent" />
        
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

      {/* Enhanced title section */}
      <div className="relative z-10 text-center mb-8 md:mb-20">
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

        <h2 className="text-5xl sm:text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FFF6E7] mb-3 md:mb-6 text-balance drop-shadow-2xl relative">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#BB8A3D] via-[#CDAC77] to-[#FFF6E7]">Frequently Asked Questions</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#BB8A3D]/20 blur-2xl -z-10">Frequently Asked Questions</span>
        </h2>
        
        <p className="text-sm md:text-xl text-[#FFF6E7] font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed">
          Everything you need to know
        </p>

        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
          <div className="w-1 h-1 bg-[#CDAC77] rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#FFF6E7] via-[#CDAC77]/20 to-[#FFF6E7] backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-[#BB8A3D]/30">
            {/* Decorative corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-[#BB8A3D] to-[#CDAC77] rounded-full blur-sm opacity-70" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-bl from-[#BB8A3D] to-[#CDAC77] rounded-full blur-sm opacity-70" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-tr from-[#BB8A3D] to-[#CDAC77] rounded-full blur-sm opacity-70" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-tl from-[#BB8A3D] to-[#CDAC77] rounded-full blur-sm opacity-70" />
            
            {/* Inner decorative border */}
            <div className="absolute inset-2 border border-[#BB8A3D]/20 rounded-xl" />

            <div className="space-y-3 sm:space-y-4 relative z-10">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border-2 border-[#402921]/20 bg-white/80 backdrop-blur shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#402921]/40"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#402921]/50 focus-visible:ring-offset-2 rounded-t-lg sm:rounded-t-xl transition-colors hover:bg-[#402921]/5"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-semibold text-[#402921] pr-4 text-sm sm:text-base font-lora leading-relaxed">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#402921] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} sm:w-6 sm:h-6`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out rounded-b-lg sm:rounded-b-xl ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-[#402921]/5 to-[#402921]/10 border-t-2 border-[#402921]/20">
                          {item.answer.includes("[COLOR_PALETTE]") ? (
                            <div className="space-y-3">
                              <p className="text-[#402921] leading-relaxed text-sm sm:text-base font-lora">
                                Theme: Classic. Motif: Browns and Golds.
                              </p>
                              <div>
                                <p className="text-[#402921] font-semibold text-xs sm:text-sm mb-2">Color Palette:</p>
                                <div className="flex gap-2 flex-wrap items-center">
                                  <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#402921]/20">
                                    <div 
                                      className="w-8 h-8 rounded-full shadow-md border-2 border-white ring-2 ring-[#525E2C]/20" 
                                      style={{ backgroundColor: '#402921' }}
                                      title="Brown"
                                    />
                                    <span className="text-xs text-[#402921] font-medium">Brown</span>
                                  </div>
                                  <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#402921]/20">
                                    <div 
                                      className="w-8 h-8 rounded-full shadow-md border-2 border-white ring-2 ring-[#525E2C]/20" 
                                      style={{ backgroundColor: '#BB8A3D' }}
                                      title="Earth Colors"
                                    />
                                    <span className="text-xs text-[#402921] font-medium">Earth Colors</span>
                                  </div>
                                  <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#402921]/20">
                                    <div 
                                      className="w-8 h-8 rounded-full shadow-md border-2 border-white ring-2 ring-[#525E2C]/20" 
                                      style={{ backgroundColor: '#CDAC77' }}
                                      title="Beige"
                                    />
                                    <span className="text-xs text-[#402921] font-medium">Beige</span>
                                  </div>
                                  <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#402921]/20">
                                    <div 
                                      className="w-8 h-8 rounded-full shadow-md border-2 border-white ring-2 ring-[#525E2C]/20" 
                                      style={{ backgroundColor: '#FFF6E7' }}
                                      title="Peach"
                                    />
                                    <span className="text-xs text-[#402921] font-medium">Peach</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-[#402921] leading-relaxed text-sm sm:text-base font-lora whitespace-pre-line">
                              {item.answer.includes("[RSVP_LINK]") ? (
                                <>
                                  {item.answer.split("[RSVP_LINK]")[0]}
                                  <a 
                                    href="#guest-list" 
                                    className="text-[#BB8A3D] underline font-semibold hover:text-[#CDAC77] transition-colors"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                  >
                                    {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                                  </a>
                                  {item.answer.split("[/RSVP_LINK]")[1]}
                                </>
                              ) : (
                                item.answer
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
