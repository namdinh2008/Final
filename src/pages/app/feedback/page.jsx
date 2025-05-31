"use client";

import { useState } from "react";
import { Star, CheckCircle } from "lucide-react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ rating, feedback });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card text-center shadow-lg border-0 rounded-lg">
              <div className="card-body p-5">
                <CheckCircle
                  className="text-success mx-auto mb-4"
                  style={{ width: "6rem", height: "6rem" }}
                />
                <h2 className="card-title fw-bold mb-3">
                  Thank You for Your Feedback!
                </h2>
                <p className="card-text text-muted mb-4">
                  We appreciate you taking the time to share your thoughts with
                  us. Your feedback helps us improve JobHive.
                </p>
                <button
                  type="button" // Important for buttons not inside a form
                  className="btn btn-success btn-lg"
                  onClick={() => {
                    setIsSubmitted(false);
                    setRating(0);
                    setFeedback("");
                  }}
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-success text-white text-center p-4 rounded-top-lg">
              <h4 className="card-title mb-0 fw-bold">
                We Value Your Feedback
              </h4>
              <p className="card-text opacity-75">
                Please share your thoughts about JobHive to help us improve our
                service.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body p-4">
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="form-label d-block text-center fw-semibold mb-3"
                  >
                    How would you rate your experience?
                  </label>
                  <div className="d-flex justify-content-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="btn btn-link p-1 text-decoration-none" // Use btn-link for star-like button
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`
                            ${
                              star <= (hoveredRating || rating)
                                ? "text-warning"
                                : "text-secondary"
                            }
                            `}
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            fill:
                              star <= (hoveredRating || rating)
                                ? "currentColor"
                                : "none",
                          }} // Fill for selected stars
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="feedback" className="form-label fw-semibold">
                    What could we improve?
                  </label>
                  <textarea
                    className="form-control"
                    id="feedback"
                    placeholder="Share your thoughts..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>
              </div>
              <div className="card-footer bg-light border-0 p-4 rounded-bottom-lg">
                <button
                  type="submit"
                  className="btn btn-success w-100 btn-lg"
                  disabled={rating === 0}
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
