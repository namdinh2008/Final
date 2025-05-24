"use client"

import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

export default function JobCard({ job, onSave, isSaved }) {
  const experienceLevelMap = {
    entry: "Entry Level",
    mid: "Mid Level",
    senior: "Senior Level",
  }

  const jobTypeMap = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    internship: "Internship",
    contract: "Contract",
  }

  const locationTypeMap = {
    remote: "Remote",
    onsite: "Onsite",
    hybrid: "Hybrid",
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                <img
                  src={job.companyLogo || "/placeholder.svg?height=48&width=48"}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  <Link to={`/jobs/${job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSave(job.id)}
              aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-primary" : ""}`} />
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">ID:</span>
              <span className="ml-2">{job.id}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">Location:</span>
              <span className="ml-2">{job.location}</span>
            </div>
            {job.salary && (
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground">Salary:</span>
                <span className="ml-2">{job.salary}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline">{experienceLevelMap[job.experienceLevel]}</Badge>
              <Badge variant="outline">{jobTypeMap[job.jobType]}</Badge>
              <Badge variant="outline">{locationTypeMap[job.locationType]}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-muted-foreground">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
          <Link to={`/jobs/${job.id}`}>
            <Button size="sm">Apply Now</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
