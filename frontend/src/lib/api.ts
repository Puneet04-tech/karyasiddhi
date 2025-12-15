import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001/api';
const AI_API_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const aiApi = axios.create({
  baseURL: AI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from zustand store state
    const authData = JSON.parse(localStorage.getItem('karyasiddhi-auth') || '{}');
    if (authData.state?.token) {
      config.headers.Authorization = `Bearer ${authData.state.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

aiApi.interceptors.request.use(
  (config) => {
    // Get token from zustand store state
    const authData = JSON.parse(localStorage.getItem('karyasiddhi-auth') || '{}');
    if (authData.state?.token) {
      config.headers.Authorization = `Bearer ${authData.state.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('karyasiddhi-auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
