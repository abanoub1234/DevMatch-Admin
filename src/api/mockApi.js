// Simulated API for authentication and data
export const users = [
  { id: 1, name: 'Alice', role: 'admin', photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Bob', role: 'freelancer', photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 3, name: 'Carol', role: 'recruiter', photo: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 4, name: 'Dave', role: 'freelancer', photo: 'https://randomuser.me/api/portraits/men/4.jpg' }
];

export const jobs = [
  { id: 1, title: 'Frontend Developer', specialization: 'React', createdAt: '2025-06-25T10:00:00Z' },
  { id: 2, title: 'Backend Developer', specialization: 'Node.js', createdAt: '2025-06-24T14:30:00Z' },
  { id: 3, title: 'UI/UX Designer', specialization: 'Design', createdAt: '2025-06-23T09:15:00Z' }
];

export function login(username, password) {
  // Simulate login: only 'admin' user with password 'admin' is allowed
  const user = users.find(u => u.name.toLowerCase() === username.toLowerCase() && u.role === 'admin');
  if (user && password === 'admin') {
    return { ...user };
  }
  return null;
}
