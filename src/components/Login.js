import React, { useState } from 'react';
import { loginUser } from '../api/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setTouched({ email: true, password: true });

  if (!emailIsValid || !passwordIsValid) {
    setError('Please fix the errors in the form.');
    return;
  }

  setLoading(true);
  try {
    const data = await loginUser(email, password);
    if (!data.user || data.user.role !== 'admin') {
      setError('You must be an admin to login.');
      setLoading(false);
      return;
    }
    onLogin(data.user);
  } catch (err) {
  let msg = 'Login failed. Please try again.';

  if (err?.message) {
    try {
      // Try parsing it if it's a JSON string
      const parsed = JSON.parse(err.message);
      if (parsed?.message && typeof parsed.message === 'string') {
        msg = parsed.message;
      } else {
        msg = err.message; // fallback
      }
    } catch {
      msg = err.message; // if not JSON, use it directly
    }
  }

  // Now set a clean, plain message
  setError(msg);
}

  setLoading(false);
};


  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-gradient" style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '18px' }}>
        <div className="card-body">
          <div className="d-flex flex-column align-items-center mb-4">
            <img
              src="https://raw.githubusercontent.com/abanoub1234/kkkk/refs/heads/main/ChatGPT%20Image%20May%2028%2C%202025%2C%2004_11_14%20PM.png"
              alt="DevMatch Logo"
              style={{ width: 200, marginBottom: 10, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            />
            <p className="text-center fw-bold text-dark mb-0" style={{ fontSize: 32, letterSpacing: 1 }}>Admin Panel Login</p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="on" noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className={`form-control${touched.email && !emailIsValid ? ' is-invalid' : touched.email && emailIsValid ? ' is-valid' : ''}`}
                id="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={handleBlur}
                required
                autoFocus
              />
              <div className="invalid-feedback">Please enter a valid email address.</div>
              <div className="valid-feedback">Looks good!</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className={`form-control${touched.password && !passwordIsValid ? ' is-invalid' : touched.password && passwordIsValid ? ' is-valid' : ''}`}
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={handleBlur}
                required
                minLength={6}
                autoComplete="current-password"
              />
              <div className="invalid-feedback">Password must be at least 6 characters.</div>
              <div className="valid-feedback">Looks good!</div>
            </div>

            {error && <div className="alert alert-danger mt-2">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              disabled={loading}
              style={{ borderRadius: 8, fontWeight: 600, fontSize: 18 }}
            >
              {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
