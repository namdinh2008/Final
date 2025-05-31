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
              <JobCard job={job} onSave={toggleSaveJob} isSaved={true} />
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
    </div>
  );
}
