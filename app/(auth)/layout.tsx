import type { ReactNode } from "react"

/**
 * Shared shell for the (auth) route group — wraps /sign-in and /sign-up:
 * page #010103 backdrop with a soft, hero-artscape-style brand glow and the
 * content centered below the sticky header. The pages themselves ship the
 * card + form + toggle.
 *
 * Note: hireloop.fig has no dedicated sign-in/sign-up screens (only the nav
 * "Sign In" button), so this shell reuses the homepage's extracted tokens —
 * #151516 cards, #101010 inputs, #5C53FE brand, Manrope + Space Mono eyebrow.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-svh items-center justify-center bg-[#010103] px-4 py-16 sm:px-6">
      {/* Decorative glow — delete these two layers for a flat backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden"
      >
        <div className="absolute top-[-240px] left-1/2 h-[480px] w-[min(680px,100vw)] -translate-x-1/2 rounded-full bg-[#DC02CE]/10 blur-[90px]" />
        <div className="absolute top-[-200px] left-1/2 h-[400px] w-[min(560px,90vw)] -translate-x-1/2 rounded-full bg-[#5C53FE]/10 blur-[80px]" />
      </div>
      {children}
    </main>
  )
}
