import { useEffect, useState } from 'react';
import { getSuppliers, getProducts } from '../services/api';

export default function Dashboard() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState({ total: 0, data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [suppliersRes, productsRes] = await Promise.all([
          getSuppliers(),
          getProducts()
        ]);
        setSuppliers(suppliersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError("Failed to load dashboard data. Please check the backend.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-8 text-gray-500">Loading dashboard...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Suppliers</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{suppliers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Products</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{products.total}</p>
        </div>
      </div>


      <div className="grid md:grid-cols-2 gap-8">
      
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
             <h2 className="text-lg font-semibold text-gray-700">Recent Suppliers</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {suppliers.slice(-3).reverse().map((s) => (
              <div key={s._id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.contact_person}</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{s.country}</span>
              </div>
            ))}
            {suppliers.length === 0 && <p className="p-6 text-gray-400 text-center">No suppliers yet.</p>}
          </div>
        </div>
        

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">New Products</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {products.data.slice(0, 3).map((p) => (
              <div key={p._id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category}</p>
                </div>
                <span className="font-bold text-green-600">${p.price}</span>
              </div>
            ))}
            {products.data.length === 0 && <p className="p-6 text-gray-400 text-center">No products yet.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
