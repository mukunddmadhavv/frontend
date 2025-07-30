import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-3iv8.onrender.com/api',
});

// ✅ No token logic needed anymore since we don't use JWT
// If needed in future, ownerMobile can be added per-request

export default API;
