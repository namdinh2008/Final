"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs } from "@/components/ui/tabs";
import {
  mockJobs,
  jobCategories,
  experienceLevels,
  jobTypes,
  locationTypes,
  searchJobs,
  filterJobs,
  sortJobs,
} from "@/lib/data";
import JobCard from "@/components/job-card";
import SearchBar from "@/components/search-bar";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

export default function Home() {
  const [searchParams] = useSearchParams();

  const [jobs, setJobs] = useState(mockJobs);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || ""
  );
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [focused, setFocused] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });
  const JOBS_PER_PAGE = 9;

  const paginatedJobs = jobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [jobs, filters, searchQuery]);

  useEffect(() => {
    const savedJobsFromStorage = localStorage.getItem("savedJobs");
    if (savedJobsFromStorage) {
      setSavedJobs(JSON.parse(savedJobsFromStorage));
    }
  }, []);

  useEffect(() => {
    let filteredJobs = mockJobs;
    if (searchQuery) {
      filteredJobs = searchJobs(searchQuery);
    }
    if (Object.keys(filters).length > 0) {
      filteredJobs = filterJobs(filteredJobs, filters);
    }
    filteredJobs = sortJobs(filteredJobs, sortBy);
    setJobs(filteredJobs);
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMultiSelect = (key, value) => {
    setFilters((prev) => {
      const arr = Array.isArray(prev[key]) ? [...prev[key]] : [];
      if (arr.includes(value)) {
        const newArr = arr.filter((v) => v !== value);
        return { ...prev, [key]: newArr.length > 0 ? newArr : undefined };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  const toggleSaveJob = (jobId) => {
    let updatedSavedJobs;

    if (savedJobs.includes(jobId)) {
      updatedSavedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      updatedSavedJobs = [...savedJobs, jobId];
    }

    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleLocationInput = (e) => {
    setFilters((prev) => ({ ...prev, location: e.target.value || undefined }));
  };

  const renderDropdown = (label, key, options) => (
    <div className="dropdown d-inline-block me-2 mb-2">
      <button
        className="btn btn-outline-success border-2 dropdown-toggle w-100 d-flex justify-content-between align-items-center text-start"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          minWidth: "180px",
          maxWidth: "250px",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
        }}
      >
        <span className="text-truncate">{label}</span>
      </button>

      <ul
        className="dropdown-menu p-3 shadow-lg border-0 rounded-lg"
        style={{
          minWidth: "260px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <li className="dropdown-item-text pb-2 border-bottom mb-2 text-muted fw-bold text-uppercase small">
          Select {label.toLowerCase()}
        </li>

        {options.map((opt) => {
          const isChecked =
            Array.isArray(filters[key]) && filters[key].includes(opt.id);

          return (
            <li key={opt.id}>
              <div className="form-check py-2 px-3 m-0">
                <input
                  className={`form-check-input ${
                    isChecked ? "bg-success border-success" : ""
                  }`}
                  type="checkbox"
                  value={opt.id}
                  id={`${key}-${opt.id}`}
                  checked={isChecked}
                  onChange={() => handleMultiSelect(key, opt.id)}
                  style={{
                    boxShadow: "none",
                    outline: "none",
                    border: "1px solid #ced4da",
                  }}
                />
                <label
                  className="form-check-label ms-2 text-dark cursor-pointer"
                  htmlFor={`${key}-${opt.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {opt.name}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      <Container className="py-5">
        <section
          className="mb-5 position-relative"
          style={{
            background: "linear-gradient(120deg, #e0ffe6 0%, #b2f7ef 100%)",
            backgroundImage:
              "url(https://www.transparenttextures.com/patterns/diagmonds-light.png)",
            borderRadius: "1.5rem",
            boxShadow: "0 4px 24px rgba(60,180,120,0.08)",
            padding: "2.5rem 1rem 2rem 1rem",
          }}
        >
          <div className="text-center mb-4">
            <h2
              className="fw-bold mb-2"
              style={{ color: "#198754", fontSize: "2.2rem" }}
            >
              Platform Statistics
            </h2>
            <div className="text-muted fs-5">
              Discover opportunities and insights from our job platform
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-6 col-md-2">
              <div className="bg-white rounded-4 shadow p-4 text-center h-100 border border-success-subtle stat-card">
                <div className="mb-2">
                  <i className="fas fa-briefcase fa-2x text-success"></i>
                </div>
                <div className="fs-2 fw-bold text-success">
                  {mockJobs.length}
                </div>
                <div className="small text-secondary">Jobs</div>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="bg-white rounded-4 shadow p-4 text-center h-100 border border-primary-subtle stat-card">
                <div className="mb-2">
                  <i className="fas fa-building fa-2x text-primary"></i>
                </div>
                <div className="fs-2 fw-bold text-primary">
                  {[...new Set(mockJobs.map((j) => j.company))].length}
                </div>
                <div className="small text-secondary">Companies</div>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="bg-white rounded-4 shadow p-4 text-center h-100 border border-info-subtle stat-card">
                <div className="mb-2">
                  <i className="fas fa-layer-group fa-2x text-info"></i>
                </div>
                <div className="fs-2 fw-bold text-info">
                  {jobCategories.length}
                </div>
                <div className="small text-secondary">Categories</div>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="bg-white rounded-4 shadow p-4 text-center h-100 border border-warning-subtle stat-card">
                <div className="mb-2">
                  <i className="fas fa-clock fa-2x text-warning"></i>
                </div>
                <div className="fs-2 fw-bold text-warning">
                  {jobTypes.length}
                </div>
                <div className="small text-secondary">Job Types</div>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="bg-white rounded-4 shadow p-4 text-center h-100 border border-danger-subtle stat-card">
                <div className="mb-2">
                  <i className="fas fa-user-tie fa-2x text-danger"></i>
                </div>
                <div className="fs-2 fw-bold text-danger">
                  {experienceLevels.length}
                </div>
                <div className="small text-secondary">Experience Levels</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <div className="bg-white rounded-4 shadow p-4">
            <h4 className="fw-bold mb-4" style={{ color: "#198754" }}>
              Featured High Salary Jobs
            </h4>
            <div
              id="highSalaryCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="5000"
            >
              <div className="carousel-inner">
                {mockJobs
                  .filter((job) => job.salary && job.salary.to >= 120000)
                  .sort((a, b) => b.salary.to - a.salary.to)
                  .slice(0, 5)
                  .map((job, idx) => (
                    <div
                      className={`carousel-item${idx === 0 ? " active" : ""}`}
                      key={job.id}
                    >
                      <div className="row align-items-center justify-content-center">
                        <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
                          <img
                            src={job.companyLogo || "/placeholder.svg"}
                            alt={job.company}
                            className="img-fluid rounded-3 bg-light"
                            style={{ maxHeight: 100, objectFit: "contain" }}
                          />
                        </div>
                        <div className="col-12 col-md-7">
                          <h5 className="fw-bold mb-1">{job.title}</h5>
                          <div className="mb-1 text-secondary">
                            {job.company} - {job.location}
                          </div>
                          <div
                            className="mb-2 text-success fw-semibold"
                            style={{ fontSize: "1.1rem" }}
                          >
                            Salary: ${job.salary.from.toLocaleString()} - $
                            {job.salary.to.toLocaleString()}
                          </div>
                          <div
                            className="mb-2 text-muted"
                            style={{ fontSize: "0.98rem" }}
                          >
                            {job.description}
                          </div>
                          <a
                            href={`/jobs/${job.id}`}
                            className="btn btn-outline-success px-4 fw-semibold shadow-sm"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev d-flex align-items-center justify-content-center"
                type="button"
                data-bs-target="#highSalaryCarousel"
                data-bs-slide="prev"
                style={{
                  width: 48,
                  height: 48,
                  background: "#e0ffe6",
                  borderRadius: "50%",
                  border: "2px solid #198754",
                  boxShadow: "0 2px 8px #b2f7ef",
                  zIndex: 2,
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "10px",
                }}
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                  style={{
                    filter:
                      "invert(40%) sepia(80%) saturate(400%) hue-rotate(90deg)",
                  }}
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next d-flex align-items-center justify-content-center"
                type="button"
                data-bs-target="#highSalaryCarousel"
                data-bs-slide="next"
                style={{
                  width: 48,
                  height: 48,
                  background: "#e0ffe6",
                  borderRadius: "50%",
                  border: "2px solid #198754",
                  boxShadow: "0 2px 8px #b2f7ef",
                  zIndex: 2,
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "10px",
                }}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                  style={{
                    filter:
                      "invert(40%) sepia(80%) saturate(400%) hue-rotate(90deg)",
                  }}
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </section>
        <style>{`
          .stat-card {
            transition: transform 0.18s, box-shadow 0.18s;
          }
          .stat-card:hover {
            transform: translateY(-6px) scale(1.04);
            box-shadow: 0 8px 32px rgba(60,180,120,0.15);
          }
        `}</style>

        <div
          style={{
            background: "linear-gradient(120deg, #e0ffe6 0%, #b2f7ef 100%)",
            backgroundImage:
              "url(https://www.transparenttextures.com/patterns/diagmonds-light.png)",
            position: "relative",
            borderRadius: "1.5rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 24px rgba(60,180,120,0.08)",
          }}
          className="p-5 text-center shadow-sm"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Job search"
            style={{
              width: 64,
              height: 64,
              marginBottom: 16,
              opacity: 0.9,
            }}
          />
          <h1
            className="display-5 fw-bold"
            style={{
              color: "#198754",
              textShadow: "0 2px 8px #b2f7ef",
            }}
          >
            Find Your Dream Job
          </h1>
          <p className="text-muted fs-5 mb-4">
            Browse through thousands of job opportunities tailored to your
            skills and preferences.
          </p>
          <div className="mx-auto" style={{ maxWidth: "600px" }}>
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
          </div>
        </div>

        <Row className="align-items-center mb-4">
          <Col md={6} className="mb-2 mb-md-0">
            <Form.Select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="shadow-sm"
              style={{
                border: "1px solid #ced4da",
              }}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Sort by Date</option>
              <option value="salary">Sort by Salary</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by location..."
              value={filters.location || ""}
              onChange={handleLocationInput}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="shadow-sm "
              style={{
                border: focused ? "2px solid #198754" : "1px solid #ced4da",
              }}
            />
          </Col>
        </Row>

        <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
          {renderDropdown("Job Category", "category", jobCategories)}
          {renderDropdown(
            "Experience Level",
            "experienceLevel",
            experienceLevels
          )}
          {renderDropdown("Job Type", "jobType", jobTypes)}
          {renderDropdown("Work Type", "locationType", locationTypes)}

          <button
            className="btn btn-success border-4 mb-2 shadow-sm"
            style={{
              background: "linear-gradient(90deg,#b2f7ef 0%,#e0ffe6 100%)",
              color: "#198754",
              fontWeight: 600,
            }}
            onClick={() => setFilters({})}
          >
            Clear
          </button>
        </div>

        <Tabs defaultValue="all" value="all" className="w-full"></Tabs>

        <Row>
          {paginatedJobs.map((job) => (
            <Col key={job.id} md={6} lg={4} className="mb-4">
              <div
                className="shadow-sm rounded job-card-hover"
                style={{
                  transition: "transform 0.2s",
                  background: "#f8fdfb",
                }}
              >
                <JobCard
                  job={job}
                  onSave={toggleSaveJob}
                  isSaved={savedJobs.includes(job.id)}
                  onApplyClick={() => {
                    setSelectedJob(job);
                    setIsApplyModalOpen(true);
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="outline-success"
              className="me-2"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "success" : "outline-success"}
                onClick={() => setCurrentPage(i + 1)}
                className="me-2"
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline-success"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </Container>
      {isApplyModalOpen && selectedJob && (
        <>
          <div
            className="modal-backdrop show"
            style={{ backgroundColor: "rgb(0, 0, 0)" }}
            onClick={() => setIsApplyModalOpen(false)}
          ></div>
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsApplyModalOpen(false);
                    setFormData({
                      name: "",
                      email: "",
                      resume: null,
                      coverLetter: "",
                    });
                    alert("Application submitted!");
                  }}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Apply for {selectedJob.title}
                    </h5>
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
                        {selectedJob.company}
                      </div>
                      {selectedJob.salary &&
                        selectedJob.salary.from &&
                        selectedJob.salary.to && (
                          <div>
                            <strong className="text-success">Salary:</strong> $
                            {selectedJob.salary.from.toLocaleString()} - $
                            {selectedJob.salary.to.toLocaleString()}
                          </div>
                        )}
                      <div>
                        <strong className="text-success">Location:</strong>{" "}
                        {selectedJob.location || ""}
                      </div>
                      <div>
                        <strong className="text-success">Job Type:</strong>{" "}
                        {Array.isArray(selectedJob.jobType)
                          ? selectedJob.jobType.join(", ")
                          : ""}
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
                        style={{
                          boxShadow: "none",
                          outline: "none",
                          border: "1px solid #ced4da",
                        }}
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
                        style={{
                          boxShadow: "none",
                          outline: "none",
                          border: "1px solid #ced4da",
                        }}
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
                        onChange={(e) => {
                          if (e.target.files?.[0])
                            setFormData({
                              ...formData,
                              resume: e.target.files[0],
                            });
                        }}
                        style={{
                          boxShadow: "none",
                          outline: "none",
                          border: "1px solid #ced4da",
                        }}
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
                        style={{
                          boxShadow: "none",
                          outline: "none",
                          border: "1px solid #ced4da",
                        }}
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
        </>
      )}
    </>
  );
}
