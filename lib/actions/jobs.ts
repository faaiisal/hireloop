"use server"

import { getDb } from "@/lib/mongodb"

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type JobFormData = {
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

// Option A: Direct MongoDB insert (recommended, no CORS, uses existing Next.js DB connection)
// This fixes the root cause: external Express server on :8000 was blocked by CORS + missing express.json()
export async function createJob(data: JobFormData) {
  try {
    const db = getDb()
    const jobsCollection = db.collection("jobs")

    const doc = {
      ...data,
      // Normalize for DB
      minSalary: data.minSalary ? Number(data.minSalary) : null,
      maxSalary: data.maxSalary ? Number(data.maxSalary) : null,
      deadline: data.deadline ? new Date(data.deadline) : null,
      createdAt: new Date(),
      status: "active",
    }

    const result = await jobsCollection.insertOne(doc)

    return {
      success: true,
      insertedId: result.insertedId.toString(),
      acknowledged: result.acknowledged,
    }
  } catch (error) {
    console.error("createJob error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create job",
    }
  }
}

// Option B: If you still want to use external Express server on :8000, use this version
// IMPORTANT: That server must have cors() and express.json() middleware (see fixed indes.ts below)
// Uncomment to use external API instead of direct DB:

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// export const createJobExternal = async (data: JobFormData) => {
//   const response = await fetch(`${BASE_URL}/jobs`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//   if (!response.ok) {
//     const err = await response.text()
//     throw new Error(`Server error ${response.status}: ${err}`)
//   }
//   return response.json()
// }
