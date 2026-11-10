"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Building2,
  MapPin,
  Calendar,
  Euro,
  ArrowRight,
  Briefcase,
} from "lucide-react"

type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

type FormData = {
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  keyResponsibilities: string
  qualifications: string
}

const jobCategories = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Product",
  "Sales",
  "Customer Support",
  "Finance",
  "HR",
]

const frequencies = ["per hour", "per day", "per month", "per year"]

export default function AddNewJobsPage() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "Frontend Developer",
    companyName: "HirePulse Network",
    jobCategory: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: true,
    location: "New York, USA",
    deadline: "2025-05-30",
    minSalary: "25",
    maxSalary: "40",
    frequency: "per hour",
    keyResponsibilities:
      "Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products.",
    qualifications:
      "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers",
  })

  const update = (key: keyof FormData, value: string | boolean | JobType) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Easy collection - no complicated validation, just log
    console.log("Publish Job Data:", formData)
    alert(`Job Published:\n${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="mb-6 border-b border-white/[0.06] pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs text-white/40">
              <Link href="/dashboard/recruiter/jobs" className="hover:text-white/70">
                Manage Jobs
              </Link>
              <span>›</span>
              <span className="text-[#5C53FE]">Create New Listing</span>
            </div>
            <h1 className="font-display text-2xl font-semibold md:text-[28px]">Post a New Job</h1>
            <p className="mt-1 max-w-[560px] text-sm text-white/50">
              Fill in the position specifications to attract qualified talent across our network.
            </p>
          </div>
          <Button
            onClick={handleSubmit as unknown as () => void}
            className="h-10 w-full shrink-0 rounded-xl bg-[#5C53FE] px-6 text-sm font-medium text-white hover:bg-[#4F45E8] md:w-auto"
          >
            Publish Job <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Basic Information */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/80">
            <span className="size-1.5 rounded-full bg-[#5C53FE]" />
            1. Basic Information
          </h2>

          <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-[#111111] p-4 md:p-6">
            <div>
              <Label className="mb-1.5 flex gap-1 text-xs text-white/60">
                Job Title <span className="text-[#5C53FE]">*</span>
              </Label>
              <Input
                value={formData.jobTitle}
                onChange={(e) => update("jobTitle", e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="h-11 rounded-xl border-white/10 bg-[#1A1A1B] text-sm text-white placeholder:text-white/30"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="mb-1.5 flex gap-1 text-xs text-white/60">
                  Company Name <span className="text-[#5C53FE]">*</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    value={formData.companyName}
                    onChange={(e) => update("companyName", e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-[#1A1A1B] pl-10 text-sm text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="mb-1.5 flex gap-1 text-xs text-white/60">
                  Job Category <span className="text-[#5C53FE]">*</span>
                </Label>
                <select
                  value={formData.jobCategory}
                  onChange={(e) => update("jobCategory", e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#1A1A1B] px-3 text-sm text-white focus:border-[#5C53FE] focus:outline-none"
                >
                  {jobCategories.map((c) => (
                    <option key={c} value={c} className="bg-[#1A1A1B]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label className="mb-2 flex gap-1 text-xs text-white/60">
                Job Type <span className="text-[#5C53FE]">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {(["Full-time", "Part-time", "Contract", "Internship"] as JobType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => update("jobType", type)}
                    className={`h-10 rounded-xl border text-sm transition ${
                      formData.jobType === type
                        ? "border-[#5C53FE] bg-[#1E1B3A] text-white"
                        : "border-white/10 bg-[#1A1A1B] text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Location, Compensation & Timeline */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/80">
            <span className="size-1.5 rounded-full bg-[#5C53FE]" />
            2. Location, Compensation & Timeline
          </h2>

          <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-[#111111] p-4 md:p-6">
            {/* Remote toggle card */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1A1A1B] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-white/[0.06]">
                  <Briefcase className="size-4 text-white/60" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Remote Work Allowed (isRemote)</p>
                  <p className="text-xs text-white/40">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>
              <Switch
                checked={formData.isRemote}
                onCheckedChange={(v) => update("isRemote", v)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="mb-1.5 flex justify-between text-xs text-white/60">
                  <span className="flex gap-1">
                    Job location (location) <span className="text-[#5C53FE]">*</span>
                  </span>
                  <span className="text-[10px] text-white/30">Required</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    value={formData.location}
                    onChange={(e) => update("location", e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-[#1A1A1B] pl-10 text-sm text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="mb-1.5 text-xs text-white/60">
                  Application Deadline (deadline)
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => update("deadline", e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-[#1A1A1B] pl-10 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label className="mb-1.5 text-xs text-white/60">Min Salary / Rate</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    value={formData.minSalary}
                    onChange={(e) => update("minSalary", e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-[#1A1A1B] pl-10 text-sm text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-1.5 text-xs text-white/60">Max Salary / Rate</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    value={formData.maxSalary}
                    onChange={(e) => update("maxSalary", e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-[#1A1A1B] pl-10 text-sm text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-1.5 text-xs text-white/60">Frequency</Label>
                <select
                  value={formData.frequency}
                  onChange={(e) => update("frequency", e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#1A1A1B] px-3 text-sm text-white focus:border-[#5C53FE] focus:outline-none"
                >
                  {frequencies.map((f) => (
                    <option key={f} value={f} className="bg-[#1A1A1B]">
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Responsibilities & Requirements */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/80">
            <span className="size-1.5 rounded-full bg-[#5C53FE]" />
            3. Responsibilities & Requirements
          </h2>

          <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-[#111111] p-4 md:p-6">
            <div>
              <Label className="mb-1.5 flex gap-1 text-xs text-white/60">
                Key Responsibilities <span className="text-[#5C53FE]">*</span>
              </Label>
              <textarea
                value={formData.keyResponsibilities}
                onChange={(e) => update("keyResponsibilities", e.target.value)}
                rows={4}
                className="min-h-[100px] w-full rounded-xl border border-white/10 bg-[#1A1A1B] p-3 text-sm text-white placeholder:text-white/30 focus:border-[#5C53FE] focus:outline-none"
                placeholder="Describe the role..."
                required
              />
            </div>

            <div>
              <Label className="mb-1.5 flex gap-1 text-xs text-white/60">
                Qualifications & Requirements <span className="text-[#5C53FE]">*</span>
              </Label>
              <textarea
                value={formData.qualifications}
                onChange={(e) => update("qualifications", e.target.value)}
                rows={5}
                className="min-h-[120px] w-full rounded-xl border border-white/10 bg-[#1A1A1B] p-3 text-sm text-white placeholder:text-white/30 focus:border-[#5C53FE] focus:outline-none"
                placeholder="• 3+ years experience..."
                required
              />
            </div>
          </div>
        </section>

        {/* Mobile publish sticky */}
        <div className="sticky bottom-0 -mx-4 border-t border-white/[0.06] bg-[#0A0A0A]/80 p-4 backdrop-blur md:hidden">
          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#5C53FE] text-sm font-medium text-white hover:bg-[#4F45E8]"
          >
            Publish Job <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        {/* Debug easy view */}
        <div className="hidden md:block">
          <Button type="submit" className="h-11 rounded-xl bg-[#5C53FE] px-8 text-sm hover:bg-[#4F45E8]">
            Publish Job <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
