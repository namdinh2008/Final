"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import JobCard from "@/components/job-card"
import { mockJobs } from "@/lib/data"

export default function SavedJobsPage() {
  const navigate = useNavigate()
  const [savedJobs, setSavedJobs] = useState([])
  const [savedJobsData, setSavedJobsData] = useState(mockJobs.filter((job) => savedJobs.includes(job.id)))

  useEffect(() => {

    const savedJobsFromStorage = localStorage.getItem("savedJobs")
    if (savedJobsFromStorage) {
      const parsedSavedJobs = JSON.parse(savedJobsFromStorage)
      setSavedJobs(parsedSavedJobs)
      setSavedJobsData(mockJobs.filter((job) => parsedSavedJobs.includes(job.id)))
    }
  }, [])

  const toggleSaveJob = (jobId) => {
    const updatedSavedJobs = savedJobs.filter((id) => id !== jobId)
    setSavedJobs(updatedSavedJobs)
    setSavedJobsData(mockJobs.filter((job) => updatedSavedJobs.includes(job.id)))
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs))
  }

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
          <p className="text-muted-foreground">View and manage the jobs you've saved for later.</p>
        </div>

        {savedJobsData.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedJobsData.map((job) => (
              <JobCard key={job.id} job={job} onSave={toggleSaveJob} isSaved={true} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No saved jobs yet</h3>
            <p className="text-muted-foreground mt-1 mb-6">
              When you find a job you like, click the bookmark icon to save it for later.
            </p>
            <Button onClick={() => navigate("/")}>Browse Jobs</Button>
          </div>
        )}
      </div>
    </div>
  )
}
