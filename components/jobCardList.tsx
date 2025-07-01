"use client"

import { useEffect, useState } from "react"
import { JobCardItem } from "./job-card-item"
import type { JobCard } from "types/job-card"

export function JobCardList() {
  const [jobCards, setJobCards] = useState<JobCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobCards = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/job-cards")
        const rawData = await res.json()

        // Transform snake_case to camelCase
        const transformed: JobCard[] = rawData.map((job: any) => ({
          mawbNumber: job.mawb_number,
          createdDate: new Date(job.created_date),
          defraRequired: job.defra_required,
          status: job.status,
        }))

        setJobCards(transformed)
      } catch (err) {
        console.error("Failed to fetch job cards", err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobCards()
  }, [])

  if (loading) return <p>Loading job cards...</p>
  if (jobCards.length === 0) return <p>No job cards found.</p>

  return (
    <div className="space-y-4">
      {jobCards.map((card) => (
        <JobCardItem key={card.mawbNumber} jobCard={card} />
      ))}
    </div>
  )
}
