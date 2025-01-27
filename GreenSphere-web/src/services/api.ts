import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.144.124.176:3000',
  timeout: 5000,
});

export default api;
