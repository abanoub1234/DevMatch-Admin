import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './JobsPage.css';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-briefcase-fill me-2"></i>
           Available DevMatch Jobs
        </h2>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row g-4">
        {jobs.map((job) => (
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
    </div>
  );
}
