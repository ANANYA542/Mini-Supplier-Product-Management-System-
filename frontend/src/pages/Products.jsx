import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useSuppliers } from '../hooks/useSuppliers';
import ProductFilters from '../components/products/ProductFilters';
import ProductCard from '../components/products/ProductCard';
import ProductFormModal from '../components/products/ProductFormModal';
import Loader from '../components/common/Loader';

export default function Products() {
  const { 
    products, 
    totalPages, 
    loading, 
    error: productsError, 
    fetchProducts, 
    addNewProduct, 
    updateProductInfo, 
    removeProduct 
  } = useProducts();
  
  const { suppliers, fetchSuppliers } = useSuppliers();

  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({ 
      category: '', 
      certification_status: '', 
      search: '',
      supplier_id: searchParams.get('supplier_id') || ''
  });
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Removed redundant fetchSuppliers call. internal hook manages it if needed, or we rely on initial load.
  // Actually, useSuppliers hook auto-fetches on mount.
  // We can just rely on that.

  useEffect(() => {
    const supplierId = searchParams.get('supplier_id');
    if (supplierId && supplierId !== filters.supplier_id) {
        setFilters(prev => ({ ...prev, supplier_id: supplierId }));
    } else if (!supplierId && filters.supplier_id) {
        setFilters(prev => ({ ...prev, supplier_id: '' }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts({ page, limit: 3, ...filters });
  }, [page, filters, fetchProducts]);

  useEffect(() => {
    if (productsError) {
        setFeedback({ type: 'error', message: productsError });
    }
  }, [productsError]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

    const handleCreate = async (data) => {
    const result = await addNewProduct(data);
    if (result.success) {
        setFeedback({ type: 'success', message: 'Product added successfully!' });
        fetchProducts({ page, limit: 3, ...filters });
        setTimeout(() => setFeedback(null), 3000);
        return { success: true };
    } else {
        return { success: false, error: result.error };
    }
  };

  const handleUpdate = async (data) => {
    const result = await updateProductInfo(data._id, data);
    if (result.success) {
        setFeedback({ type: 'success', message: 'Product updated successfully!' });
        fetchProducts({ page, limit: 3, ...filters });
        setTimeout(() => setFeedback(null), 3000);
        return { success: true };
    } else {
        return { success: false, error: result.error };
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const result = await removeProduct(id);
    if (result.success) {
        setFeedback({ type: 'success', message: 'Product deleted.' });
        fetchProducts({ page, limit: 3, ...filters });
        setTimeout(() => setFeedback(null), 2000);
    } else {
        setFeedback({ type: 'error', message: result.error });
    }
  };

  const openEditModal = (product) => {
    setEditData(product);
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Product Catalog</h1>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          Showing <span className="font-bold text-orange-500">{products.length}</span> items
        </div>
      </div>

    
      <div className="bg-white p-8 rounded-3xl shadow-lg shadow-orange-100/50 border border-white mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400"></div>
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
            Manage Products
            </h2>
            <button 
                onClick={() => { setEditData(null); setShowModal(true); }}
                className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all font-bold text-sm tracking-wide transform active:scale-95"
            >
                + Add New Product
            </button>
        </div>
        
        {feedback && (
          <div className={`mt-6 p-4 rounded-2xl text-sm font-medium flex items-center gap-3 shadow-sm ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {feedback.message}
          </div>
        )}
      </div>

      <ProductFilters filters={filters} onChange={handleFilterChange} />



      {loading ? (
        <Loader text="Loading products..." />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <ProductCard 
                key={p._id} 
                product={p} 
                onEdit={openEditModal} 
                onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
        
      {!loading && products.length === 0 && (
        <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-200 mt-6">
          <p className="text-gray-400 font-medium">No products found matching your criteria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2 pb-10">
           <button 
             disabled={page === 1} 
             onClick={() => setPage(page - 1)}
             className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
           >
             ←
           </button>
           <span className="text-sm font-bold text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
             Page {page} / {totalPages}
           </span>
           <button 
             disabled={page === totalPages} 
             onClick={() => setPage(page + 1)}
             className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
           >
             →
           </button>
        </div>
      )}

      {showModal && (
        <ProductFormModal 
            initialData={editData}
            suppliers={suppliers}
            onClose={() => setShowModal(false)}
            onSubmit={editData ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
}
