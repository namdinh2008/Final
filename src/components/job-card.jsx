import { Card, Badge, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Bookmark } from "lucide-react";

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
    <Card className="shadow-sm mb-4 border-0 p-0">
      <Card.Body>
        <Row className="align-items-start">
          {/* Logo & Company */}
          <Col xs="auto">
            <div className="rounded bg-light d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              <img
                src={job.companyLogo || "/placeholder.svg?height=48&width=48"}
                alt={job.company}
                className="img-fluid"
                style={{ maxHeight: 48, objectFit: "contain" }}
              />
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="mb-1 fw-semibold">
                  <Link to={`/jobs/${job.id}`} className="text-decoration-none text-dark">
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
                  className={isSaved ? "text-primary" : "text-muted"}
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
                  <strong>Salary:</strong> {job.salary}
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
      <Card.Footer className="bg-light text-muted d-flex justify-content-between align-items-center small">
        <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
        <Link to={`/jobs/${job.id}`}>
          <Button size="sm" variant="primary">
            Apply Now
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  )
}
