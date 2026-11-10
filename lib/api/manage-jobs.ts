"use server"

import { getDb } from "@/lib/mongodb"
export const getJobs = async () => {
  try {
    const db = getDb()
    const jobs = await db
      .collection("jobs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    // Serialize ObjectId for client component
    return jobs.map((job: any) => ({
      ...job,
      _id: job._id?.toString?.() ?? job._id,
      deadline: job.deadline ? new Date(job.deadline).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : job.deadline,
      createdAt: job.createdAt ? new Date(job.createdAt).toISOString() : undefined,
    }))
  } catch (error) {
    console.error("getJobs error:", error)
    throw new Error(error instanceof Error ? error.message : "Failed to fetch jobs")
  }
}

