import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Nikki & Geofrey - Wedding Invitation",
  description:
    "You're invited to the wedding of Nikki & Geofrey! Join us on December 23, 2025 at St. Rose of Lima Parish, Bacacay, Albay. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Nikki Geofrey wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2025 weddings, love story, guestbook, wedding registry, wedding details, wedding venues St. Rose of Lima Parish, Bacacay, Albay, #NikkiAndGeofreyWedding",
  authors: [
    { name: "Nikki" },
    { name: "Geofrey" },
  ],
  creator: "Nikki & Geofrey",
  publisher: "Nikki & Geofrey",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://Nikki-and-Geofrey-invitation.vercel.app/"),
  alternates: {
    canonical: "https://Nikki-and-Geofrey-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Nikki & Geofrey Wedding | December 23, 2025",
    description:
      "Celebrate the union of Nikki & Geofrey on December 23, 2025 at St. Rose of Lima Parish, Bacacay, Albay. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://Nikki-and-Geofrey-invitation.vercel.app/",
    siteName: "Nikki and Geofrey Wedding ",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://Nikki-and-Geofrey-invitation.vercel.app/desktop-background/couple (41).jpg",
        width: 1200,
        height: 630,
        alt: "Nikki & Geofrey Wedding Invitation - December 23, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikki & Geofrey Wedding Invitation",
    description:
      "You're invited to the wedding of Nikki & Geofrey! December 23, 2025. RSVP, view our gallery, and leave a message! #NikkiAndGeofreyWedding",
    images: ["https://Nikki-and-Geofrey-invitation.vercel.app/desktop-background/couple (41).jpg"],
    creator: "@nikkibalane",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Nikki & Geofrey Wedding",
      startDate: "2025-12-23T13:30:00+08:00",
      endDate: "2025-12-23T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "St. Rose of Lima Parish, Bacacay, Albay",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bacacay, Albay",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://Nikki-and-Geofrey-invitation.vercel.app/desktop-background/couple (41).jpg"],
      description:
        "You're invited to the wedding of Nikki & Geofrey! Join us on December 23, 2025 at St. Rose of Lima Parish, Bacacay, Albay. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Nikki & Geofrey",
      },
      offers: {
        "@type": "Offer",
        url: "https://Nikki-and-Geofrey-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#NikkiAndGeofreyWedding",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#AFC8E6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
