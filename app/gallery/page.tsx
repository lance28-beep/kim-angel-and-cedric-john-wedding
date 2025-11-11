import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#AFC8E6] via-[#D8B0B0]/40 to-[#F1EDE2] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#D8B0B0]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#D8B0B0]/15 to-transparent" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1F2A37] mb-3 sm:mb-4 drop-shadow-md">
            Gallery
          </h1>
          <p className="mt-3 text-[#1F2A37]/80 font-sans font-light text-sm sm:text-base md:text-lg">A collection from our favorite moments</p>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#D8B0B0]/60 to-transparent" />
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#1F2A37]/80">
            <p>No images found. Add files to <code className="px-2 py-1 bg-white/40 rounded border border-[#D8B0B0]/30 text-[#1F2A37]">public/desktop-background</code> or <code className="px-2 py-1 bg-white/40 rounded border border-[#D8B0B0]/30 text-[#1F2A37]">public/mobile-background</code>.</p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-[#D8B0B0]/30 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1F2A37] mb-4">
              Share Your Moments
            </h2>
            <p className="text-[#1F2A37]/80 font-sans font-light text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
              Use our wedding hashtags to share your photos and be featured in our gallery!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="px-4 py-2 bg-[#D8B0B0]/20 border border-[#D8B0B0]/40 rounded-full text-[#1F2A37] font-sans font-medium text-sm sm:text-base">
                #GeofreyAndNikki
              </span>
              <span className="px-4 py-2 bg-[#D8B0B0]/20 border border-[#D8B0B0]/40 rounded-full text-[#1F2A37] font-sans font-medium text-sm sm:text-base">
                #TheNikkiAndGeofreyWedding
              </span>
            </div>
            <Link
              href="/#snap-share"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D8B0B0] to-[#D8B0B0]/90 text-[#F1EDE2] font-semibold rounded-full border border-[#D8B0B0] hover:from-[#D8B0B0]/90 hover:to-[#D8B0B0] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans"
            >
              Learn More About Sharing
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


