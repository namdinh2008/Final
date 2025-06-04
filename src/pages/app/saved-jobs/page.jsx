import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import JobCard from "@/components/job-card";
import { mockJobs } from "@/lib/data";

export default function SavedJobsPage() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [savedJobsData, setSavedJobsData] = useState(
    mockJobs.filter((job) => savedJobs.includes(job.id))
  );
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const savedJobsFromStorage = localStorage.getItem("savedJobs");
    if (savedJobsFromStorage) {
      const parsedSavedJobs = JSON.parse(savedJobsFromStorage);
      setSavedJobs(parsedSavedJobs);
      setSavedJobsData(
        mockJobs.filter((job) => parsedSavedJobs.includes(job.id))
      );
    }
  }, []);

  const toggleSaveJob = (jobId) => {
    const updatedSavedJobs = savedJobs.filter((id) => id !== jobId);
    setSavedJobs(updatedSavedJobs);
    setSavedJobsData(
      mockJobs.filter((job) => updatedSavedJobs.includes(job.id))
    );
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="container py-5">
      <div className="mb-5 text-center">
        <h1 className="display-4 fw-bold">Saved Jobs</h1>
        <p className="text-secondary fs-5">
          View and manage the jobs you've saved for later.
        </p>
      </div>

      {savedJobsData.length > 0 ? (
        <div className="row g-4">
          {savedJobsData.map((job) => (
            <div key={job.id} className="col-12 col-md-6 col-lg-4">
              <JobCard
                job={job}
                onSave={toggleSaveJob}
                isSaved={true}
                onApplyClick={() => handleApplyClick(job)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center text-muted">
          <Bookmark size={64} className="mb-3" />
          <h3 className="mb-2">No saved jobs yet</h3>
          <p className="mb-4 fs-5">
            When you find a job you like, click the bookmark icon to save it for
            later.
          </p>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={() => navigate("/")}
          >
            Browse Jobs
          </button>
        </div>
      )}

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
                    alert("Application submitted!");
                  }}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Apply for {selectedJob.title}</h5>
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
    </div>
  );
}
