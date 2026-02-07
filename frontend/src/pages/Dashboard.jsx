import { useEffect, useState } from 'react';
import { getSuppliers, getProducts } from '../services/api';

export default function Dashboard() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState({ total: 0, data: [] });

  useEffect(() => {
    getSuppliers().then((res) => setSuppliers(res.data));
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-100 p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Suppliers</h2>
          <p className="text-4xl font-semibold">{suppliers.length}</p>
        </div>
        <div className="bg-green-100 p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Products</h2>
          <p className="text-4xl font-semibold">{products.total}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Suppliers</h2>
          <div className="bg-white border rounded shadow-sm">
            {suppliers.slice(-3).reverse().map((s) => (
              <div key={s._id} className="p-3 border-b last:border-0 flex justify-between">
                <span className="font-medium">{s.name}</span>
                <span className="text-gray-500 text-sm">{s.country}</span>
              </div>
            ))}
            {suppliers.length === 0 && <p className="p-4 text-gray-500">No suppliers yet.</p>}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Products</h2>
          <div className="bg-white border rounded shadow-sm">
            {products.data.slice(0, 3).map((p) => (
              <div key={p._id} className="p-3 border-b last:border-0 flex justify-between">
                <span className="font-medium">{p.name}</span>
                <span className="text-gray-500 text-sm">${p.price}</span>
              </div>
            ))}
            {products.data.length === 0 && <p className="p-4 text-gray-500">No products yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
