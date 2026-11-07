"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { Eye, EyeOff } from "lucide-react"

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

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") ?? ""
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError(null)

    // ── Form data collection ────────────────────────────────────────────
    const formData = new FormData(event.currentTarget)
    const password = String(formData.get("password"))
    // Password is deliberately not logged in full — length only.
    console.log("[auth] reset-password data collected:", {
      passwordLength: password.length,
      hasToken: token.length > 0,
    })

    // ── Better Auth integration ─────────────────────────────────────────
    // Comment this block out if you only want data collection for now.
    const { error: authError } = await authClient.resetPassword({
      newPassword: password,
      token,
    })

    if (authError) {
      setPending(false)
      setError(
        authError.message ??
          "Could not reset your password. The link may have expired."
      )
      return
    }

    router.replace("/sign-in")
  }

  if (!token) {
    return (
      <p
        role="alert"
        className="font-inter text-[15px] leading-6 text-white/80"
      >
        This reset link is missing its token. Request a fresh one from the{" "}
        <Link
          href="/forgot-password"
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          forgot-password page
        </Link>
        .
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label
          htmlFor="password"
          className="font-display text-sm font-semibold text-white"
        >
          New password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
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
        <p className="font-inter text-xs text-white/40">
          Must be at least 8 characters.
        </p>
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
        {pending ? "Resetting…" : "Set new password"}
      </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
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
          Choose a new password
        </CardTitle>
        <CardDescription className="font-inter text-[15px] leading-6 text-white/60">
          Enter a new password for your account below.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8 px-6 md:px-8">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </CardContent>

      <CardFooter className="justify-center border-0 bg-transparent p-0 px-6 pb-8 md:px-8">
        <p className="font-inter text-sm text-white/60">
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
