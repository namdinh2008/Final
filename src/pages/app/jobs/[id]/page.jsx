import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, getSimilarJobs } from "@/lib/data";
import { Bookmark } from "lucide-react";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useNavigate();
  const [job, setJob] = useState(() => getJobById(id));
  const [savedJobs, setSavedJobs] = useState([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });
  const [similarJobs, setSimilarJobs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setJob(getJobById(id));
  }, [id]);

  useEffect(() => {
    const savedJobsFromStorage = localStorage.getItem("savedJobs");
    if (savedJobsFromStorage) {
      setSavedJobs(JSON.parse(savedJobsFromStorage));
    }
  }, []);

  useEffect(() => {
    if (job) {
      const fetchedSimilarJobs = getSimilarJobs(job.category[0], job.id);
      setSimilarJobs(fetchedSimilarJobs.slice(0, 3));
    }
  }, [job]);

  useEffect(() => {
    const carouselElement = document.getElementById("photoCarousel");
    if (carouselElement) {
      carouselElement.addEventListener("slid.bs.carousel", (event) => {
        setActiveIndex(event.to);
      });
    }
  }, []);

  if (!job || typeof job !== "object") {
    return (
      <div className="container py-5 text-center">
        <h1 className="display-5 fw-bold">Job not found</h1>
        <p className="text-muted mb-4">
          The job you're looking for doesn't exist or has been removed.
        </p>
        <button className="btn btn-success" onClick={() => router("/")}>
          Back to Jobs
        </button>
      </div>
    );
  }

  const toggleSaveJob = () => {
    const updated = savedJobs.includes(job.id)
      ? savedJobs.filter((jid) => jid !== job.id)
      : [...savedJobs, job.id];
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
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

  const cardStyle = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const removeFocus = {
    boxShadow: "none",
    outline: "none",
    border: "1px solid #ced4da",
  };

  return (
    <div className="container py-5">
      <button className="btn btn-success mb-4" onClick={() => router("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FFFFFF"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>{" "}
        Back to Jobs
      </button>

      <div className="row g-4">
        {/* Job Detail Card */}
        <div className="col-lg-8">
          <div className="card shadow-sm p-0">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex gap-3">
                  <img
                    src={job.companyLogo || "/placeholder.svg"}
                    alt={job.company}
                    className="rounded bg-light"
                    width="64"
                    height="64"
                  />
                  <div>
                    <h2 className="card-title mb-1">{job.title}</h2>
                    <h5 className="text-muted">{job.company}</h5>
                  </div>
                </div>
                <button
                  className={`btn btn-sm border-0 ${savedJobs.includes(
                    job.id
                  )}`}
                  onClick={toggleSaveJob}
                >
                  {savedJobs.includes(job.id) ? (
                    <Bookmark className="text-success" fill="currentColor" />
                  ) : (
                    <Bookmark className="text-muted" fill="none" />
                  )}
                </button>
              </div>

              <div className="row row-cols-2 gy-2 mb-3">
                <div>
                  <strong>Location:</strong> {job.location || ""}
                </div>
                <div>
                  <strong>Job Type:</strong>{" "}
                  {Array.isArray(job.jobType) ? job.jobType.join(", ") : ""}
                </div>
                <div>
                  <strong>Posted:</strong>{" "}
                  {job.postedDate
                    ? new Date(job.postedDate).toLocaleDateString()
                    : ""}
                </div>
                <div>
                  <strong>Deadline:</strong>{" "}
                  {job.deadline
                    ? new Date(job.deadline).toLocaleDateString()
                    : ""}
                </div>
                {job.salary && job.salary.from && job.salary.to && (
                  <div>
                    <strong>Salary:</strong> ${job.salary.from.toLocaleString()}{" "}
                    - ${job.salary.to.toLocaleString()}
                  </div>
                )}
                <div>
                  <strong>Work Setup:</strong>{" "}
                  {Array.isArray(job.locationType)
                    ? job.locationType.join(", ")
                    : ""}
                </div>
              </div>

              <hr />

              <h5 className="mt-4">Job Description</h5>
              <p className="text-muted">{job.description}</p>

              <h5 className="mt-4">Qualifications</h5>
              <ul className="text-muted">
                {Array.isArray(job.qualifications) &&
                  job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
              </ul>

              <h5 className="mt-4">Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                {Array.isArray(job.skills) &&
                  job.skills.map((s, i) => (
                    <span key={i} className="badge bg-dark">
                      {s}
                    </span>
                  ))}
              </div>

              <h5 className="mt-4">Perks & Benefits</h5>
              <ul className="text-muted">
                {Array.isArray(job.perks) &&
                  job.perks.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>

          <div className="card shadow-sm p-4 mt-4" style={cardStyle}>
            <div className="d-flex align-items-center mb-3">
              <h5 className="mb-0 fw-bold">Safe Job Search Tips</h5>
            </div>

            <p className="text-muted mb-3">
              Below are signs of non-transparent recruitment organizations and
              individuals:
            </p>

            <div className="text-success fw-semibold mb-2">
              1. Popular signs:
            </div>

            <div
              id="photoCarousel"
              className="carousel slide rounded-4"
              data-bs-ride="carousel"
              style={{ margin: "auto" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/report/1.png"
                    className="d-block mx-auto"
                    style={{ width: "250px" }}
                    alt="Image 1"
                  />
                  <p className="text-center text-muted my-4">
                    Request to sign unclear documents or submit original
                    documents
                  </p>
                </div>

                <div className="carousel-item">
                  <img
                    src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/report/2.png"
                    className="d-block mx-auto"
                    style={{ width: "250px" }}
                    alt="Image 2"
                  />
                  <p className="text-center text-muted my-4">
                    Promises "easy work, high salary", no need to put in much
                    effort, easy to get "huge" money
                  </p>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/report/3.png"
                    className="d-block mx-auto"
                    alt="Image 3"
                    style={{ width: "250px" }}
                  />
                  <p className="text-center text-muted my-4">
                    Requires app download, top up, and task completion
                  </p>
                </div>
              </div>

              {/* Indicators as modern buttons */}
              <div className="d-flex justify-content-center gap-2 mt-3">
                {[...Array(3)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    data-bs-target="#photoCarousel"
                    data-bs-slide-to={i}
                    className={`btn btn-success btn-sm rounded-circle p-1 ${
                      i === activeIndex ? "opacity-100 fw-bold" : "opacity-50"
                    }`}
                    aria-current={i === activeIndex ? "true" : undefined}
                    aria-label={`Slide ${i + 1}`}
                  ></button>
                ))}
              </div>

              {/* Prev/Next buttons */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#photoCarousel"
                data-bs-slide="prev"
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "-100px",
                  zIndex: "10",
                }}
              >
                <span
                  className="carousel-control-prev-icon bg-dark rounded-circle p-2"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#photoCarousel"
                data-bs-slide="next"
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "-100px",
                  zIndex: "10",
                }}
              >
                <span
                  className="carousel-control-next-icon bg-dark rounded-circle p-2"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="fw-semibold text-success mb-2 mt-4">
              2. What to do when encountering a job or company that is not
              transparent:
            </div>

            <ul className="text-muted small ps-3 mb-0">
              <li>
                Check information about the company and job before applying
              </li>
              <li>
                Report the job posting to JobHive via the button{" "}
                <span className="fw-bold text-dark">"Report job posting"</span>{" "}
                to get support and help other candidates avoid risks
              </li>
              <li>
                <p className="m-0">
                  Or contact JobHive via JobHive's candidate support channel:
                </p>
                <p className="m-0">
                  Email:{" "}
                  <a href="#" className="text-success text-decoration-none">
                    hotro@jobhive.vn
                  </a>
                </p>
                <p className="m-0">
                  Hotline:{" "}
                  <a href="#" className="text-success text-decoration-none">
                    (035) 123 4567
                  </a>
                </p>
              </li>
            </ul>

            <div className="mt-4">
              <button
                className="btn btn-outline-success fw-bold w-100"
                onClick={() => alert("This feature will be updated soon.")}
              >
                Report job posting
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* About TechCorp Section */}
          <div className="card mb-4 shadow-sm border-0 p-0">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">About {job.company || ""}</h5>
              <p className="text-muted">{job.companyDescription || ""}</p>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={() => setIsApplyModalOpen(true)}
              >
                Apply Now
              </button>
            </div>
          </div>
          {/* Job Details Section */}
          <div className="card shadow-sm border-0 p-0">
            <div className="card-body p-4">
              <h6 className="mb-4 text-uppercase fw-bold">Job Details</h6>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Job ID</div>
                  <div className="fw-medium text-capitalize">
                    {job.id || ""}
                  </div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Experience</div>
                  <div className="fw-medium text-capitalize">
                    {Array.isArray(job.experienceLevel)
                      ? job.experienceLevel.join(", ")
                      : ""}{" "}
                    Level
                  </div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Job Type</div>
                  <div className="fw-medium text-capitalize">
                    {Array.isArray(job.jobType) ? job.jobType.join(", ") : ""}
                  </div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Location Type</div>
                  <div className="fw-medium text-capitalize">
                    {Array.isArray(job.locationType)
                      ? job.locationType.join(", ")
                      : ""}
                  </div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Posted Date</div>
                  <div className="fw-medium">
                    {job.postedDate
                      ? new Date(job.postedDate).toLocaleDateString()
                      : ""}
                  </div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Deadline</div>
                  <div className="fw-medium">
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : ""}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Similar Job Referrals */}
          <div className="card mb-4 shadow-sm border-0 p-0 mt-4">
            <div className="card-body p-4" style={cardStyle}>
              <h5 className="card-title mb-3">Similar Jobs</h5>
              <div className="vstack gap-3">
                {similarJobs.map((item) => (
                  <div
                    className="card border-light bg-success shadow-sm bg-opacity-10"
                    key={item.id}
                  >
                    <div className="card-body p-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex gap-3">
                          <img
                            src={item.companyLogo || "/placeholder.svg"}
                            alt={item.company}
                            className="rounded bg-light"
                            width="56"
                            height="56"
                          />
                          <div>
                            <h6 className="mb-1">{item.title}</h6>
                            <small className="text-muted d-block">
                              {item.company}
                            </small>
                            <small className="text-muted">
                              {item.location}
                            </small>
                          </div>
                        </div>
                        <button
                          className={`btn btn-sm p-0 border-0 ${
                            savedJobs.includes(item.id)
                              ? "text-success"
                              : "text-muted"
                          }`}
                          onClick={() => {
                            const updated = savedJobs.includes(item.id)
                              ? savedJobs.filter((jid) => jid !== item.id)
                              : [...savedJobs, item.id];
                            setSavedJobs(updated);
                            localStorage.setItem(
                              "savedJobs",
                              JSON.stringify(updated)
                            );
                          }}
                          title={
                            savedJobs.includes(item.id) ? "Unsave" : "Save Job"
                          }
                        >
                          <Bookmark
                            size={18}
                            fill={
                              savedJobs.includes(item.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        {item.salary && (
                          <div className="text-muted small mt-1">
                            <span className="fw-semibold text-black">
                              Salary:
                            </span>{" "}
                            {job.salary.from && job.salary.to
                              ? `$${job.salary.from.toLocaleString()} - $${job.salary.to.toLocaleString()}`
                              : ""}
                          </div>
                        )}
                        <div
                          className="btn btn-sm btn-success"
                          onClick={() => router("/jobs/" + item.id)}
                        >
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                      rows="5"
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
