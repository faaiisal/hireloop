import {
  Geist,
  Geist_Mono,
  Instrument_Sans,
  Manrope,
  Plus_Jakarta_Sans,
  Space_Mono,
} from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Font roles extracted from hireloop.fig > Design > Homepage:
// Manrope (headings/UI), Space Mono (eyebrow labels),
// Plus Jakarta Sans (stat numerals), Instrument Sans (statements)
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
        jakarta.variable,
        manrope.variable,
        spaceMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
