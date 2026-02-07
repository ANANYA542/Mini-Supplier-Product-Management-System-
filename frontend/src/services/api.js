import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const getSuppliers = () => api.get('/suppliers');
export const addSupplier = (supplier) => api.post('/suppliers', supplier);
export const getProducts = (params) => api.get('/products', { params });
export const addProduct = (product) => api.post('/products', product);

export default api;
