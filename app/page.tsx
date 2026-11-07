import { Features } from "@/components/home/features"
import { Hero } from "@/components/home/hero"
import { Jobs } from "@/components/home/jobs"
import { Pricing } from "@/components/home/pricing"

export default function HomePage() {
  return (
    <main className="min-h-svh bg-[#010103]">
      <Hero />
      <Jobs />
      <Features />
      <Pricing />
    </main>
  )
}
