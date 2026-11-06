import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/sign-in")
  }

  const { user } = session

  return (
    <div className="min-h-svh p-6">
      <div className="mx-auto flex max-w-4xl flex-col pt-6">
        <main className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">
              Welcome to the Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              You&apos;re logged in. The rest of HireLoop is coming soon.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div className="grid gap-1 py-2">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Separator />
              <div className="grid gap-1 py-2">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <Separator />
              <div className="grid gap-1 py-2">
                <span className="text-sm text-muted-foreground">
                  Email verified
                </span>
                <span className="text-sm font-medium">
                  {user.emailVerified ? "Yes" : "Not yet"}
                </span>
              </div>
              <Separator />
              <div className="grid gap-1 py-2">
                <span className="text-sm text-muted-foreground">User ID</span>
                <span className="font-mono text-xs">{user.id}</span>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            Sessions are managed by better-auth. You are signed out
            automatically after 7 days of inactivity.
          </p>
        </main>
      </div>
    </div>
  )
}
