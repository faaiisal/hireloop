"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * The sign-in ↔ sign-up toggle: a segmented control that navigates between
 * the two (auth) pages via real URLs. Keeping them as links preserves the
 * routes (redirects, typed hrefs, deep links all keep working) while the UI
 * behaves like a single toggling card.
 */
const tabs = [
  { label: "Sign in", href: "/sign-in" },
  { label: "Create account", href: "/sign-up" },
] as const

export function AuthToggle() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Authentication"
      className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-[#1F1F1F] p-1"
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`flex h-10 items-center justify-center rounded-full font-display text-sm font-semibold whitespace-nowrap transition-colors ${
              active
                ? "bg-[#5C53FE] text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
