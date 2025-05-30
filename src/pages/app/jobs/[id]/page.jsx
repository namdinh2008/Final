import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "@/lib/data";
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

  useEffect(() => {
    setJob(getJobById(id)); // Cập nhật job khi id thay đổi
  }, [id]);

  useEffect(() => {
    const savedJobsFromStorage = localStorage.getItem("savedJobs");
    if (savedJobsFromStorage) {
      setSavedJobs(JSON.parse(savedJobsFromStorage));
    }
  }, []);

  if (!job || typeof job !== 'object') {
    return (
      <div className="container py-5 text-center">
        <h1 className="display-5 fw-bold">Job not found</h1>
        <p className="text-muted mb-4">The job you're looking for doesn't exist or has been removed.</p>
        <button className="btn btn-primary" onClick={() => router("/")}>Back to Jobs</button>
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
    alert("Application submitted!"); // Simulate confirmation
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  return (
    <div className="container py-5">
      <button className="btn btn-primary mb-4" onClick={() => router("/")}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg> Back to Jobs</button>

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
                <button className={`btn btn-sm border-0 ${savedJobs.includes(job.id)}`} onClick={toggleSaveJob}>
                  {savedJobs.includes(job.id) ? <Bookmark className="text-primary" fill="currentColor"/> :  <Bookmark className="text-muted" fill="none"/>}
                </button>
              </div>

              <div className="row row-cols-2 gy-2 mb-3">
                <div><strong>Location:</strong> {job.location || ''}</div>
                <div><strong>Job Type:</strong> {Array.isArray(job.jobType) ? job.jobType.join(', ') : ''}</div>
                <div><strong>Posted:</strong> {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : ''}</div>
                <div><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : ''}</div>
                {job.salary && job.salary.from && job.salary.to && <div><strong>Salary:</strong> ${job.salary.from.toLocaleString()} - ${job.salary.to.toLocaleString()}</div>}
                <div><strong>Work Setup:</strong> {Array.isArray(job.locationType) ? job.locationType.join(', ') : ''}</div>
              </div>

              <hr/>

              <h5 className="mt-4">Job Description</h5>
              <p className="text-muted">{job.description}</p>

              <h5 className="mt-4">Qualifications</h5>
              <ul className="text-muted">
                {Array.isArray(job.qualifications) && job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
              </ul>

              <h5 className="mt-4">Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                {Array.isArray(job.skills) && job.skills.map((s, i) => (
                  <span key={i} className="badge bg-dark">{s}</span>
                ))}
              </div>

              <h5 className="mt-4">Perks & Benefits</h5>
              <ul className="text-muted">
                {Array.isArray(job.perks) && job.perks.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* About TechCorp Section */}
          <div className="card mb-4 shadow-sm border-0 p-0">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">About {job.company || ''}</h5>
              <p className="text-muted">{job.companyDescription || ''}</p>
              <button className="btn btn-primary w-100 mt-3" onClick={() => setIsApplyModalOpen(true)}>
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
                  <div className="fw-medium text-capitalize">{job.id || ''}</div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Experience</div>
                  <div className="fw-medium text-capitalize">{Array.isArray(job.experienceLevel) ? job.experienceLevel.join(', ') : ''} Level</div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Job Type</div>
                  <div className="fw-medium text-capitalize">{Array.isArray(job.jobType) ? job.jobType.join(', ') : ''}</div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Location Type</div>
                  <div className="fw-medium text-capitalize">{Array.isArray(job.locationType) ? job.locationType.join(', ') : ''}</div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Posted Date</div>
                  <div className="fw-medium">{job.postedDate ? new Date(job.postedDate).toLocaleDateString() : ''}</div>
                </li>
                <li className="mb-2 d-flex justify-content-between align-items-center">
                  <div className="text-muted fw-medium">Deadline</div>
                  <div className="fw-medium">{job.deadline ? new Date(job.deadline).toLocaleDateString() : ''}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={() => setIsApplyModalOpen(false)}>
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <form onSubmit={handleApply}>
                <div className="modal-header">
                  <h5 className="modal-title">Apply for {job.title}</h5>
                  <button type="button" className="btn-close" onClick={() => setIsApplyModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" id="name" className="form-control" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume (Optional)</label>
                    <input type="file" id="resume" className="form-control" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
                    <textarea id="coverLetter" className="form-control" rows="5" required
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setIsApplyModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Submit Application</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
