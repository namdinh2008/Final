import React, { useState } from "react";
import { Card, Badge, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import "../styles/job-card.css";

export default function JobCard({ job, onSave, isSaved }) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });

  const experienceLevelMap = {
    entry: "Entry Level",
    mid: "Mid Level",
    senior: "Senior Level",
  };

  const jobTypeMap = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    internship: "Internship",
    contract: "Contract",
  };

  const locationTypeMap = {
    remote: "Remote",
    onsite: "Onsite",
    hybrid: "Hybrid",
  };

  const handleApply = (e) => {
    e.preventDefault();
    setIsApplyModalOpen(false);
    alert("Application submitted!");
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const removeFocus = {
    boxShadow: "none",
    outline: "none",
    border: "1px solid #ced4da",
  };

  return (
    <div className="job-card">
      <Card className="shadow-sm mb-4 border-0 p-0">
        <Card.Body>
          <Row className="align-items-start">
            {/* Logo & Company */}
            <Col xs="auto">
              <Link to={`/jobs/${job.id}`}>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ width: 60, height: 60 }}
                >
                  <img
                    src={
                      job.companyLogo || "/placeholder.svg?height=48&width=48"
                    }
                    alt={job.company}
                    className="rounded bg-light"
                    style={{ maxHeight: 48, objectFit: "contain" }}
                  />
                </div>
              </Link>
            </Col>
            <Col>
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="mb-1 fw-semibold">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-decoration-none text-dark hover-link"
                    >
                      {job.title}
                    </Link>
                  </h5>
                  <div className="text-muted small">{job.company}</div>
                </div>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => onSave(job.id)}
                  title={isSaved ? "Remove from saved jobs" : "Save job"}
                >
                  <Bookmark
                    size={18}
                    className={isSaved ? "text-success" : "text-muted"}
                    fill={isSaved ? "currentColor" : "none"}
                  />
                </Button>
              </div>

              {/* Job Info */}
              <div className="mt-3">
                <div className="text-muted small mb-1">
                  <strong>Location:</strong> {job.location}
                </div>
                {job.salary && (
                  <div className="text-muted small mb-1">
                    <strong>Salary:</strong>{" "}
                    {job.salary.from && job.salary.to
                      ? `$${job.salary.from.toLocaleString()} - $${job.salary.to.toLocaleString()}`
                      : ""}
                  </div>
                )}
                {job.workMode &&
                  Array.isArray(job.workMode) &&
                  job.workMode.length > 0 && (
                    <div className="text-muted small mb-1">
                      <strong>Work Mode:</strong> {job.workMode.join(", ")}
                    </div>
                  )}
              </div>

              {/* Badges */}
              <div className="mt-2 d-flex flex-wrap gap-2">
                <Badge bg="secondary" className="fw-normal">
                  {experienceLevelMap[job.experienceLevel]}
                </Badge>
                <Badge bg="info" className="fw-normal text-white">
                  {jobTypeMap[job.jobType]}
                </Badge>
                <Badge bg="success" className="fw-normal border">
                  {locationTypeMap[job.locationType]}
                </Badge>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-body-secondary text-muted d-flex justify-content-between align-items-center small">
          <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
          <Button
            size="sm"
            variant="success"
            onClick={() => setIsApplyModalOpen(true)}
          >
            Apply Now
          </Button>
        </Card.Footer>
      </Card>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div
          className="modal-backdrop show"
          style={{ backgroundColor: "rgb(0, 0, 0)" }}
          onClick={() => setIsApplyModalOpen(false)}
        ></div>
      )}

      {isApplyModalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setIsApplyModalOpen(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "500px", margin: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <form onSubmit={handleApply}>
                <div className="modal-header">
                  <h5 className="modal-title">Apply for {job.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsApplyModalOpen(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row row-cols-2 gy-2 mb-3">
                    <div>
                      <strong className="text-success">Company:</strong>{" "}
                      {job.company}
                    </div>
                    {job.salary && job.salary.from && job.salary.to && (
                      <div>
                        <strong className="text-success">Salary:</strong> $
                        {job.salary.from.toLocaleString()} - $
                        {job.salary.to.toLocaleString()}
                      </div>
                    )}
                    <div>
                      <strong className="text-success">Location:</strong>{" "}
                      {job.location || ""}
                    </div>
                    <div>
                      <strong className="text-success">Job Type:</strong>{" "}
                      {Array.isArray(job.jobType) ? job.jobType.join(", ") : ""}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter your full name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      style={removeFocus}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      style={removeFocus}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="resume" className="form-label">
                      Resume (Optional)
                    </label>
                    <input
                      type="file"
                      id="resume"
                      className="form-control"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={removeFocus}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="coverLetter" className="form-label">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      className="form-control"
                      rows="4"
                      required
                      value={formData.coverLetter}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coverLetter: e.target.value,
                        })
                      }
                      style={removeFocus}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setIsApplyModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
