"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MenuIcon } from "lucide-react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="HireLoop home" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hireloop-logo.png" alt="HireLoop" className="h-10 w-auto md:h-11" />
    </Link>
  )
}

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  // Fix: hide global header entirely on dashboard routes.
  // Before: header was rendered inside root layout + sidebar was rendered
  // inside dashboard layout => duplicate logo/nav, floating header over sidebar
  // (as seen in screenshot: two hireloop logos, header overlapping sidebar).
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  const role = (session?.user as { role?: string } | undefined)?.role || "seeker"

  // Public nav + single dynamic Dashboard link (role based)
  // Before: duplicate Dashboard - one in navLinks and another extra in auth block
  // pointing to /dashboard (404). Now only one source of truth.
  const navLinks = [
    { label: "Browse Jobs", href: "/browse-jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: `/dashboard/${role}` },
  ]

  const user = session?.user

  async function handleSignOut() {
    await authClient.signOut()
    router.replace("/")
    router.refresh()
  }

  return (
    <header className="sticky top-6 z-50 mt-6 px-4 sm:px-6 lg:px-[60px]">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between rounded-2xl bg-[#222222] pr-3 pl-4 md:h-[74px] md:pr-2 md:pl-6">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center md:flex">
          <nav className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex h-[58px] items-center text-[15px] font-medium text-white transition-colors hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <span aria-hidden className="mx-6 h-6 w-px bg-[#A8A8A8]/40" />

          {user ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="flex h-[52px] items-center rounded-xl border border-[#090A15]/10 bg-white/10 px-[22px] text-[15px] font-semibold text-white transition hover:bg-white/20"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="flex h-[58px] items-center px-6 text-[15px] font-medium text-[#5C53FE] transition-colors hover:text-[#6D63FF]"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="flex h-[52px] items-center rounded-xl border border-[#090A15]/10 bg-[#5C53FE] px-[22px] text-[15px] font-semibold text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-[#4F45E8]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Open menu"
                className="flex size-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent side="top" showCloseButton className="rounded-b-2xl border-white/10 bg-[#222222] px-0">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col px-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={<Link href={link.href} />}
                  nativeButton={false}
                  className="py-3 text-base text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <SheetFooter className="p-4 pt-2">
              {user ? (
                <button
                  type="button"
                  onClick={async () => {
                    await handleSignOut()
                  }}
                  className="flex h-11 items-center justify-center rounded-xl bg-white/10 text-[15px] font-semibold text-white hover:bg-white/20"
                >
                  Log out
                </button>
              ) : (
                <>
                  <SheetClose
                    render={<Link href="/sign-in" />}
                    nativeButton={false}
                    className="flex h-11 items-center justify-center rounded-xl bg-white/5 text-[15px] font-medium text-[#5C53FE] hover:bg-white/10"
                  >
                    Sign In
                  </SheetClose>
                  <SheetClose
                    render={<Link href="/sign-up" />}
                    nativeButton={false}
                    className="flex h-11 items-center justify-center rounded-xl border border-[#090A15]/10 bg-[#5C53FE] text-[15px] font-semibold text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-[#4F45E8]"
                  >
                    Get Started
                  </SheetClose>
                </>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
