import Image from "next/image"
import {
  BarChart3,
  FileSearch,
  MapPin,
  SearchIcon,
  Sparkles,
  Star,
  UserSearch,
} from "lucide-react"

import globe from "@/app/_assets/globe.webp"

/**
 * Home hero — built from hireloop.fig > Design > Homepage ("Group 1" +
 * "Frame 2147234456" + stats "Frame 2147234448").
 *
 *  Artscape:   globe.webp for the planet/starfield body; top band is pure
 *              CSS — solid #010103 base cover + rebuilt #DC02CE@50% wash
 *              (figma "Exclude": 1840x851 @ y-70, blur 244)
 *  Eyebrow:    glass pill, Space Mono 20px
 *  H1:         Manrope Bold 56/64
 *  Subcopy:    Manrope 20px @ 70%
 *  Search bar: 784x64 #101010 r16 white border, #5C53FE button r12
 *  Trending:   pills #1A1A1B r24 white border, Manrope 14px
 *  Stats:      intro Instrument Sans Medium 40 + 4 cards 312x254,
 *              gradient #313131 -> #010102 r16 white border,
 *              numerals Plus Jakarta SemiBold 56, labels Inter Tight 18
 */
const stats = [
  { value: "50K", label: "Active Jobs", icon: FileSearch },
  { value: "12K", label: "Companies", icon: BarChart3 },
  { value: "2M", label: "Job Seekers", icon: UserSearch },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
]

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export function Hero() {
  return (
    <section
      aria-label="Find your dream job"
      className="relative overflow-x-clip"
    >
      {/* Space artscape background, from the Figma hero art layers. Pulled up
          under the floating header (header flow = 24px margin + bar height)
          so the art starts at page y=0 exactly like the figma.
          overflow-x-clip keeps the wide art from causing horizontal scroll
          while letting it escape above the section top. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[88px] left-1/2 w-full max-w-none min-w-[1440px] -translate-x-1/2 md:-top-[98px]"
      >
        <Image
          src={globe}
          alt=""
          aria-hidden
          priority
          className="h-auto w-full"
        />
        {/* C1: solid #010103 base cover over the webp's overbaked magenta band
            (solid #DD00CF for the top ~350px). Solid until ~70%, then feathered
            so there is no seam where the art already goes black on its own. */}
        <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#010103] via-[#010103] via-[65%] to-transparent" />
        {/* C2: rebuilt Exclude wash — figma: 1840x851 @ page y-70, #DC02CE @
            50% node opacity, 244px blur. The source shape is a boolean with
            cutouts (not a filled ellipse) and the blur diffuses it widely,
            so the effective peak is soft: low-alpha multi-stop falloff
            instead of a concentrated core. Geometry in % of the art box. */}
        <div className="absolute top-[-3.72%] left-1/2 h-[45.2%] w-[127.8%] max-w-none -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(220,2,206,0.30)_0%,rgba(220,2,206,0.10)_45%,rgba(220,2,206,0)_70%)] blur-[40px]" />
      </div>

      <div className="relative z-10">
        {/* Hero content column: 784px wide, eyebrow lands at figma y=274
            (176px below the navbar bottom edge) */}
        <div className="mx-auto flex w-full max-w-[784px] flex-col items-center px-4 pt-[186px] text-center sm:px-6 md:px-0 md:pt-[176px]">
          {/* Eyebrow pill — gradient #474747->#010102, black border,
              inset shadow per figma */}
          <div className="flex h-12 items-center gap-3 rounded-full border border-black bg-gradient-to-b from-[#474747] to-[#010102] pr-5 pl-3 shadow-[inset_0_0_6px_6px_rgba(0,0,0,0.10)] md:h-[50px]">
            <Sparkles
              className="size-6 shrink-0 text-white"
              strokeWidth={1.5}
            />
            <span className="font-eyebrow text-sm text-white md:text-xl">
              50,000+ new jobs this month
            </span>
          </div>

          <h1 className="mt-8 font-display text-[40px] leading-[1.1] font-bold text-white md:text-[56px] md:leading-16">
            Find Your Dream Job Today
          </h1>

          <p className="mt-4 text-base text-white/70 md:text-xl md:leading-8">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          {/* Search bar — 784x64 #101010 r16 white border per figma */}
          <form className="mt-12 flex w-full flex-col gap-1 rounded-2xl border border-white bg-[#101010] p-3 text-left md:h-16 md:flex-row md:items-center md:gap-0 md:p-2">
            <div className="flex flex-1 items-center gap-3 px-2 py-2 md:py-0">
              <SearchIcon
                className="size-6 shrink-0 text-white"
                strokeWidth={1.5}
              />
              <input
                type="text"
                name="q"
                placeholder="Job title, skill or company"
                className="h-12 w-full bg-transparent text-base text-white outline-none placeholder:text-white/80"
              />
            </div>
            {/* divider — 1x23 white per figma */}
            <span
              aria-hidden
              className="mx-3 hidden h-6 w-px shrink-0 bg-white md:block"
            />
            <div className="flex flex-1 items-center gap-3 px-2 py-2 md:py-0">
              <MapPin
                className="size-6 shrink-0 text-white"
                strokeWidth={1.5}
              />
              <input
                type="text"
                name="location"
                placeholder="Location or Remote"
                className="h-12 w-full bg-transparent text-base text-white outline-none placeholder:text-white/80"
              />
            </div>
            <button
              type="submit"
              className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5C53FE] px-5 text-base font-medium text-white transition-colors hover:bg-[#4F45E8]"
            >
              Search
              <SearchIcon className="size-6" strokeWidth={1.5} />
            </button>
          </form>

          {/* Trending positions — pills #1A1A1B r24 white border per figma */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-white/70 md:text-base">
              Trending Position
            </span>
            {trendingPositions.map((position) => (
              <span
                key={position}
                className="flex h-[33px] items-center rounded-full border border-white bg-[#1A1A1B] px-3 font-display text-sm text-white"
              >
                {position}
              </span>
            ))}
          </div>
        </div>

        {/* Stats — intro + 4 gradient cards, below the starfield at figma y=1027 */}
        <div className="mx-auto mt-24 w-full max-w-[1320px] px-4 pb-20 sm:px-6 md:mt-[358px] md:pb-[72px]">
          <p className="max-w-[600px] font-statement text-3xl leading-[1.3] font-medium text-white md:text-[40px]">
            Assisting over 15,000 job seekers find their dream positions.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="flex min-h-[220px] flex-col rounded-2xl border border-white bg-gradient-to-b from-[#010102] to-[#313131] p-6 md:h-[254px]"
              >
                <stat.icon
                  className="size-6 shrink-0 text-white"
                  strokeWidth={1.5}
                />
                <div className="mt-auto pt-8">
                  <p className="font-numeral text-[44px] leading-[1.15] font-semibold tracking-tight text-white md:text-[56px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-base text-white md:text-lg">
                    {stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
