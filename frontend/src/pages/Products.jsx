import { useEffect, useState } from 'react';
import { getProducts, addProduct, getSuppliers } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock_quantity: '',
    category: 'Organic Food',
    supplier_id: '',
    certification_status: 'Pending',
    description: ''
  });
  const [filters, setFilters] = useState({ category: '', certification_status: '', search: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, message }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
      if (res.data.length > 0) {
        setForm(prev => ({ ...prev, supplier_id: res.data[0]._id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = { page, ...filters };
      Object.keys(params).forEach(key => !params[key] && delete params[key]);
      
      const res = await getProducts(params);
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: 'Failed to load products.' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (form.price <= 0) return "Price must be greater than 0.";
    if (form.stock_quantity < 0) return "Stock cannot be negative.";
    if (!form.supplier_id) return "Please select a supplier.";
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    
    const errorMsg = validateForm();
    if (errorMsg) {
      setFeedback({ type: 'error', message: errorMsg });
      return;
    }

    try {
      setSubmitting(true);
      await addProduct(form);
      setForm({
        name: '', price: '', stock_quantity: '', category: 'Organic Food',
        supplier_id: suppliers[0]?._id || '', certification_status: 'Pending', description: ''
      });
      fetchProducts();
      setFeedback({ type: 'success', message: 'Product added successfully!' });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setFeedback({ type: 'error', message: 'Error adding product.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const inputClass = "border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full";
  const selectClass = "border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full bg-white";

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Catalog</h1>


      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Add New Product</h2>
        
        {feedback && (
          <div className={`p-3 mb-4 rounded text-sm ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input className={inputClass} placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className={inputClass} placeholder="Price ($)" type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className={inputClass} placeholder="Stock Qty" type="number" value={form.stock_quantity} onChange={e => setForm({...form, stock_quantity: e.target.value})} required />
          
          <select className={selectClass} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="Organic Food">Organic Food</option>
            <option value="Handmade">Handmade</option>
            <option value="Sustainable Goods">Sustainable Goods</option>
          </select>

          <select className={selectClass} value={form.supplier_id} onChange={e => setForm({...form, supplier_id: e.target.value})} required>
            <option value="" disabled>Select Supplier</option>
            {suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>

          <select className={selectClass} value={form.certification_status} onChange={e => setForm({...form, certification_status: e.target.value})}>
            <option value="Certified">Certified</option>
            <option value="Pending">Pending</option>
            <option value="Not Certified">Not Certified</option>
          </select>

          <textarea className={`${inputClass} md:col-span-2 lg:col-span-2`} placeholder="Description (optional)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          
          <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-2">
            <button 
              type="submit" 
              disabled={submitting}
              className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 shadow-sm font-medium transition-colors disabled:bg-green-300"
            >
              {submitting ? 'Saving...' : '+ Add Product'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <input 
            className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-green-500 focus:outline-none" 
            placeholder="Search products..." 
            name="search"
            value={filters.search} 
            onChange={handleFilterChange} 
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="border border-gray-300 p-2 rounded-md bg-white text-sm" name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="Organic Food">Organic Food</option>
            <option value="Handmade">Handmade</option>
            <option value="Sustainable Goods">Sustainable Goods</option>
          </select>
          <select className="border border-gray-300 p-2 rounded-md bg-white text-sm" name="certification_status" value={filters.certification_status} onChange={handleFilterChange}>
            <option value="">All Statuses</option>
            <option value="Certified">Certified</option>
            <option value="Pending">Pending</option>
            <option value="Not Certified">Not Certified</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading products...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p._id} className="bg-white border boundary-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col h-full">
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{p.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    p.certification_status === 'Certified' ? 'bg-green-100 text-green-800' : 
                    p.certification_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {p.certification_status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{p.category}</p>
                
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-2xl font-bold text-gray-900">${p.price}</span>
                  <span className="text-sm text-gray-500">Stock: {p.stock_quantity}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-bold">
                    {p.supplier_id?.name ? p.supplier_id.name.charAt(0) : '?'}
                  </div>
                  <span className="text-sm text-gray-600 truncate flex-1">{p.supplier_id?.name || 'Unknown Supplier'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
        
      {!loading && products.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-6">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}


      {totalPages > 1 && (
        <div className="mt-8 flex gap-3 justify-center items-center">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm font-medium"
          >
            Previous
          </button>
          <span className="text-gray-600 text-sm font-medium">Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm font-medium"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
