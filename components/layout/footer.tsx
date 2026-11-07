import Link from "next/link"

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Job discovery", href: "/browse-jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/company" },
      { label: "Salary data", href: "/salary-data" },
    ],
  },
  {
    heading: "Navigations",
    links: [
      { label: "Help center", href: "/help-center" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guideline" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
]

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.1 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94Z" />
    </svg>
  )
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.87 6.36 9.33-.09-.79-.17-2 .03-2.87.19-.8 1.21-5.06 1.21-5.06s-.31-.61-.31-1.52c0-1.42.83-2.49 1.85-2.49.88 0 1.3.66 1.3 1.44 0 .88-.56 2.19-.85 3.41-.24 1.02.51 1.85 1.52 1.85 1.82 0 3.22-1.92 3.22-4.7 0-2.45-1.76-4.17-4.28-4.17-2.91 0-4.62 2.19-4.62 4.45 0 .88.34 1.83.76 2.34.08.1.09.19.07.29l-.28 1.13c-.04.18-.15.22-.34.13-1.25-.58-2.03-2.41-2.03-3.88 0-3.16 2.29-6.06 6.62-6.06 3.47 0 6.17 2.47 6.17 5.78 0 3.45-2.18 6.23-5.2 6.23-1.02 0-1.97-.53-2.3-1.15l-.63 2.38c-.22.87-.83 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

function FooterLogo() {
  return (
    <span className="flex items-center font-display text-[22px] font-extrabold leading-none tracking-[-0.02em]">
      <span className="text-[#5B7AFF]">hire</span>
      <span className="text-[#FF8A2E]">loop</span>
    </span>
  )
}

/**
 * Footer — fixed gap analysis:
 * Before: pt-16 pb-10 + mt-14 / md:mt-[72px] for bottom row + h-10 row + large 40x40 socials
 * created ~ 160px empty space after CTA due to CTA min-h + footer large paddings.
 * Fig crop shows: CTA buttons → ~32px → footer logo row, no extra black gap,
 * footer pt ~40px, bottom social row mt ~48px, social tiles 36x36, side white 6%,
 * middle purple #5C53FE, copyright 13px #ACABB2. Fixed to match.
 */
export function Footer() {
  return (
    <footer className="relative bg-[#010103] px-4 pb-8 pt-10 sm:px-6 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col">
        {/* Top row — logo + tagline left, links right */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-[280px] flex-col">
            <Link href="/" aria-label="HireLoop home" className="self-start">
              <FooterLogo />
            </Link>
            <p className="mt-4 font-display text-[13.5px] leading-[22px] text-white/45">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          <nav className="flex flex-col gap-8 sm:flex-row md:gap-16 lg:gap-[72px]">
            {columns.map((col) => (
              <div key={col.heading} className="min-w-[140px]">
                <h3 className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6F68FF]">
                  {col.heading}
                </h3>
                <ul className="mt-[14px] flex flex-col gap-[8px]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-display text-[13.5px] leading-6 text-white/50 transition-colors hover:text-white/80"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom row — social left, copyright right */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.06] pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="#"
              aria-label="Facebook"
              className="flex size-[36px] items-center justify-center rounded-[8px] bg-white/[0.06] text-white/50 ring-1 ring-white/[0.05] transition hover:bg-white/10 hover:text-white/80"
            >
              <FacebookIcon className="size-[14px]" />
            </Link>
            <Link
              href="#"
              aria-label="Pinterest"
              className="flex size-[36px] items-center justify-center rounded-[8px] bg-[#5C53FE] text-white shadow-[0_4px_12px_rgba(92,83,254,0.3)] transition hover:bg-[#6B63FF]"
            >
              <PinterestIcon className="size-[14px]" />
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
              className="flex size-[36px] items-center justify-center rounded-[8px] bg-white/[0.06] text-white/50 ring-1 ring-white/[0.05] transition hover:bg-white/10 hover:text-white/80"
            >
              <LinkedInIcon className="size-[14px]" />
            </Link>
          </div>

          <div className="flex flex-col gap-1 font-display text-[12.5px] text-white/35 md:flex-row md:items-center md:gap-6">
            <span>Copyright 2024 —Programming Hero</span>
            <Link href="/terms" className="transition-colors hover:text-white/60">
              Terms & Policy - Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
