"use client"

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Building,
  Bookmark,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getJobById } from "@/lib/data"

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useNavigate()
  const [job, setJob] = useState(getJobById(id))
  const [savedJobs, setSavedJobs] = useState([])
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  })

  useEffect(() => {
    const savedJobsFromStorage = localStorage.getItem("savedJobs")
    if (savedJobsFromStorage) {
      setSavedJobs(JSON.parse(savedJobsFromStorage))
    }
  }, [])

  if (!job) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Job not found</h1>
        <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
      </div>
    )
  }

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

  const toggleSaveJob = () => {
    let updatedSavedJobs

    if (savedJobs.includes(job.id)) {
      updatedSavedJobs = savedJobs.filter((id) => id !== job.id)
    } else {
      updatedSavedJobs = [...savedJobs, job.id]
    }

    setSavedJobs(updatedSavedJobs)
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs))
  }

  const handleApply = (e) => {
    e.preventDefault()
    setIsApplyModalOpen(false)
    setIsConfirmationModalOpen(true)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      })
    }
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={job.companyLogo || "/placeholder.svg?height=64&width=64"}
                      alt={job.company}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <p className="text-lg text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSaveJob}
                  aria-label={savedJobs.includes(job.id) ? "Remove from saved jobs" : "Save job"}
                >
                  <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? "fill-primary" : ""}`} />
                </Button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>{jobTypeMap[job.jobType]}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>{job.salary}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>{locationTypeMap[job.locationType]}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{experienceLevelMap[job.experienceLevel]}</Badge>
                <Badge variant="secondary">{jobTypeMap[job.jobType]}</Badge>
                <Badge variant="secondary">{locationTypeMap[job.locationType]}</Badge>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Qualifications</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {job.qualifications.map((qualification, index) => (
                      <li key={index}>{qualification}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index}>{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Perks & Benefits</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {job.perks.map((perk, index) => (
                      <li key={index}>{perk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
              <p className="text-muted-foreground mb-6">{job.companyDescription}</p>
              <Button className="w-full" onClick={() => setIsApplyModalOpen(true)}>
                Apply Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Job Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job ID</span>
                  <span className="font-medium">{job.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium">{experienceLevelMap[job.experienceLevel]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job Type</span>
                  <span className="font-medium">{jobTypeMap[job.jobType]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location Type</span>
                  <span className="font-medium">{locationTypeMap[job.locationType]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted Date</span>
                  <span className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deadline</span>
                  <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Apply Modal */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>Fill out the form below to apply for this position at {job.company}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApply}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resume">Resume (Optional)</Label>
                <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  rows={5}
                  required
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsApplyModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Application Submitted</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-medium">Thank you for your application!</h3>
            <p className="text-muted-foreground mt-2">
              Your application for {job.title} at {job.company} has been submitted successfully.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsConfirmationModalOpen(false)
                router.push("/")
              }}
            >
              Back to Jobs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
