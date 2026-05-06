import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
    error.userMessage = message;
    error.fieldErrors = error?.response?.data?.errors;
    return Promise.reject(error);
  }
);

export const userService = {
  list: ({ page = 1, limit = 10, search = '' } = {}) =>
    api.get('/users', { params: { page, limit, search } }).then((r) => r.data),

  get: (id) => api.get(`/users/${id}`).then((r) => r.data),

  create: (payload) => api.post('/users', payload).then((r) => r.data),

  update: (id, payload) => api.put(`/users/${id}`, payload).then((r) => r.data),

  remove: (id) => api.delete(`/users/${id}`).then((r) => r.data),

  exportCsvUrl: (search = '') => {
    const url = new URL(`${baseURL}/users/export`);
    if (search) url.searchParams.set('search', search);
    return url.toString();
  },
};

export default api;
