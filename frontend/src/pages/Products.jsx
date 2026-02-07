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
      const params = { page, ...filters };

      Object.keys(params).forEach(key => !params[key] && delete params[key]);
      
      const res = await getProducts(params);
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(form);
      alert('Product added!');
      setForm({
        name: '', price: '', stock_quantity: '', category: 'Organic Food',
        supplier_id: suppliers[0]?._id || '', certification_status: 'Pending', description: ''
      });
      fetchProducts();
    } catch (err) {
      alert('Error adding product');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>


      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Add Product</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Price" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Stock" type="number" value={form.stock_quantity} onChange={e => setForm({...form, stock_quantity: e.target.value})} required />
          
          <select className="border p-2 rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="Organic Food">Organic Food</option>
            <option value="Handmade">Handmade</option>
            <option value="Sustainable Goods">Sustainable Goods</option>
          </select>

          <select className="border p-2 rounded" value={form.supplier_id} onChange={e => setForm({...form, supplier_id: e.target.value})} required>
            <option value="" disabled>Select Supplier</option>
            {suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>

          <select className="border p-2 rounded" value={form.certification_status} onChange={e => setForm({...form, certification_status: e.target.value})}>
            <option value="Certified">Certified</option>
            <option value="Pending">Pending</option>
            <option value="Not Certified">Not Certified</option>
          </select>

          <textarea className="border p-2 rounded md:col-span-2" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          
          <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 md:col-start-2">Add Product</button>
        </form>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input 
          className="border p-2 rounded flex-grow" 
          placeholder="Search.." 
          name="search"
          value={filters.search} 
          onChange={handleFilterChange} 
        />
        <select className="border p-2 rounded" name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Organic Food">Organic Food</option>
          <option value="Handmade">Handmade</option>
          <option value="Sustainable Goods">Sustainable Goods</option>
        </select>
        <select className="border p-2 rounded" name="certification_status" value={filters.certification_status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="Certified">Certified</option>
          <option value="Pending">Pending</option>
          <option value="Not Certified">Not Certified</option>
        </select>
      </div>

      {/* Products List */}
      <div className="grid md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded shadow-sm hover:shadow-md bg-white">
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{p.category}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-green-700">${p.price}</span>
              <span className={`text-xs px-2 py-1 rounded ${p.certification_status === 'Certified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {p.certification_status}
              </span>
            </div>
            <p className="text-sm text-gray-500">Stock: {p.stock_quantity}</p>
            <p className="text-sm text-gray-500">Supplier: {p.supplier_id?.name || 'Unknown'}</p>
          </div>
        ))}
      </div>
        
      {products.length === 0 && <p className="text-center text-gray-500 mt-8">No products found.</p>}

      {totalPages > 1 && (
        <div className="mt-6 flex gap-2 justify-center">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
