import {
  Geist,
  Geist_Mono,
  Instrument_Sans,
  Inter,
  Inter_Tight,
  Manrope,
  Plus_Jakarta_Sans,
  Rethink_Sans,
  Space_Mono,
} from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/layout/footer"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Font roles extracted from hireloop.fig > Design > Homepage:
// Manrope (headings/UI), Space Mono (eyebrow labels),
// Plus Jakarta Sans (stat numerals), Instrument Sans (statements),
// Inter (job-card copy), Inter Tight (job-card chips/labels)
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter-tight",
})

// CTA headline face — Rethink Sans Medium 64 per hireloop.fig "Group 2"
const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        instrument.variable,
        inter.variable,
        interTight.variable,
        jakarta.variable,
        manrope.variable,
        rethinkSans.variable,
        spaceMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
