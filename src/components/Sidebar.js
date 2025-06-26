import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <div
      className="d-flex flex-column bg-dark text-white position-fixed top-0 start-0 vh-100 p-3"
      style={{ width: '250px', zIndex: 1040, boxShadow: '2px 0 16px 0 rgba(30,41,59,0.08)' }}
    >
      <h5 className="text-center mb-1 fw-bold text-primary" style={{ letterSpacing: 1 }}>DevMatch</h5>
      <h4 className="text-center mb-4">
        <i className="bi bi-speedometer2 me-2"></i>
        Admin Panel
      </h4>
      <nav className="nav flex-column">
        <Link
          to="/users"
          className={`nav-link mb-2${location.pathname === '/users' ? ' active bg-primary text-white fw-bold border-0' : ' text-white'}`}
          style={location.pathname === '/users' ? { background: '#0d6efd', color: '#fff', fontWeight: 800, borderRadius: 8, letterSpacing: 1, border: 0 } : {}}
        >
          <i className="bi bi-people-fill me-2"></i>
          Users
        </Link>
        <Link
          to="/jobs"
          className={`nav-link mb-2${location.pathname === '/jobs' ? ' active bg-primary text-white fw-bold border-0' : ' text-white'}`}
          style={location.pathname === '/jobs' ? { background: '#0d6efd', color: '#fff', fontWeight: 800, borderRadius: 8, letterSpacing: 1, border: 0 } : {}}
        >
          <i className="bi bi-briefcase-fill me-2"></i>
          Jobs
        </Link>
      </nav>
      <div className="mt-auto pt-4 border-top">
        <button className="btn btn-outline-light w-100" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
}
