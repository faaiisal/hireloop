import Link from "next/link"
import { ArrowRight, Briefcase, CircleDollarSign, MapPin } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/**
 * Smart job discovery — built from hireloop.fig > Design > Homepage
 * ("Frame 2147234472", 1440x1302, transparent fill over the #010103 page).
 *
 *  Section:    top inset 120 / bottom inset 120 (desktop)
 *  Header:     600px block centered; 8px #5C53FE squares + Space Mono 20px;
 *              title Manrope SemiBold 48/55 centered, 16px below eyebrow
 *  Grid:       1320px, 3 cols x 424px, rows 363px, 24px gaps, 64px below header
 *  Cards:      #151516 r24, px-24/py-32/gap-32; hover takes the white border
 *              (the file's Property 1=Variant2 state)
 *  Chips:      #1F1F1F h36 r-full, Inter Tight Medium 14 + 16px icons
 *  Apply:      154x55 r12, Manrope SemiBold 16 + arrow
 *  View all:   188x58 white r12, Instrument Sans Medium 18 #0B0B14,
 *              hairline #090A15, inner white glow — links to /browse-jobs
 *
 *  NOTE: the Figma holds six identical card instances with zero text
 *  overrides, so all six render the file's master copy. Swap `jobs` for
 *  real data when the listings API lands.
 */
const jobs = [
  {
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    schedule: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    schedule: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    schedule: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    schedule: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    schedule: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    schedule: "Hybrid",
    salary: "€25–€40/hour",
  },
]

const chips = [
  { icon: MapPin, key: "location" },
  { icon: Briefcase, key: "schedule" },
  { icon: CircleDollarSign, key: "salary" },
] as const

function JobCard({ job }: { job: (typeof jobs)[number] }) {
  return (
    <Card className="h-full rounded-3xl border-transparent bg-[#151516] ring-0 transition-colors [--card-spacing:--spacing(8)] hover:border-white">
      <CardHeader className="gap-3 px-6">
        <CardTitle className="font-inter text-[32px] leading-[42px] font-medium text-white">
          {job.title}
        </CardTitle>
        <CardDescription className="font-inter text-base leading-[27px] text-white">
          {job.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <ul className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li
              key={chip.key}
              className="flex h-9 items-center gap-2 rounded-full bg-[#1F1F1F] px-3 text-white"
            >
              <chip.icon className="size-4 shrink-0" strokeWidth={1.5} />
              <span className="font-inter-tight text-sm font-medium">
                {job[chip.key]}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-0 bg-transparent p-0 px-6 pb-8">
        <button
          type="button"
          className="flex h-[55px] w-[154px] items-center gap-1 rounded-xl bg-[#151516] px-6 py-[14px] text-white transition-colors hover:bg-[#1F1F1F]"
        >
          <span className="font-display text-base font-semibold whitespace-nowrap">
            Apply Now
          </span>
          <ArrowRight className="size-6 shrink-0" strokeWidth={1.5} />
        </button>
      </CardFooter>
    </Card>
  )
}

export function Jobs() {
  return (
    <section aria-label="Smart job discovery" className="relative">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-16 pb-16 sm:px-6 md:pt-[50px] md:pb-[120px] lg:px-[60px]">
        {/* Section header — 600px block, centered per figma (x=420) */}
        <div className="mx-auto max-w-[600px] text-center">
          <p className="flex items-center justify-center gap-4">
            <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
            <span className="font-eyebrow text-sm text-white md:text-xl">
              Smart job discovery
            </span>
            <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
          </p>
          <h2 className="mx-auto mt-4 max-w-[488px] font-display text-4xl font-semibold text-white md:text-[48px] md:leading-[55px]">
            The roles you&apos;d never find by searching
          </h2>
        </div>

        {/* Cards — 1320px, 3 cols, 24px gaps, 64px below header */}
        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {jobs.map((job, index) => (
            <li key={index}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>

        {/* View all — 188x58 centered, 40px below grid */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/browse-jobs"
            className="flex h-[58px] w-[188px] items-center justify-center rounded-xl border border-[#090A15] bg-white font-statement text-lg font-medium text-[#0B0B14] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-white/90"
          >
            View all job open
          </Link>
        </div>
      </div>
    </section>
  )
}
