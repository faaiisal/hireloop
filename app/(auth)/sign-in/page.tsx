"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Eye, EyeOff } from "lucide-react"

import { AuthToggle } from "@/components/auth/auth-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError(null)

    // ── Form data collection ────────────────────────────────────────────
    // Everything the form holds, straight from the DOM. This is the block
    // to keep if you later swap the integration below for your own.
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))
    // Password is deliberately not logged in full — length only.
    console.log("[auth] sign-in data collected:", {
      email,
      passwordLength: password.length,
    })

    // ── Existing better-auth integration ────────────────────────────────
    // Comment this block out if you only want data collection for now.
    // `rememberMe: true` = persistent 7-day cookie (matches the session
    // config in lib/auth.ts). `callbackURL` must stay same-origin and is
    // the project's real route — "/dashboard", not "/app/dashboard".
    // The client auto-navigates there on success; router.replace below
    // is the explicit fallback (same pattern as the sign-up page).
    const { error: authError } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/dashboard",
    })

    if (authError) {
      setPending(false)
      setError(authError.message ?? "Invalid email or password.")
      return
    }

    router.replace("/dashboard")
  }

  return (
    <Card className="relative w-full max-w-[440px] rounded-3xl bg-[#151516] text-white ring-white/10 [--card-spacing:--spacing(8)]">
      <CardHeader className="items-center gap-3 px-6 text-center md:px-8">
        <p className="flex items-center justify-center gap-3">
          <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
          <span className="font-eyebrow text-sm text-white">Welcome back</span>
          <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
        </p>
        <CardTitle className="font-display text-2xl leading-9 font-semibold text-white md:text-[28px]">
          Log in to HireLoop
        </CardTitle>
        <CardDescription className="font-inter text-[15px] leading-6 text-white/60">
          Enter your credentials to pick up where you left off.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8 px-6 md:px-8">
        <AuthToggle />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="font-display text-sm font-semibold text-white"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={pending}
              className="h-12 rounded-xl border-white/15 bg-[#101010] px-4 font-inter text-white placeholder:text-white/40 focus-visible:border-[#5C53FE] focus-visible:ring-[#5C53FE]/25 md:text-[15px]"
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="font-display text-sm font-semibold text-white"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                disabled={pending}
                className="h-12 rounded-xl border-white/15 bg-[#101010] pr-12 font-inter text-white placeholder:text-white/40 focus-visible:border-[#5C53FE] focus-visible:ring-[#5C53FE]/25 md:text-[15px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition-colors hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="size-4" strokeWidth={1.5} />
                ) : (
                  <Eye className="size-4" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="font-inter text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="font-inter text-sm font-medium text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="h-12 w-full rounded-xl border-[#090A15]/10 bg-[#5C53FE] font-display text-base font-semibold text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4F45E8]"
          >
            {pending ? "Logging in…" : "Log in"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-0 bg-transparent p-0 px-6 pb-8 md:px-8">
        <p className="font-inter text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
