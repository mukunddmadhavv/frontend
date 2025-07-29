import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-3iv8.onrender.com/api',
});

export default API;
