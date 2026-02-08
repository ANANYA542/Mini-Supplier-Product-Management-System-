import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";

export default function SupplierProductModal({ supplier, onClose }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await getProducts({ supplier_id: supplier._id });
            setProducts(res.data.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    if (supplier) {
        fetchProducts();
    }
  }, [supplier]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative animate-[fadeIn_0.2s_ease-out] max-h-[80vh] flex flex-col">
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-300 hover:text-gray-600 transition-colors">✕</button>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Products from {supplier?.name}</h2>
                <p className="text-gray-500 text-sm">{supplier?.country} • {supplier?.contact_person}</p>
            </div>
            
            <div className="overflow-y-auto pr-2 flex-1">
                {loading ? (
                    <div className="text-center py-10 text-gray-400 animate-pulse">Loading products...</div>
                ) : error ? (
                    <div className="text-center py-10 text-red-400">{error}</div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map(p => (
                            <div key={p._id} className="border border-gray-100 rounded-2xl p-4 flex gap-4 items-center hover:bg-orange-50/30 transition-colors">
                                <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center text-orange-300 font-black text-xl flex-shrink-0">
                                    {p.name.substring(0,2).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{p.name}</h4>
                                    <p className="text-xs text-gray-500">{p.category}</p>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">₹{p.price}</span>
                                        <span className="text-[10px] font-medium text-gray-500 border border-gray-200 px-2 py-0.5 rounded-md">Stock: {p.stock_quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        No products found for this supplier.
                    </div>
                )}
            </div>
            <div className="pt-6 mt-4 border-t border-gray-50 text-right">
                <button onClick={onClose} className="px-6 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold text-sm transition-colors">Close</button>
            </div>
        </div>
    </div>
  );
}
