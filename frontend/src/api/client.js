/**
 * Centralized Axios client.
 * - Reads VITE_API_URL from environment
 * - Attaches JWT access token from localStorage on every request
 * - Handles 401 responses by attempting a token refresh, then retrying once
 */
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach access token ───────────────────────────────
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: auto-refresh on 401 ─────────────────────────────
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh_token')
    ) {
      if (isRefreshing) {
        // Queue this request until the refresh is complete
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(client(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh/`, {
          refresh: refreshToken,
        });

        localStorage.setItem('access_token', data.access);
        // simplejwt with ROTATE_REFRESH_TOKENS=True sends a new refresh token
        if (data.refresh) localStorage.setItem('refresh_token', data.refresh);

        onRefreshed(data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return client(originalRequest);
      } catch (refreshError) {
        // Refresh failed — clear tokens and let the UI redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
