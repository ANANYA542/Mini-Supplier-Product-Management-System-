import { useState, useEffect, useCallback } from 'react';
import { getSuppliers, addSupplier } from '../services/api';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuppliers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch suppliers.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const addNewSupplier = async (supplierData) => {
    try {
      await addSupplier(supplierData);
      await fetchSuppliers();
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Error adding supplier.' };
    }
  };

  return {
    suppliers,
    isLoading,
    error,
    fetchSuppliers,
    addNewSupplier
  };
};
