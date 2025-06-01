"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";

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
        <div className="bg-body-secondary p-5 rounded mb-4 text-center shadow-sm">
          <h1 className="display-5 fw-bold">Find Your Dream Job</h1>
          <p className="text-muted fs-5">
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
          {/* Filter Dropdowns */}
          {renderDropdown("Job Category", "category", jobCategories)}
          {renderDropdown(
            "Experience Level",
            "experienceLevel",
            experienceLevels
          )}
          {renderDropdown("Job Type", "jobType", jobTypes)}
          {renderDropdown("Work Type", "locationType", locationTypes)}
          {/* Clear Button */}
          <button
            className="btn btn-success border-4 mb-2"
            onClick={() => setFilters({})}
          >
            Clear
          </button>
        </div>

        <Tabs defaultValue="all" value="all" className="w-full"></Tabs>

        <Row>
          {paginatedJobs.map((job) => (
            <Col key={job.id} md={6} lg={4} className="mb-4">
              <div className="shadow-sm rounded">
                <JobCard
                  job={job}
                  onSave={toggleSaveJob}
                  isSaved={savedJobs.includes(job.id)}
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
    </>
  );
}
