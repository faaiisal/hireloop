import {
  Bookmark,
  Building2,
  CircleDollarSign,
  FileText,
  MousePointerClick,
  Search,
  Target,
  TrendingUp,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

/**
 * Features band — built from hireloop.fig > Design > Homepage
 * ("Frame 2147234483", 1440x672, solid #151516 band).
 *
 *  Section:  top inset 120 / bottom inset 120 (desktop)
 *  Header:   520px block centered; 8px #5C53FE squares + Space Mono 20px;
 *            title Manrope SemiBold 48, 16px below eyebrow
 *  Grid:     1320px (60px margins), 4 cols x 312px, 2 rows x 85px,
 *            24px column gap, 48px row gap, 64px below header
 *  Items:    transparent on the band (shadcn Card, chrome stripped);
 *            80x80 icon box (white hairline, r8) + 24px gap + text;
 *            title Inter Tight Medium 18, desc Inter Tight Regular 16
 *  Mobile:   1 col → 2 cols (sm) → 4 cols (lg)
 */
const features = [
  {
    Icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    Icon: CircleDollarSign,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    Icon: Building2,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    Icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    Icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    Icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    Icon: Target,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    Icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
]

function FeatureItem({ feature }: { feature: (typeof features)[number] }) {
  const { Icon, title, description } = feature
  return (
    <Card className="border-0 bg-transparent shadow-none ring-0 [--card-spacing:0rem]">
      <CardContent className="flex items-center gap-6 px-0">
        <span
          aria-hidden
          className="flex size-20 shrink-0 items-center justify-center rounded-lg border border-white bg-white/[0.04]"
        >
          <Icon className="size-8 text-white" strokeWidth={1.25} />
        </span>
        <span className="min-w-0">
          <span className="block font-inter-tight text-lg font-medium text-white">
            {title}
          </span>
          <span className="mt-1 block font-inter-tight text-base text-white/70">
            {description}
          </span>
        </span>
      </CardContent>
    </Card>
  )
}

export function Features() {
  return (
    <section aria-label="Features" className="relative bg-[#151516]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 md:py-[120px] lg:px-[60px]">
        {/* Section header — 520px block, centered per figma (x=460) */}
        <div className="mx-auto max-w-[520px] text-center">
          <p className="flex items-center justify-center gap-4">
            <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
            <span className="font-eyebrow text-sm text-white md:text-xl">
              features job
            </span>
            <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
          </p>
          <h2 className="mx-auto mt-4 max-w-[488px] font-display text-4xl font-semibold text-white md:text-[48px] md:leading-[55px]">
            Everything you need to succeed
          </h2>
        </div>

        {/* Items — 1320px, 4 cols, 24px col gap, 48px row gap, 64px below header */}
        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li key={feature.title}>
              <FeatureItem feature={feature} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
