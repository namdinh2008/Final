"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import {
  mockJobs,
  jobCategories,
  experienceLevels,
  jobTypes,
  locationTypes,
  searchJobs,
  filterJobs,
  sortJobs,
} from "@/lib/data"
import JobCard from "@/components/job-card"
import SearchBar from "@/components/search-bar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button, Form, Row, Col, Container } from "react-bootstrap"
import { Dropdown, ButtonGroup } from 'react-bootstrap';

export default function Home() {
  const [searchParams] = useSearchParams();

  const [jobs, setJobs] = useState(mockJobs)
  const [savedJobs, setSavedJobs] = useState([])
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") || "");
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const JOBS_PER_PAGE = 9

  const paginatedJobs = jobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE)
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [jobs, filters, searchQuery])

  useEffect(() => {
    const savedJobsFromStorage = localStorage.getItem("savedJobs")
    if (savedJobsFromStorage) {
      setSavedJobs(JSON.parse(savedJobsFromStorage))
    }
  }, [])

  useEffect(() => {
    let filteredJobs = mockJobs
    if (searchQuery) {
      filteredJobs = searchJobs(searchQuery)
    }
    if (Object.keys(filters).length > 0) {
      filteredJobs = filterJobs(filteredJobs, filters)
    }
    filteredJobs = sortJobs(filteredJobs, sortBy)
    setJobs(filteredJobs)
    setCurrentPage(1)
  }, [filters, sortBy, searchQuery])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

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
  }

  const toggleSaveJob = (jobId) => {
    let updatedSavedJobs

    if (savedJobs.includes(jobId)) {
      updatedSavedJobs = savedJobs.filter((id) => id !== jobId)
    } else {
      updatedSavedJobs = [...savedJobs, jobId]
    }

    setSavedJobs(updatedSavedJobs)
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs))
  }

  const handleSortChange = (value) => {
    setSortBy(value)
  }

  const handleLocationInput = (e) => {
    setFilters((prev) => ({ ...prev, location: e.target.value || undefined }))
  }

  const renderDropdown = (label, key, options) => (
  <div className="dropdown d-inline-block">
    <button
      className="btn btn-outline-secondary dropdown-toggle min-w-160 text-start"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {label}
    </button>
    <ul className="dropdown-menu p-3 shadow-sm border rounded" style={{ minWidth: '240px' }}>
      {options.map((opt) => (
        <li key={opt.id} className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            value={opt.id}
            id={`${key}-${opt.id}`}
            checked={Array.isArray(filters[key]) && filters[key].includes(opt.id)}
            onChange={() => handleMultiSelect(key, opt.id)}
          />
          <label className="form-check-label ms-2" htmlFor={`${key}-${opt.id}`}>
            {opt.name}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

  return (
    <>
      <Container className="py-5">
        <div className="bg-body-secondary p-5 rounded mb-4 text-center shadow-sm">
          <h1 className="display-5 fw-bold">Find Your Dream Job</h1>
          <p className="text-muted fs-5">
            Browse through thousands of job opportunities tailored to your skills and preferences.
          </p>
          <div className="mx-auto" style={{ maxWidth: "600px" }}>
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
          </div>
        </div>

        <Row className="align-items-center mb-4">
          <Col md={6} className="mb-2 mb-md-0">
            <Form.Select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} className="shadow-sm">
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
              className="shadow-sm"
            />
          </Col>
        </Row>

        <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              {/* Filter Dropdowns */}
              {renderDropdown("Job Category", "category", jobCategories)}
              {renderDropdown("Experience Level", "experienceLevel", experienceLevels)}
              {renderDropdown("Job Type", "jobType", jobTypes)}
              {renderDropdown("Work Type", "locationType", locationTypes)}
              {/* Clear Button */}
              <button
      className="btn btn-outline-secondary ms-2"
      onClick={() => setFilters({})}
    >
      Clear
    </button>
            </div>

            <Tabs
              defaultValue="all"
              value="all"
              className="w-full"
            ></Tabs>

        <Row>
          {paginatedJobs.map((job) => (
            <Col key={job.id} md={6} lg={4} className="mb-4">
              <div className="shadow-sm rounded">
                <JobCard job={job} onSave={toggleSaveJob} isSaved={savedJobs.includes(job.id)} />
              </div>
            </Col>
          ))}
        </Row>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "primary" : "outline-primary"}
                onClick={() => setCurrentPage(i + 1)}
                className="me-2"
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline-primary"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </Container>
      <CompaniesSection />
    </>
  )
}

// Component hiển thị các công ty theo lĩnh vực được yêu cầu
function CompaniesSection({ sector }) {
  // Các lĩnh vực cần hiển thị (KHÔNG có bất động sản)
  const sectors = [
    { label: 'IT & Software', value: 'it' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Finance', value: 'finance' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Government & Public Sector', value: 'government' },
  ];
  const [activeSector, setActiveSector] = React.useState(sector || sectors[0].value);

  // Lọc jobs theo ngành đang chọn
  const sectorJobs = mockJobs.filter(job => Array.isArray(job.category) && job.category.includes(activeSector));

  // Gom nhóm theo company và lấy logo đầu tiên, đếm số job
  const companyMap = {};
  sectorJobs.forEach(job => {
    if (!companyMap[job.company]) {
      companyMap[job.company] = {
        name: job.company,
        logo: job.companyLogo || '/placeholder-logo.png',
        jobs: 1
      };
    } else {
      companyMap[job.company].jobs += 1;
    }
  });
  // Chỉ lấy công ty có ít nhất 1 job
  const companies = Object.values(companyMap).filter(c => c.jobs > 0);

  return (
    <section className="py-8 mt-5">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Top Companies in this Sector</h2>
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide mb-6 px-2">
          {sectors.map((sectorItem) => (
            <button
              key={sectorItem.value}
              className={`text-xs font-semibold whitespace-nowrap rounded-full px-4 py-1 ${activeSector === sectorItem.value ? "bg-[#7B5E10] text-white" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setActiveSector(sectorItem.value)}
            >
              {sectorItem.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-2">
          {companies.length === 0 ? (
            <div className="col-span-4 text-center py-10 text-gray-400">Không có công ty nào cho lĩnh vực này.</div>
          ) : (
            companies.map((company, idx) => (
              <div key={company.name + idx} className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex items-center space-x-3 min-h-[70px]">
                <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-md object-contain bg-gray-50 border" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">{company.name}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <i className="fas fa-briefcase mr-1"></i>
                    {company.jobs} việc làm
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
