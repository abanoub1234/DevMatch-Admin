import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = async (role) => {
    setLoading(true);
    try {
      const data = await fetchUsers(role);
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to load users');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers(filter);
    // eslint-disable-next-line
  }, [filter]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
    } catch {
      setError('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => {
    if (filter === 'all') return true;
    if (filter === 'freelancer') return u.role === 'programmer';
    return u.role === filter;
  });

  return (
    <div className="container py-5">
      <div className="text-center mb-2 d-flex align-items-center justify-content-center gap-2 flex-row-reverse">
        <h2 className="fw-bold mb-2" style={{ display: 'inline-block', color: '#0d6efd' }}>
          DevMatch Users
        </h2>
        <i className="bi bi-people-fill" style={{ fontSize: 40, verticalAlign: 'middle', color: '#4ea8de' }}></i>
      </div>
      <div className="text-center mb-4">
        <div className="btn-group mt-3" role="group">
          <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('all')}>
            All
          </button>
          <button className={`btn ${filter === 'freelancer' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('freelancer')}>
            Freelancer
          </button>
          <button className={`btn ${filter === 'recruiter' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('recruiter')}>
            Recruiter
          </button>
        </div>
      </div>

      {loading && <div className="alert alert-info text-center">Loading users...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row g-4">
        {filteredUsers.map(user => (
          <div className="col-lg-4 col-md-6" key={user._id}>
            <div className="card border-0 shadow-lg p-3 bg-white rounded h-100">
              <div className="text-center mb-3">
                <img
                  src={user.image || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                  alt={user.name}
                  className="rounded-circle border border-3 border-primary shadow"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    backgroundColor: '#fff',
                  }}
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-dark">{user.name}</h5>
                <p className="text-muted mb-3">
                  <i className="bi bi-person-badge-fill me-2"></i>{user.role}
                </p>
                {user.role !== 'admin' && (
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => handleDelete(user._id)}
                  >
                    <i className="bi bi-trash3 me-1"></i> Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
