// src/axiosConfig.ts
import axios, { type InternalAxiosRequestConfig } from 'axios';
  
// Todas las peticiones de axios usarán este baseURL
axios.defaults.baseURL = 'http://localhost:4000';

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('adminToken');
  if (token && config.url?.startsWith('/api/admin')) {
    // Asegúrate de que headers no sea undefined
    config.headers = config.headers ?? {};
    // @ts-ignore: forzamos que Authorization exista
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
