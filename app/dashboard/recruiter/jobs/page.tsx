"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Code2,
  Palette,
  Server,
  Megaphone,
  Settings2,
  MapPin,
  Globe,
  Users,
  Pencil,
  Trash2,
  MoreVertical,
  Plus,
} from "lucide-react"
import { JobFormData } from "@/lib/actions/jobs"
import { getJobs } from "@/lib/api/manage-jobs"

type TableJob = JobFormData & {
  _id: string
  deptIcon: React.ElementType
  deptColor: string
  applicants: number
  status: "Active" | "Expired"
  postedAgo: string
  applicantsText?: string
}

// Real data on the backend will be fetched via mongodb 


export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<TableJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper: category -> icon/color like Figma
  const getCategoryMeta = (category: string) => {
    const c = category.toLowerCase()
    if (c.includes("engineer")) return { icon: Code2, color: "text-[#8B5CF6] bg-[#8B5CF6]/10" }
    if (c.includes("design")) return { icon: Palette, color: "text-orange-400 bg-orange-400/10" }
    if (c.includes("infra") || c.includes("devops")) return { icon: Server, color: "text-cyan-400 bg-cyan-400/10" }
    if (c.includes("market")) return { icon: Megaphone, color: "text-white/60 bg-white/5" }
    if (c.includes("quality") || c.includes("qa")) return { icon: Settings2, color: "text-white/40 bg-white/5" }
    return { icon: Code2, color: "text-[#8B5CF6] bg-[#8B5CF6]/10" }
  }

  const getPostedAgo = (createdAt?: string) => {
    if (!createdAt) return ""
    const diff = Date.now() - new Date(createdAt).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days <= 0) return "Posted today"
    if (days === 1) return "Posted 1d ago"
    if (days < 7) return `Posted ${days}d ago`
    if (days < 30) return `Posted ${Math.floor(days / 7)}w ago`
    return `Posted ${Math.floor(days / 30)}m ago`
  }

  // Fetch jobs from MongoDB via Server Action (direct, no CORS)
  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const data = await getJobs() // now uses getDb() directly
        if (cancelled) return

        const mapped: TableJob[] = (Array.isArray(data) ? data : []).map((j: any, i: number) => {
          const meta = getCategoryMeta(j.jobCategory || "")
          // Status: Expired if deadline passed, else Active
          let status: TableJob["status"] = "Active"
          if (j.status) {
            status = j.status === "Expired" ? "Expired" : "Active"
          } else if (j.deadline) {
            const dl = new Date(j.deadline)
            if (!isNaN(dl.getTime()) && dl < new Date()) status = "Expired"
          }

          return {
            ...j,
            _id: typeof j._id === "string" ? j._id : j._id?.toString?.() ?? `job-${i}`,
            deptIcon: meta.icon,
            deptColor: meta.color,
            applicants: typeof j.applicants === "number" ? j.applicants : 0,
            status,
            postedAgo: j.postedAgo || getPostedAgo(j.createdAt),
          }
        })

        setJobs(mapped)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to fetch jobs")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const list = jobs

  if (loading) {
    return <div className="min-h-screen bg-[#0A0A0A] p-8 text-white/60">Loading jobs…</div>
  }

  if (error) {
    return <div className="min-h-screen bg-[#0A0A0A] p-8 text-red-400">Failed to load jobs: {error}</div>
  }

  // Empty state when no real jobs in DB yet
  if (list.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="mb-6">
          <div className="mb-1 flex items-center gap-2 text-xs text-white/40">
            <span className="text-white/60">Manage Jobs</span>
            <span>›</span>
            <span className="text-[#8B83FF]">Job Listings & Postings</span>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold md:text-[28px]">Manage Job Posts</h1>
              <p className="mt-1 text-sm text-white/50">No jobs yet. Create your first listing.</p>
            </div>
            <Link href="/dashboard/recruiter/jobs/new">
              <Button className="h-10 w-full rounded-xl bg-[#5C53FE] text-sm font-medium hover:bg-[#4F45E8] md:w-auto">
                <Plus className="mr-1 size-4" /> New Job Post
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#111111] p-12 text-center">
          <p className="text-white/60">No job posts found in MongoDB collection `jobs`.</p>
          <p className="mt-2 text-sm text-white/30">Post a new job from the form, it will appear here instantly.</p>
          <Link href="/dashboard/recruiter/jobs/new" className="mt-6 inline-block">
            <Button className="bg-[#5C53FE] hover:bg-[#4F45E8]">Post a New Job</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2 text-xs text-white/40">
          <span className="text-white/60">Manage Jobs</span>
          <span>›</span>
          <span className="text-[#8B83FF]">Job Listings & Postings</span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold md:text-[28px]">Manage Job Posts</h1>
            <p className="mt-1 text-sm text-white/50">
              Review live listings, monitor applicants, and update job details across your organization.
            </p>
          </div>
          <Link href="/dashboard/recruiter/jobs/new">
            <Button className="h-10 w-full rounded-xl bg-[#5C53FE] text-sm font-medium hover:bg-[#4F45E8] md:w-auto">
              <Plus className="mr-1 size-4" /> New Job Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Table Container - Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111] md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0E0E0E] hover:bg-[#0E0E0E]">
              <TableRow className="border-white/[0.06] hover:bg-transparent">
                <TableHead className="whitespace-nowrap px-4 py-3 text-[11px] uppercase tracking-wide text-white/40">
                  Job Title & Dept
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-white/40">Company & Location</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-white/40">Type</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-white/40">Compensation</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-white/40">Applicants</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-white/40">Status</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-white/40">Deadline</TableHead>
                <TableHead className="text-right text-[11px] uppercase tracking-wide text-white/40">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((job) => (
                <TableRow key={job._id} className="border-white/[0.06] hover:bg-white/[0.03]">
                  {/* Job Title & Dept */}
                  <TableCell className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex size-8 items-center justify-center rounded-lg ${job.deptColor}`}>
                        <job.deptIcon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{job.jobTitle}</p>
                        <p className="text-xs text-[#5CABFF]">{job.jobCategory}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Company & Location */}
                  <TableCell className="px-4 py-4">
                    <p className="text-sm text-white">{job.companyName}</p>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-white/50">
                      {job.isRemote ? (
                        <Globe className="size-3.5" />
                      ) : (
                        <MapPin className="size-3.5" />
                      )}
                      <span>
                        {job.isRemote
                          ? `Remote (${job.location})`
                          : job.location.includes("Hybrid") || job.location.includes("(")
                            ? job.location
                            : `${job.location} (Hybrid)`}
                      </span>
                    </div>
                  </TableCell>

                  {/* Type */}
                  <TableCell className="px-4 py-4">
                    <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70">
                      {job.jobType}
                    </span>
                  </TableCell>

                  {/* Compensation */}
                  <TableCell className="px-4 py-4 text-sm text-white">
                    €{job.minSalary} – €{job.maxSalary} / {job.frequency}
                  </TableCell>

                  {/* Applicants */}
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users className="size-4 text-white/60" />
                      <span className="font-medium text-white">{job.applicants}</span>
                      <span className="text-[#8B83FF]">Candidates</span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                        job.status === "Active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          job.status === "Active" ? "bg-green-400" : "bg-white/30"
                        }`}
                      />
                      {job.status}
                    </span>
                  </TableCell>

                  {/* Deadline */}
                  <TableCell className="px-4 py-4">
                    <p className="text-sm text-white">{job.deadline}</p>
                    <p className="text-xs text-white/40">{job.postedAgo}</p>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        className="h-7 rounded-lg bg-[#2A2550] text-xs text-[#A9A6FF] hover:bg-[#343060]"
                      >
                        <Pencil className="mr-1 size-3.5" /> Update
                      </Button>
                      <button className="flex size-7 items-center justify-center rounded-lg bg-white/[0.06] text-white/50 hover:bg-white/10">
                        <Trash2 className="size-4" />
                      </button>
                      <button className="flex size-7 items-center justify-center rounded-lg text-white/40 hover:text-white/70">
                        <MoreVertical className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {list.map((job) => (
          <div key={job._id} className="rounded-2xl border border-white/[0.06] bg-[#111111] p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className={`flex size-9 items-center justify-center rounded-xl ${job.deptColor}`}>
                  <job.deptIcon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{job.jobTitle}</p>
                  <p className="text-xs text-[#5CABFF]">{job.jobCategory}</p>
                  <p className="mt-1 text-xs text-white/60">{job.companyName}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-white/40">
                    <MapPin className="size-3" /> {job.location}
                  </div>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] ${
                  job.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-white/5 text-white/40"
                }`}
              >
                {job.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-white/30">Type</p>
                <p className="mt-1 inline-block rounded-full bg-white/[0.06] px-2 py-0.5 text-white/70">{job.jobType}</p>
              </div>
              <div>
                <p className="text-white/30">Compensation</p>
                <p className="mt-1 text-white">€{job.minSalary} – €{job.maxSalary} / {job.frequency}</p>
              </div>
              <div>
                <p className="text-white/30">Applicants</p>
                <p className="mt-1 flex items-center gap-1 text-white">
                  <Users className="size-3" /> {job.applicants} Candidates
                </p>
              </div>
              <div>
                <p className="text-white/30">Deadline</p>
                <p className="mt-1 text-white">{job.deadline}</p>
                <p className="text-[11px] text-white/40">{job.postedAgo}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1 rounded-xl bg-[#2A2550] text-[#A9A6FF] hover:bg-[#343060]">
                <Pencil className="mr-1 size-4" /> Update
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl border-white/10 bg-white/5">
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
