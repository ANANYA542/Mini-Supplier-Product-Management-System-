import { useState, useCallback } from 'react';
import { getProducts, addProduct, updateProduct } from '../services/api'; 

import api from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (params) => {
    try {
      setLoading(true);
      setError(null);
      // Clean params
      const cleanParams = { ...params };
      if (cleanParams.search) cleanParams.search = cleanParams.search.trim();
      Object.keys(cleanParams).forEach(key => !cleanParams[key] && delete cleanParams[key]);

      const res = await getProducts(cleanParams);
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addNewProduct = async (productData) => {
    try {
      const cleanData = {
        ...productData,
        name: productData.name.trim(),
        description: productData.description?.trim()
      };
      await addProduct(cleanData);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Error adding product.' };
    }
  };

  const updateProductInfo = async (id, productData) => {
    try {
      const cleanData = {
        ...productData,
        name: productData.name.trim()
      };
      await updateProduct(id, cleanData);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Failed to update product.' };
    }
  };

  const removeProduct = async (id) => {
    try {
        await api.delete(`/products/${id}`);
        return { success: true };
    } catch (err) {
        console.error(err);
        return { success: false, error: 'Failed to delete.' };
    }
  };

  return {
    products,
    totalPages,
    loading,
    error,
    fetchProducts,
    addNewProduct,
    updateProductInfo,
    removeProduct
  };
};
