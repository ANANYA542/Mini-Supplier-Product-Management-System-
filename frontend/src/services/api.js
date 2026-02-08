import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
    // baseURL: 'http://localhost:8000'
});

export const getSuppliers = () => api.get('/suppliers');
export const addSupplier = (supplier) => api.post('/suppliers', supplier);
export const getProducts = (params) => api.get('/products', { params });
export const addProduct = (product) => api.post('/products', product);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const getSummary = () => api.get('/analytics/summary');

export default api;
