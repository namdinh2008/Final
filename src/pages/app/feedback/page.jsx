"use client"

import { useState } from "react"
import { Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ rating, feedback })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="container py-4">
        <div className="card text-center">
          <div className="card-body">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h1 className="card-title">Thank You for Your Feedback!</h1>
            <p className="card-text text-muted">
              We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve JobHive.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setRating(0)
                setFeedback("")
              }}
            >
              Submit Another Response
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>We Value Your Feedback</CardTitle>
          <CardDescription>Please share your thoughts about JobHive to help us improve our service.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">How would you rate your experience?</label>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium">
                What could we improve?
              </label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={rating === 0}>
              Submit Feedback
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
