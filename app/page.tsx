import Link from "next/link"
import { Sparkles } from "lucide-react"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="min-h-svh p-6">
      <div className="mx-auto flex max-w-4xl flex-col">
        <main className="mx-auto flex max-w-2xl flex-col items-center gap-6 pt-16 text-center">
          <div className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3.5" />
            Currently in early access
          </div>

          <h1 className="max-w-xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            Find your next hire.
            <span className="block text-muted-foreground">
              Or your next job.
            </span>
          </h1>

          <p className="max-w-md text-sm leading-loose text-muted-foreground">
            HireLoop matches candidates with the teams that need them. No noisy
            boards, no endless swiping — just a loop that keeps moving.
          </p>

          {session ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm">
                Welcome back,{" "}
                <span className="font-medium">{session.user.name}</span>.
              </p>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/dashboard" />}
              >
                Go to dashboard
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/sign-up" />}
              >
                Create an account
              </Button>
              <Button
                variant="ghost"
                size="lg"
                nativeButton={false}
                render={<Link href="/sign-in" />}
              >
                Log in
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
