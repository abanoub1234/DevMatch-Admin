import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './JobsPage.css';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const data = await fetchJobs();
        setJobs(data);
        setError('');
      } catch {
        setError('Failed to load jobs');
      }
      setLoading(false);
    }
    loadJobs();
  }, []);

  // Filter jobs by search
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIdx = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIdx, startIdx + jobsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-briefcase-fill me-2"></i>
           Available DevMatch Jobs
        </h2>
      </div>

      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by job title..."
            value={search}
            onChange={handleSearchChange}
            style={{ borderRadius: 12 }}
          />
        </div>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row g-4">
        {currentJobs.map((job) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={job._id}>
            <div className="card job-card h-100 shadow-sm border-0 rounded-4 p-2 bg-light position-relative overflow-hidden hover-lift">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3 text-dark">
                  <i className="bi bi-person-workspace text-primary me-2"></i>
                  {job.title}
                </h5>
                <p className="card-text text-secondary mb-2">
                  <i className="bi bi-tags-fill me-2"></i>
                  <strong>{job.specialization}</strong>
                </p>
                <p className="card-text text-muted mt-auto small">
                  <i className="bi bi-clock-fill me-2"></i>
                  {new Date(job.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="mt-4 d-flex justify-content-center">
          <ul className="pagination pagination-lg">
            <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item${currentPage === i + 1 ? ' active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
