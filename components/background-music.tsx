"use client"

import { useEffect, useRef } from "react"

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const handleUserInteraction = () => {
      const audioEl = audioRef.current
      if (!audioEl) return
      audioEl.play().then(() => {
        document.removeEventListener("click", handleUserInteraction)
        document.removeEventListener("touchstart", handleUserInteraction)
      }).catch((error) => {
        console.log("Playback blocked:", error)
      })
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      // Use an encoded URI to avoid issues with spaces/parentheses on some mobile browsers
      src={encodeURI("/background_music/Kina Grannis ft. Imaginary Future - I Will Spend My Whole Life Loving You (lyrics).mp3")}
      loop
      preload="auto"
      // playsInline helps iOS treat this as inline media rather than requiring fullscreen behavior
      playsInline
      // Keep element non-visible; playback is initiated on first user interaction
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic


