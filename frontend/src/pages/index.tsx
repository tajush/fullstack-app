import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
  _id?: string;
  name: string;
  email: string;
  password:string;
}

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({ name: '', email: '',password:'' });
  const [error, setError] = useState<string | null>(null);


  const fetchUsers = () => {
    axios
      .get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post<User>(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, formData)
      .then(res => {
        setFormData({ name: '', email: '',password:'' });
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
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
<input
  type="password"
  name="password"
  placeholder="Enter password"
  value={formData.password}
  onChange={handleChange}
  required
  pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$"
/>


        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
