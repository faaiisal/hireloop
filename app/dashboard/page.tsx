"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"

export default function DashboardRootPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (isPending) return
    const role = (session?.user as { role?: string } | undefined)?.role || "seeker"
    router.replace(`/dashboard/${role}`)
  }, [session, isPending, router])

  return (
    <div className="flex h-[60vh] items-center justify-center text-white/60">
      Redirecting to dashboard...
    </div>
  )
}
