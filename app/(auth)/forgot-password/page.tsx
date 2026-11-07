"use client"

import { useState } from "react"
import Link from "next/link"

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

export default function ForgotPasswordPage() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError(null)

    // ── Form data collection ────────────────────────────────────────────
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email"))
    // Email only — no secrets involved here.
    console.log("[auth] forgot-password data collected:", { email })

    // ── Better Auth integration (dev stub: link lands in server console) ─
    // Comment this block out if you only want data collection for now.
    const { error: authError } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    })

    if (authError) {
      setPending(false)
      setError(authError.message ?? "Could not send the reset link.")
      return
    }

    setPending(false)
    setSent(true)
  }

  return (
    <Card className="relative w-full max-w-[440px] rounded-3xl bg-[#151516] text-white ring-white/10 [--card-spacing:--spacing(8)]">
      <CardHeader className="items-center gap-3 px-6 text-center md:px-8">
        <p className="flex items-center justify-center gap-3">
          <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
          <span className="font-eyebrow text-sm text-white">
            Password reset
          </span>
          <span aria-hidden className="size-2 shrink-0 bg-[#5C53FE]" />
        </p>
        <CardTitle className="font-display text-2xl leading-9 font-semibold text-white md:text-[28px]">
          Forgot your password?
        </CardTitle>
        <CardDescription className="font-inter text-[15px] leading-6 text-white/60">
          Enter your account email and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8 px-6 md:px-8">
        {sent ? (
          <p
            role="status"
            className="font-inter text-[15px] leading-6 text-white/80"
          >
            If an account exists for that email, a reset link is on its way.
            Check your inbox — and your spam folder, just in case.
          </p>
        ) : (
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

            {error && (
              <p role="alert" className="font-inter text-sm text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="h-12 w-full rounded-xl border-[#090A15]/10 bg-[#5C53FE] font-display text-base font-semibold text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4F45E8]"
            >
              {pending ? "Sending link…" : "Send reset link"}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="justify-center border-0 bg-transparent p-0 px-6 pb-8 md:px-8">
        <p className="font-inter text-sm text-white/60">
          Remembered it?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            Back to log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
