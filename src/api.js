import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-3iv8.onrender.com/api',
});

// Automatically add the token to headers
API.interceptors.request.use((config) => {
  const stored = localStorage.getItem('businessOwner');
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
