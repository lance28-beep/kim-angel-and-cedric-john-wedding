"use client"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Stack from "@/components/stack"
import { motion } from "motion/react"


export function Narrative() {
  // Generate particle positions
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 10,
    size: 2 + Math.random() * 3,
    xMove: Math.random() * 20 - 10,
  }))

  return (
    <Section id="narrative" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F1EDE2]/60 to-[#FFFFFF]">

      {/* Particle Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{ background: `radial-gradient(circle at 30% 30%, #D8B0B033 0%, #F1EDE222 90%, #FFFFFF11 99%)` }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.xMove, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Floating hearts */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-[#F1EDE2]/30"
            style={{
              top: `${10 + i * 12}%`,
              left: `${5 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}

      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF]/85 via-[#FFFFFF]/70 to-[#FFFFFF]/85 backdrop-blur-md z-10"></div>

      {/* Bottom-right flower decoration (above layered background) */}
      <img
        src="/decoration/flower-bg-left-down.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 z-20 w-32 sm:w-40 md:w-52 lg:w-60 opacity-90 select-none pointer-events-none"
      />
      {/* Overlay for a slight warmth effect for theme harmony */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#F1EDE2]/60 to-transparent mix-blend-multiply"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12 md:mb-24"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-primary mb-6 md:mb-8 text-balance drop-shadow-lg tracking-tight">
            <span className="text-[#AFC8E6]">Our Love Story:</span>
          </h2>
          
          {/* Decorative flourish */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#F1EDE2]/80 to-[#D8B0B0]/40"></div>
            <svg className="w-6 h-6 md:w-8 md:h-8 text-[#F1EDE2]/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-[#F1EDE2]/80 to-[#D8B0B0]/40"></div>
          </div>
        </motion.div>

        {/* Main Content - Centered Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Spacer */}
          <div className="hidden lg:block"></div>

          {/* Interactive Stack Component - Center */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D8B0B0]/30 via-[#D8B0B0]/20 to-[#FFFFFF]/25 rounded-full blur-3xl -z-10 w-full h-full max-w-sm animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F1EDE2]/25 via-transparent to-[#FFFFFF]/10 rounded-full blur-2xl -z-10 w-full h-full max-w-sm"></div>

              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={{ width: 280, height: 320 }}
                cardsData={[
                  { id: 1, img: "/mobile-background/couple (8).jpg" },
                  { id: 2, img: "/mobile-background/couple (17).jpg" },
                  { id: 3, img: "/mobile-background/couple (1).jpg" },
                ]}
                animationConfig={{ stiffness: 260, damping: 20 }}
              />

              <motion.p 
                className="text-center text-sm md:text-base text-[#AFC8E6] mt-8 font-sans font-medium tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                ✨ Drag to explore our moments ✨
              </motion.p>
            </div>
          </div>

          {/* Right Spacer */}
          <div className="hidden lg:block"></div>
        </motion.div>

        {/* Story Text - Full Width Below */}
        <motion.div 
          className="mt-16 md:mt-28 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-6 md:space-y-10">
            {siteConfig.narrative.split("\n\n").map((paragraph, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                {/* First paragraph with drop cap */}
                {index === 0 ? (
                  <p className="text-sm md:text-lg leading-relaxed text-[#AFC8E6] text-pretty font-sans font-light pl-3 md:pl-6">
                    <span className="float-left text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-[#D8B0B0] leading-none mr-2 mt-1 drop-shadow-md">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </p>
                ) : (
                  <p className="text-sm md:text-lg leading-relaxed text-[#D8B0B0] text-pretty font-sans font-light pl-3 md:pl-6">
                    {paragraph}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Divider and CTA */}
          <motion.div 
            className="mt-16 md:mt-24 lg:mt-28 space-y-8 md:space-y-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#F1EDE2]/60 to-[#D8B0B0]/30"></div>
              <svg className="w-5 h-5 text-[#F1EDE2]/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
              </svg>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#F1EDE2]/60 to-[#D8B0B0]/30"></div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="flex justify-center">
              <motion.a
                href="#guest-list"
                className="group relative w-full sm:w-auto px-8 sm:px-12 md:px-16 py-5 sm:py-6 md:py-7 text-[#FFFFFF] font-sans font-bold text-base sm:text-lg md:text-xl lg:text-2xl rounded-[2rem] transition-all duration-500 text-center overflow-hidden shadow-xl hover:shadow-2xl border-2 border-[#FFFFFF] hover:border-[#F1EDE2] hover:text-white"
                style={{ 
                  backgroundColor: "#AFC8E6",
                  boxShadow: "0 10px 40px rgba(175, 200, 230, 0.4), 0 4px 12px rgba(0,0,0,0.3)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(175, 200, 230, 0.9)";
                  e.currentTarget.style.boxShadow = "0 15px 50px rgba(175, 200, 230, 0.6), 0 6px 16px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#AFC8E6";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(175, 200, 230, 0.4), 0 4px 12px rgba(0,0,0,0.3)";
                }}
              >
                {/* Pulsing glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-[#AFC8E6]/35 rounded-[2rem] blur-2xl"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Enhanced gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Double shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
                <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-200 bg-gradient-to-l from-transparent via-white/15 to-transparent"></div>
                
                {/* Enhanced sparkle effects */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + (i % 3) * 40}%`,
                    }}
                    animate={{
                      scale: [0, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <svg className="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </motion.div>
                ))}
                
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
                <motion.div 
                  className="absolute inset-0 rounded-[2rem] border-2 border-white/20"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Decorative waves on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg className="w-full h-full" fill="none" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="white" opacity="0.1"/>
                  </svg>
                </motion.div>
                
                {/* Button content */}
                <span className="relative z-10 tracking-wide uppercase inline-flex items-center gap-3 font-bold text-[#FFFFFF]">
                  Join Our Celebration
                  <motion.svg 
                    className="w-5 h-5 md:w-6 md:h-6 text-[#FFFFFF]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                
                {/* Enhanced decorative corner ornaments */}
                <motion.div 
                  className="absolute top-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute bottom-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.div 
                  className="absolute bottom-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </Section>
  )
}
