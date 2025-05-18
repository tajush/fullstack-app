import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id?: string;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({ name: '', email: '' });
const [error, setError] = useState<string | null>(null);
  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  axios.post<User>(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, formData)
    .then(res => {
      setFormData({ name: '', email: '' });
      setError(null);
      fetchUsers();
    })
    .catch(err => {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong.');
      }
    });
};


  return (
    <div style={{ padding: '20px' }}>
      <h1>Users List</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          {error && <p className="text-red-600 mb-2">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
         
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
      {/* jijj */}
    </div>
  );
}
