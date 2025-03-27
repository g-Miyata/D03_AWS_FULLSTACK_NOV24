import axios from 'axios';
const baseUrl = import.meta.env.VITE_DATABASE_URL;
const api = axios.create({
  // baseURL: 'http://18.212.72.16:3000',
  baseURL: baseUrl,
  timeout: 5000,
});

export default api;
