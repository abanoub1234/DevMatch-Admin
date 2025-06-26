const API_BASE = 'http://localhost:5000/api'; // Change to your backend URL

export async function fetchUsers(role) {
  let url = `${API_BASE}/users`;
  if (role && role !== 'all') {
    url = `${API_BASE}/users?role=${role}`;
  }
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
}

export async function fetchJobs() {
  const res = await fetch(`${API_BASE}/jobs`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  let debugInfo = '';
  try {
    debugInfo = await res.clone().text();
  } catch (e) {
    debugInfo = 'Could not read response body';
  }
  if (!res.ok) {
    throw new Error(`Invalid credentials. Debug: ${debugInfo}`);
  }
  try {
    return await res.json();
  } catch (e) {
    throw new Error(`Login succeeded but could not parse JSON. Debug: ${debugInfo}`);
  }
}
