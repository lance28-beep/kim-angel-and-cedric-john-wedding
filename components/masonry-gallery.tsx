"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type ImageItem = {
  src: string
  category: "desktop" | "mobile"
}

export default function MasonryGallery({ images }: { images: ImageItem[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const topRef = useRef<HTMLDivElement | null>(null)
  

  // Shuffle AFTER mount to avoid SSR/CSR hydration mismatches
  const [shuffledAfterMount, setShuffledAfterMount] = useState<ImageItem[] | null>(null)
  useEffect(() => {
    const copy = [...images]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    setShuffledAfterMount(copy)
  }, [images])

  const filtered = useMemo(() => {
    return shuffledAfterMount ?? images
  }, [shuffledAfterMount, images])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx == null) return
      if (e.key === "Escape") setLightboxIdx(null)
      if (e.key === "ArrowRight") setLightboxIdx((idx) => (idx == null ? null : (idx + 1) % filtered.length))
      if (e.key === "ArrowLeft") setLightboxIdx((idx) => (idx == null ? null : (idx - 1 + filtered.length) % filtered.length))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [filtered.length, lightboxIdx])

  // Ensure already-cached images appear (loaded state from complete)
  const setImgRef = (el: HTMLImageElement | null, src: string) => {
    if (!el) return
    if (el.complete) {
      setLoaded((l) => (l[src] ? l : { ...l, [src]: true }))
    }
  }

  return (
    <div ref={topRef} className="relative">
      {/* Header (buttons removed per request) */}
      <div className="mb-6 flex justify-end">
        <div className="text-[#FFFFFF]/90 text-sm font-sans">
          {filtered.length} photos
        </div>
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-[#FFFFFF]/80 font-sans">No images to display.</div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {filtered.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            className="group mb-3 sm:mb-4 block break-inside-avoid w-full text-left"
            onClick={() => setLightboxIdx(idx)}
            aria-label="Open image"
          >
            <div className="relative w-full overflow-hidden rounded-xl border border-[#F1EDE2]/40 bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#F1EDE2]/60">
              {!loaded[img.src] && (
                <div className="aspect-[3/4] sm:aspect-[4/5] w-full animate-pulse bg-gradient-to-br from-[#AFC8E6]/30 via-[#D8B0B0]/25 to-[#AFC8E6]/30" />
              )}
              <img
                ref={(el) => setImgRef(el, img.src)}
                src={img.src}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded((l) => ({ ...l, [img.src]: true }))}
                onError={() => setLoaded((l) => ({ ...l, [img.src]: true }))}
                className={`w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.02] ${
                  loaded[img.src] ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                }`}
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#AFC8E6]/40 via-transparent to-transparent" />
            </div>
          </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx != null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div className="relative max-w-6xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-[#FFFFFF] bg-[#AFC8E6]/80 hover:bg-[#AFC8E6] border border-[#F1EDE2]/50 hover:border-[#F1EDE2] rounded-full px-4 py-2.5 transition-all duration-200 shadow-lg hover:scale-110"
              onClick={() => setLightboxIdx((i) => (i == null ? null : (i - 1 + filtered.length) % filtered.length))}
            >
              ‹
            </button>
            <img
              src={filtered[lightboxIdx].src}
              alt=""
              className="max-h-[80vh] w-auto rounded-xl shadow-2xl border border-[#F1EDE2]/30"
            />
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-[#FFFFFF] bg-[#AFC8E6]/80 hover:bg-[#AFC8E6] border border-[#F1EDE2]/50 hover:border-[#F1EDE2] rounded-full px-4 py-2.5 transition-all duration-200 shadow-lg hover:scale-110"
              onClick={() => setLightboxIdx((i) => (i == null ? null : (i + 1) % filtered.length))}
            >
              ›
            </button>
            <button
              className="absolute top-3 right-3 text-[#FFFFFF] bg-[#AFC8E6]/80 hover:bg-[#AFC8E6] border border-[#F1EDE2]/50 hover:border-[#F1EDE2] rounded-full px-4 py-2 transition-all duration-200 shadow-lg hover:scale-105 font-sans text-sm"
              onClick={() => setLightboxIdx(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Back to top */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F1EDE2] to-[#F1EDE2]/90 text-[#AFC8E6] font-semibold border border-[#F1EDE2] hover:from-[#F1EDE2]/90 hover:to-[#F1EDE2] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans"
          onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Back to top
        </button>
      </div>
    </div>
  )
}


