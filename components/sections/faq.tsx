"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"
import { siteContent } from "@/lib/content"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When is the wedding?",
    answer:
      `Our wedding will be held on ${siteContent.wedding.date}. The wedding ceremony will start at exactly ${siteContent.wedding.time}. We kindly ask guests to arrive by ${siteContent.ceremony.time} to help us begin promptly.`,
  },
  {
    question: "Where will the ceremony and reception take place?",
    answer:
      "Both the ceremony and reception will be held at Patio Luisa. You can find directions and copy the address in the Details section above.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      `Kindly respond on or before ${siteContent.details.rsvp.deadline}. Your response helps us finalize our guest list and seating arrangements. Thank you!\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,
  },
  {
    question: "How do I RSVP?",
    answer:
      `Please search for your name in the RSVP section above and follow the instructions to confirm your attendance. If you cannot find your name, fill up request to join in the guest list section.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      "Kindly arrive by 3:30 PM so we can begin the ceremony promptly at exactly 4:00 PM. Your punctuality means so much to us — and don't forget to have a light snack beforehand so you can enjoy the celebration comfortably!",
  },
  {
    question: "What should I wear?",
    answer:
      "Formal attire is lovingly encouraged. Our motif is Sage Green, White, and Gold. For guests, semi-formal or formal attire in sage greens, soft neutrals, and light gold accents is warmly encouraged. We kindly request no all-white dresses, jeans, or shorts.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "The seating will be formal, RSVP-style. That's why we're asking you to fill out this invitation form to secure your spot. Kindly do not bring plus ones unless explicitly stated in your invitation.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Parking is available at the venue. Please arrive early to find a comfortable spot. Private vehicles and local transport are welcome.",
  },
  {
    question: "How do I get directions to the venues?",
    answer:
      "You can find directions in the Details section above. Simply click the 'Get Directions' button on either the ceremony or reception card, and it will open Google Maps with the location. You can also copy the address to use in your preferred navigation app.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "This is an unplugged ceremony. We kindly ask guests to refrain from using phones or cameras during the ceremony so everyone can be fully present. Our professional photographers will capture every moment and we'll share the photos afterward.",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP. We want to ensure everyone can enjoy the celebration comfortably!",
  },
  {
    question: "Will there be transportation provided?",
    answer:
      "Private vehicles and local transport are welcome. We recommend coordinating with friends or family and planning your route ahead of time. Please plan your route ahead to avoid unexpected delays.",
  },
  {
    question: "What happens after the ceremony?",
    answer:
      "The reception will follow after the ceremony at Patio Luisa. The seating will be formal, RSVP-style, so please make sure you've confirmed your attendance through the RSVP form.",
  },
  {
    question: "Are children welcome?",
    answer:
      "We love children, but due to the formal nature of our celebration and limited seating, we kindly ask that only children explicitly included in your invitation attend. If you have questions about this, please reach out to us.",
  },
  {
    question: "What if I can't attend?",
    answer:
      "We completely understand if you cannot attend. Please still RSVP to let us know, and feel free to leave a message for Kim and Ced. Your presence will be missed, but your well wishes mean the world to us!",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#909E8D]"
    >
      {/* Background elements with sage & champagne motif (using #909E8D as primary) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical sage gradients to frame the FAQ */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#3D4636]/92 via-[#909E8D]/75 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#3D4636]/95 via-[#909E8D]/70 to-transparent" />
        {/* Soft radial light in warm neutrals */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,207,181,0.28),transparent_55%)] opacity-90" />
        {/* Subtle diagonal wash of muted sage */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#909E8D]/25 via-transparent to-[#F0F0EE]/10 mix-blend-soft-light" />
      </div>

      {/* Section Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          Common Questions
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          Frequently Asked Questions
        </h2>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#D1AB6D] to-transparent" />
          <div className="w-1.5 h-1.5 bg-[#D1AB6D] rounded-full shadow-[0_0_12px_rgba(209,171,109,0.9)]" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-[#D1AB6D] to-transparent" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Main card */}
        <div className="relative bg-white/10 backdrop-blur-md border border-[#E0CFB5]/60 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* FAQ items */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#E0CFB5]/40 bg-white/5 backdrop-blur-sm hover:border-[#E0CFB5]/70 hover:bg-white/10 transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#FDECEF]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className={`${cormorant.className} font-semibold text-white pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200 group-hover:text-[#FDECEF]`}>
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-white/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-white/5 border-t border-[#E0CFB5]/30">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${cormorant.className} text-white/95 leading-snug sm:leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre-line`}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-white underline font-semibold hover:text-[#F0F0EE] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className={`${cormorant.className} text-white/95 leading-snug sm:leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre-line`}>
                              {item.answer}
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
    </Section>
  )
}
