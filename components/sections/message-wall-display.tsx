"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-2 border-[#AFC8E6]/20 shadow-lg bg-white/95 backdrop-blur-md rounded-2xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#AFC8E6]/20 to-[#D8B0B0]/20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 sm:w-32 bg-[#AFC8E6]/20" />
                    <Skeleton className="h-3 w-20 sm:w-24 bg-[#D8B0B0]/20" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-4 h-4 rounded bg-[#AFC8E6]/20" />
                  <Skeleton className="w-3 h-3 rounded bg-[#D8B0B0]/20" />
                </div>
              </div>
              <Skeleton className="h-16 sm:h-20 w-full bg-gradient-to-r from-[#AFC8E6]/10 via-[#D8B0B0]/10 to-[#F1EDE2]/10 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20 px-4">
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#AFC8E6]/30 to-[#D8B0B0]/20 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#AFC8E6] via-[#D8B0B0] to-[#F1EDE2] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          {/* Outer decorative rings */}
          <div className="absolute -inset-3 rounded-full border-2 border-[#AFC8E6]/20 animate-ping"></div>
          <div className="absolute -inset-2 rounded-full border border-[#D8B0B0]/30"></div>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
          No Messages Yet
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-white/90 font-lora max-w-md mx-auto leading-relaxed mb-6">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles className="h-4 w-4 text-[#AFC8E6] animate-pulse" />
            <span className="text-xs sm:text-sm font-lora text-white/90">Your message will appear here</span>
            <Sparkles className="h-4 w-4 text-[#D8B0B0] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border-2 border-[#AFC8E6]/30 shadow-lg bg-white/95 backdrop-blur-md hover:shadow-2xl hover:border-[#AFC8E6]/50 transition-all duration-500 group overflow-hidden transform rounded-2xl hover:scale-[1.02] ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards',
            boxShadow: '0 4px 20px rgba(175, 200, 230, 0.15), 0 2px 8px rgba(216, 176, 176, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(175, 200, 230, 0.25), 0 4px 12px rgba(216, 176, 176, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(175, 200, 230, 0.15), 0 2px 8px rgba(216, 176, 176, 0.1)';
          }}
        >
          {/* Enhanced card background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#AFC8E6]/8 via-transparent to-[#F1EDE2]/10 opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AFC8E6]/40 via-[#D8B0B0]/50 to-[#F1EDE2]/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: 'inset 0 0 0 1px rgba(175, 200, 230, 0.2)' }} />
          
          {/* Subtle shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Decorative inner border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 rounded-xl pointer-events-none">
            {/* Main decorative border */}
            <div className="absolute inset-0 rounded-xl border border-[#AFC8E6]/20 group-hover:border-[#AFC8E6]/40 transition-colors duration-300"></div>
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#AFC8E6]/30 rounded-tl-xl group-hover:border-[#AFC8E6]/50 transition-colors duration-300"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D8B0B0]/30 rounded-tr-xl group-hover:border-[#D8B0B0]/50 transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D8B0B0]/30 rounded-bl-xl group-hover:border-[#D8B0B0]/50 transition-colors duration-300"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F1EDE2]/30 rounded-br-xl group-hover:border-[#F1EDE2]/50 transition-colors duration-300"></div>
            
            {/* Gradient overlay on border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#AFC8E6]/5 via-transparent to-[#F1EDE2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Decorative dots at corners */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#AFC8E6]/40 rounded-full group-hover:bg-[#AFC8E6]/60 transition-colors duration-300"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#D8B0B0]/40 rounded-full group-hover:bg-[#D8B0B0]/60 transition-colors duration-300"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#D8B0B0]/40 rounded-full group-hover:bg-[#D8B0B0]/60 transition-colors duration-300"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#F1EDE2]/40 rounded-full group-hover:bg-[#F1EDE2]/60 transition-colors duration-300"></div>
          </div>
          
          <CardContent className="relative p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#AFC8E6] via-[#D8B0B0] to-[#F1EDE2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-white/50">
                    <span className="text-white font-lora text-sm sm:text-base font-semibold drop-shadow-sm">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  {/* Enhanced avatar glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#AFC8E6]/40 via-[#D8B0B0]/30 to-[#F1EDE2]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#AFC8E6]/20 to-[#D8B0B0]/15 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-20 animate-pulse"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-foreground text-base sm:text-lg font-semibold truncate group-hover:text-[#AFC8E6] transition-colors duration-300">{msg.name}</h4>
                  <span className="text-xs sm:text-sm text-foreground/60 font-lora group-hover:text-foreground/70 transition-colors duration-300">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#AFC8E6]/70 fill-[#AFC8E6]/20 group-hover:fill-[#AFC8E6]/50 group-hover:text-[#AFC8E6] transition-all duration-300 group-hover:scale-110" />
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#D8B0B0]/70 group-hover:text-[#D8B0B0] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 text-2xl sm:text-4xl text-[#AFC8E6]/40 font-playfair group-hover:text-[#AFC8E6]/60 transition-all duration-300 group-hover:scale-110">"</span>
              <p className="text-foreground/85 text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 font-lora group-hover:text-foreground/95 transition-colors duration-300">{msg.message}</p>
              <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 text-2xl sm:text-4xl text-[#D8B0B0]/40 font-playfair group-hover:text-[#D8B0B0]/60 transition-all duration-300 group-hover:scale-110">"</span>
            </div>
            
            {/* Enhanced message bottom accent */}
            <div className="mt-4 sm:mt-5 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-foreground/50">
                <div className="w-1 h-1 rounded-full bg-[#AFC8E6]/50"></div>
                <div className="w-1 h-1 rounded-full bg-[#D8B0B0]/50"></div>
                <div className="w-1 h-1 rounded-full bg-[#F1EDE2]/50"></div>
              </div>
              <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#AFC8E6]/50 via-[#D8B0B0]/60 to-transparent group-hover:via-[#AFC8E6]/70 group-hover:via-[#D8B0B0]/80 transition-all duration-300"></div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
