import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import UsersPage from './pages/UsersPage';
import JobsPage from './pages/JobsPage';
import logo from './logo.svg';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app-layout" style={{ marginLeft: 250 }}>
        <Sidebar onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="*" element={<Navigate to="/users" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
