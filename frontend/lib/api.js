import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Express backend
});

API.interceptors.request.use((req) => {
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
