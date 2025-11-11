"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Check, Download } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const hashtags = ["#GeofreyAndNikki", "#TheNikkiAndGeofreyWedding"]
  const shareText = `Join us in celebrating our special day! Check out our wedding website: ${websiteUrl} ${hashtags.join(" ")} 💕`

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedHashtag(true)
      setTimeout(() => setCopiedHashtag(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "wedding-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <Section id="snap-share" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute top-10 right-5 w-48 h-48 bg-[#D8B0B0] rounded-full mix-blend-soft-light blur-3xl"
          style={{ y: scrollY * 0.2 }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-5 w-48 h-48 bg-[#F1EDE2] rounded-full mix-blend-soft-light blur-3xl"
          style={{ y: -scrollY * 0.1 }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.08, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4 text-balance">
            Snap & Share
          </h2>
          <p className="font-lora text-[#FFFFFF]/90 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4">
            Help us document our special day by sharing moments using our official hashtags.
          </p>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#D8B0B0]/60 to-transparent" />
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            className="p-[1.5px] rounded-2xl bg-gradient-to-br from-[#D8B0B0]/50 via-[#F1EDE2]/35 to-[#D8B0B0]/50"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-[#D8B0B0]/25">
            <div className="text-center">
              <div className="space-y-3 mb-4">
                {hashtags.map((hashtag) => (
                    <div key={hashtag} className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D8B0B0]/10 to-[#F1EDE2]/15 px-4 py-3 rounded-xl shadow-md border border-[#D8B0B0]/25 w-full sm:w-auto mx-auto">
                      <span className="font-lora text-base sm:text-lg md:text-xl font-bold text-black break-all sm:break-normal tracking-wide">{hashtag}</span>
                    <button
                      onClick={() => copyToClipboard(hashtag)}
                        className="p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm flex-shrink-0 ring-1 ring-[#F1EDE2]/40"
                      title="Copy hashtag"
                    >
                        {copiedHashtag ? <Check className="w-4 h-4 text-[#D8B0B0]" /> : <Copy className="w-4 h-4 text-[#AFC8E6]/60" />}
                    </button>
                  </div>
                ))}
              </div>
                <p className="font-lora text-black text-sm mb-3">Use these hashtags on your posts to be featured in our gallery.</p>
            </div>

            <div className="mt-6">
                <h4 className="font-playfair text-base sm:text-lg font-bold text-black mb-4 text-center">Our Favorite Moments</h4>
                {/* Two squares on top, one landscape below */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <motion.div className="relative aspect-square rounded-xl overflow-hidden shadow-md ring-1 ring-[#F1EDE2]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                    <Image src="/mobile-background/couple (19).jpg" alt="Favorite moment 1" fill className="object-cover" />
                  </motion.div>
                  <motion.div className="relative aspect-square rounded-xl overflow-hidden shadow-md ring-1 ring-[#F1EDE2]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                    <Image src="/mobile-background/couple (15).jpg" alt="Favorite moment 2" fill className="object-cover" />
                  </motion.div>
                  <motion.div className="relative col-span-2 aspect-[3/2] rounded-xl overflow-hidden shadow-md ring-1 ring-[#F1EDE2]/40" whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}>
                    <Image src="/desktop-background/couple (4).jpg" alt="Favorite moment 3" fill className="object-cover" />
                  </motion.div>
                </div>
                <p className="font-lora text-black text-xs text-center mt-3 px-2">Share your photos using our hashtag to be featured here!</p>
            </div>
            </div>
          </motion.div>

          <motion.div className="space-y-4" variants={fadeInUp}>
            <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-[#D8B0B0]/50 via-[#F1EDE2]/35 to-[#D8B0B0]/50">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-[#D8B0B0]/25 text-center">
              <h4 className="font-playfair text-base sm:text-lg font-bold text-black mb-4">Share Our Website</h4>
              <div className="mx-auto inline-flex flex-col items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-ink/10 mb-4">
                <div className="mb-3 p-2 rounded-xl bg-gradient-to-br from-[#F1EDE2]/40 via-[#FFFFFF]/40 to-white ring-1 ring-[#F1EDE2]/40">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <QRCodeCanvas id="snapshare-qr" value={websiteUrl} size={isMobile ? 128 : 160} includeMargin className="bg-white" />
                  </div>
                </div>
                <button
                  onClick={downloadQRCode}
                  className="flex items-center gap-2 mx-auto px-3.5 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
                  style={{ backgroundColor: '#AFC8E6', color: 'white' }}
                >
                  <Download className="w-3.5 h-3.5" style={{ color: 'white' }} />
                  <span className="font-lora">Download QR</span>
                </button>
              </div>
              <p className="font-lora text-black text-xs">Scan with any camera app</p>
              </div>
            </div>


            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-[#D8B0B0]/25">
              <h5 className="font-playfair text-lg font-bold text-black mb-4 text-center">Share on Social Media</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-3 py-2.5 sm:py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-lora font-medium text-xs sm:text-sm">Instagram</span>
                </button>
                <button
                  onClick={() => shareOnSocial("facebook")}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-3 py-2.5 sm:py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                  <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-lora font-medium text-xs sm:text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial("tiktok")}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-3 py-2.5 sm:py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/10"
                >
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-lora font-medium text-xs sm:text-sm">TikTok</span>
                </button>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-3 py-2.5 sm:py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                  <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-lora font-medium text-xs sm:text-sm">Twitter</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-8" variants={fadeInUp}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#D8B0B0]/25 max-w-3xl mx-auto">
            <p className="font-lora text-black text-base sm:text-lg leading-relaxed mb-4">
              We are so excited to celebrate our love with you! See you on our special day!
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="text-center">
                <span className="block font-playfair text-black font-bold text-lg sm:text-xl">– Nikki & Geofrey –</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
