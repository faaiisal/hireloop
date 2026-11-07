"use client"

import { useState } from "react"
import { ArrowRight, Check, Crown, Sprout, Zap } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

/**
 * Pricing — built from hireloop.fig > Design > Homepage
 * ("Pricing", 1440x987, transparent fill over the #010103 page).
 *
 *  Section:  top inset 120 / bottom inset 120 (desktop)
 *  Header:   488px block centered; "Pricing" Space Mono 20px;
 *            title Manrope SemiBold 48, 16px below eyebrow
 *  Toggle:   centered, 24px below header; the file's two-pill control is
 *            rebuilt as Monthly + Switch + Yearly + 25% badge (#DC02CE)
 *            per the redesign request — same tokens, same position
 *  Cards:    1320px (60px margins), 3x424 cols, 450px rows, 24px gaps,
 *            24px below toggle; side cards #010103 + cream hairline,
 *            middle (Growth) card #151516 + white border
 *  Card:     px-24; icon 40x40 r8 + title Plus Jakarta 24 left,
 *            price Plus Jakarta SB 40 + "/month" Inter Tight 14 right;
 *            features title Inter Medium 18, 4 rows (24x24 r6 #595959
 *            check + Inter 16); button 55px r12 #595959,
 *            Manrope SB 16 + arrow
 *  Prices:   monthly $0 / $17 / $99; yearly = 25% off, shown as the
 *            monthly equivalent ($12.75 / $74.25) with the annual total
 *  Mobile:   1 col → 3 cols (lg)
 */
const plans = [
  {
    name: "Starter",
    Icon: Sprout,
    monthly: 0,
    blurb: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: false,
  },
  {
    name: "Growth",
    Icon: Zap,
    monthly: 17,
    blurb: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: true,
  },
  {
    name: "Premium",
    Icon: Crown,
    monthly: 99,
    blurb: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    featured: false,
  },
]

function formatPrice(value: number) {
  return `$${Math.round(value * 100) / 100}`
}

function PlanCard({
  plan,
  yearly,
}: {
  plan: (typeof plans)[number]
  yearly: boolean
}) {
  const { Icon, blurb, featured, features, monthly, name } = plan
  const display = yearly ? monthly * 0.75 : monthly
  const annualTotal = Math.round(monthly * 0.75 * 12)

  return (
    <Card
      className={`h-full rounded-3xl ring-1 [--card-spacing:0rem] lg:min-h-[450px] ${
        featured
          ? "border-white bg-[#151516]"
          : "border-[#F6EFE1]/15 bg-[#010103]"
      }`}
    >
      <CardContent className="flex h-full flex-col gap-6 px-6 pt-6">
        {/* Header: icon + plan name left, price right */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <span
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5"
            >
              <Icon className="size-6 text-white" strokeWidth={1.5} />
            </span>
            <span className="truncate font-numeral text-2xl text-white">
              {name}
            </span>
          </div>
          <p className="flex shrink-0 items-baseline gap-1">
            <span className="font-numeral text-[40px] leading-none font-semibold text-white">
              {formatPrice(display)}
            </span>
            <span className="font-inter-tight text-sm text-white/60">
              /month
            </span>
          </p>
        </div>
        {yearly &&
          (monthly > 0 ? (
            <p className="-mt-4 font-inter text-sm text-white/60">
              Billed yearly (${annualTotal}/yr) — 25% off
            </p>
          ) : (
            <p className="-mt-4 font-inter text-sm text-white/60">
              Free forever — no card required
            </p>
          ))}

        {/* Features */}
        <div>
          <p className="font-inter text-lg font-medium text-white">{blurb}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#595959]"
                >
                  <Check className="size-4 text-white" strokeWidth={2} />
                </span>
                <span className="font-inter text-base text-white">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA — pinned to the card bottom */}
        <div className="mt-auto pb-6">
          <button
            type="button"
            className="flex h-[55px] w-full items-center justify-center gap-2 rounded-xl bg-[#595959] px-6 font-display text-base font-semibold text-white transition-colors hover:bg-[#6b6b6b]"
          >
            Choose This Plan
            <ArrowRight className="size-6 shrink-0" strokeWidth={1.5} />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="relative scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 md:py-[120px] lg:px-[60px]">
        {/* Section header — 488px block, centered per figma (x=476) */}
        <div className="mx-auto max-w-[488px] text-center">
          <p className="flex items-center justify-center gap-4">
            <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
            <span className="font-eyebrow text-sm text-white md:text-xl">
              Pricing
            </span>
            <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
          </p>
          <h2 className="mx-auto mt-4 font-display text-4xl font-semibold text-white md:text-[48px] md:leading-[55px]">
            Pay for the leverage, not the listings
          </h2>
        </div>

        {/* Billing toggle — centered, 24px below header */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Label
            htmlFor="billing-period"
            className={`font-inter text-lg font-medium transition-colors ${
              yearly ? "text-white/50" : "text-white"
            }`}
          >
            Monthly
          </Label>
          <Switch
            id="billing-period"
            checked={yearly}
            onCheckedChange={setYearly}
            aria-label="Toggle yearly billing"
          />
          <span
            className={`font-inter text-lg font-medium transition-colors ${
              yearly ? "text-white" : "text-white/50"
            }`}
          >
            Yearly
          </span>
          <span className="rounded-md bg-[#DC02CE] px-2 py-0.5 font-inter text-base text-white">
            25%
          </span>
        </div>

        {/* Plans — 1320px, 3 cols, 24px gaps, 24px below toggle */}
        <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.name}>
              <PlanCard plan={plan} yearly={yearly} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
