"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is the dress code?",
    answer:
      `We kindly request our guests to dress in formal attire to celebrate our special day.\n\nTheme: ${siteConfig.dressCode.theme}\n\nPrincipal Sponsors:\n• Ladies: ${siteConfig.dressCode.sponsors.ladies}\n• Gentlemen: ${siteConfig.dressCode.sponsors.gentlemen}\n\nGuests:\n• Ladies: ${siteConfig.dressCode.guests.ladies}\n• Gentlemen: ${siteConfig.dressCode.guests.gentlemen}\n\nNote: ${siteConfig.dressCode.note}`,
  },
  {
    question: "When and where is the ceremony?",
    answer:
      `The ceremony will be held on ${siteConfig.ceremony.date} at ${siteConfig.ceremony.time}.\nVenue: ${siteConfig.ceremony.venue}\nLocation: ${siteConfig.ceremony.location}`,
  },
  {
    question: "Where is the reception?",
    answer:
      `The reception follows on ${siteConfig.reception.date} at ${siteConfig.reception.time}.\nVenue: ${siteConfig.reception.venue}\nLocation: ${siteConfig.reception.location}`,
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      `Kindly RSVP by ${siteConfig.details.rsvp.deadline}. Your response helps us finalize our guest list. Thank you!\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "Your presence is the greatest gift. If you wish to bless us with a monetary gift, you may give it in person or scan the GCash QR located in the Monetary Gifts section.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Ample parking is available at the venue. We recommend arriving 15-20 minutes early to secure a spot.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We kindly ask that any additional guests be included or declared in your RSVP so we can make the proper arrangements. Thank you so much for your understanding — we can't wait to celebrate together on our special day!",
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
      "Please contact us as soon as possible if your plans change. You can update your RSVP by searching for your name in the RSVP section.",
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
      className="relative bg-gradient-to-b from-[#AFC8E6] via-[#D8B0B0]/90 to-[#AFC8E6] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle background elements */}
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
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FFFFFF]/90 font-sans font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
          Everything you need to know
        </p>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card */}
        <div className="relative bg-white/95 backdrop-blur-sm border border-[#F1EDE2]/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Inner gold border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#F1EDE2] rounded-lg sm:rounded-xl pointer-events-none" />
          
          {/* FAQ items */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="space-y-3 sm:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#F1EDE2]/30 bg-white hover:bg-[#F1EDE2]/5 transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#F1EDE2]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-semibold text-black pr-4 text-sm sm:text-base md:text-lg font-sans leading-relaxed transition-colors duration-200">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-black/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} sm:w-5 sm:h-5`}
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
                        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-[#F1EDE2]/10 border-t border-[#F1EDE2]/20">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-black leading-relaxed text-sm sm:text-base md:text-lg font-sans whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-black underline font-semibold hover:opacity-80 transition-colors"
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
                            <p className="text-black leading-relaxed text-sm sm:text-base md:text-lg font-sans whitespace-pre-line">
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
