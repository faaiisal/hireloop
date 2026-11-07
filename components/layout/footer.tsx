import Link from "next/link"

/**
 * Footer — hireloop.fig > Design > Homepage (child #4), made global like the
 * header so every page renders it.
 *
 *  Frame:     content 1320 wide, authored fill #010103 (radius 16 in the file,
 *             where it sat under the CTA; as a global band the same fill is
 *             full-bleed so it also works on pages that aren't the homepage —
 *             against the #010103 page background the radius is not visible).
 *  Band:      full-width #010103; content constrained to 1320 (60px side
 *             insets at ≥1440, matching the Figma frame at x60) with the same
 *             internal inset structure: container @ y40, line row @ y305,
 *             385px tall on desktop by its paddings.
 *  Container: 1320x193 @ y40 — left "Logo + Body Text" 288 wide (logo 154x44,
 *             tagline Manrope 16/30 white, 24px below the logo), right "Link"
 *             632 (three columns 162.67 wide with 72px gutters).
 *  Columns:   heading Inter Tight Medium 18/25 #5C53FE; "Frame 97" at y49 with
 *             rows every 38px, Manrope 16/30 #D0D5DD.
 *  Line row:  1320x40 @ y305 — socials first (3x 40x40 r8 tiles, 8px gaps;
 *             side tiles white 5%, middle tile #5C53FE, white 24px icons
 *             centered at (8,8)); "Text" frame at x784 with a 24px gap between
 *             the two 16/30 rgb(172,171,178) texts, ending flush at 1320.
 *  Mobile:    blocks stack with 16px side insets — no divider lines anywhere.
 */

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
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.1 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94Z" />
    </svg>
  )
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.87 6.36 9.33-.09-.79-.17-2 .03-2.87.19-.8 1.21-5.06 1.21-5.06s-.31-.61-.31-1.52c0-1.42.83-2.49 1.85-2.49.88 0 1.3.66 1.3 1.44 0 .88-.56 2.19-.85 3.41-.24 1.02.51 1.85 1.52 1.85 1.82 0 3.22-1.92 3.22-4.7 0-2.45-1.76-4.17-4.28-4.17-2.91 0-4.62 2.19-4.62 4.45 0 .88.34 1.83.76 2.34.08.1.09.19.07.29l-.28 1.13c-.04.18-.15.22-.34.13-1.25-.58-2.03-2.41-2.03-3.88 0-3.16 2.29-6.06 6.62-6.06 3.47 0 6.17 2.47 6.17 5.78 0 3.45-2.18 6.23-5.2 6.23-1.02 0-1.97-.53-2.3-1.15l-.63 2.38c-.22.87-.83 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

function SocialTile({
  href,
  label,
  filled,
  children,
}: {
  href: string
  label: string
  filled?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={
        filled
          ? "flex size-10 items-center justify-center rounded-lg bg-[#5C53FE] text-white transition-colors hover:bg-[#6D63FF]"
          : "flex size-10 items-center justify-center rounded-lg bg-white/5 text-white transition-colors hover:bg-white/10"
      }
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="relative bg-[#010103] px-4 pt-16 pb-10 sm:px-6 md:pt-10 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col">
        {/* Container 1320x193 @ y40 */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-0">
          {/* Logo + Body Text 288x128 */}
          <div className="flex flex-col md:w-[288px]">
            <Link href="/" aria-label="HireLoop home" className="self-start">
              {/* Brand asset extracted from hireloop.fig */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hireloop-logo.png"
                alt="HireLoop"
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-6 font-display text-base leading-[30px] text-white">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Link 632x193 @ x688 — three columns, 72px gutters */}
          <nav className="flex flex-col gap-10 md:w-[632px] md:flex-row md:justify-between">
            {columns.map((column) => (
              <div key={column.heading} className="md:w-[162.67px]">
                <h3 className="font-inter-tight text-lg leading-[25px] font-medium text-[#5C53FE]">
                  {column.heading}
                </h3>
                <ul className="mt-6 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block font-display text-base leading-[30px] text-[#D0D5DD] transition-colors hover:text-white"
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

        {/* Line row 1320x40 @ y305 */}
        <div className="mt-14 flex flex-col gap-6 md:mt-[72px] md:h-10 md:flex-row md:items-center md:justify-between md:gap-0">
          {/* Social Media Handle 136x40 */}
          <div className="flex items-start gap-2">
            <SocialTile href="#" label="Facebook">
              <FacebookIcon className="size-6" />
            </SocialTile>
            <SocialTile href="#" label="Pinterest" filled>
              <PinterestIcon className="size-6" />
            </SocialTile>
            <SocialTile href="#" label="LinkedIn">
              <LinkedInIcon className="size-6" />
            </SocialTile>
          </div>

          {/* Text frame 536x30 @ x784 — two texts, 24px gap, flush right */}
          <div className="flex flex-col gap-2 font-display text-base leading-[30px] text-[#ACABB2] md:flex-row md:items-center md:gap-6">
            <span>Copyright 2024 —Programming Hero</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Policy - Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
