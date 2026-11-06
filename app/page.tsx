import { Hero } from "@/components/home/hero"
import { Jobs } from "@/components/home/jobs"

export default function HomePage() {
  return (
    <main className="min-h-svh bg-[#010103]">
      <Hero />
      <Jobs />
    </main>
  )
}
