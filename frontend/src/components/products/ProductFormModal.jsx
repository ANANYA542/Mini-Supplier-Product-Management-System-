import { useState, useEffect } from "react";

export default function ProductFormModal({ initialData, suppliers, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock_quantity: '',
    unit: 'kg',
    category: 'Organic Food',
    supplier_id: '',
    certification_status: 'Pending',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
        setForm({ ...initialData, supplier_id: initialData.supplier_id?._id || initialData.supplier_id });
    } else if (suppliers.length > 0) {
        setForm(f => ({ ...f, supplier_id: suppliers[0]._id }));
    }
  }, [initialData, suppliers]);

  const inputClass = "border border-gray-200 bg-gray-50/50 p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all w-full text-sm";
  const selectClass = "border border-gray-200 bg-gray-50/50 p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all w-full text-sm appearance-none";

  const validateForm = () => {
    if (form.price <= 0) return "Price must be greater than 0.";
    if (form.stock_quantity < 0) return "Stock cannot be negative.";
    if (!form.supplier_id) return "Please select a supplier.";
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
        setIsSubmitting(true);
        const result = await onSubmit(form);
        if (result.success) {
            onClose();
        } else {
            setError(result.error);
        }
    } catch (err) {
        console.error(err);
        setError("Error saving product.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative animate-[fadeIn_0.2s_ease-out]">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-300 hover:text-gray-600 transition-colors">
            ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
        
        {error && (
            <div className="p-3 mb-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-100">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-3">Product Name</label>
                <input className={inputClass} placeholder="e.g. Bamboo Toothbrush" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-3">Price ($)</label>
                <input className={inputClass} placeholder="0.00" type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            </div>
            <div className="flex gap-2">
            <div className="space-y-1 w-2/3">
                <label className="text-xs font-semibold text-gray-500 ml-3">Stock Qty</label>
                <input className={inputClass} placeholder="0" type="number" value={form.stock_quantity} onChange={e => setForm({...form, stock_quantity: e.target.value})} required />
            </div>
            <div className="space-y-1 w-1/3">
                <label className="text-xs font-semibold text-gray-500 ml-3">Unit</label>
                <select className={selectClass} value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="pcs">pcs</option>
                    <option value="ltr">ltr</option>
                </select>
            </div>
            </div>
            
            <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-gray-500 ml-3">Category</label>
            <select className={selectClass} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="Organic Food">Organic Food</option>
                <option value="Handmade">Handmade</option>
                <option value="Sustainable Goods">Sustainable Goods</option>
            </select>
            </div>

            <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-gray-500 ml-3">Supplier</label>
            <select className={selectClass} value={form.supplier_id} onChange={e => setForm({...form, supplier_id: e.target.value})} required>
                <option value="" disabled>Select Supplier</option>
                {suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            </div>

            <div className="space-y-1 relative">
                <label className="text-xs font-semibold text-gray-500 ml-3">Status</label>
                <select className={selectClass} value={form.certification_status} onChange={e => setForm({...form, certification_status: e.target.value})}>
                <option value="Certified">Certified</option>
                <option value="Pending">Pending</option>
                <option value="Not Certified">Not Certified</option>
            </select>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-3">Expiry Date</label>
                <input 
                    type="date" 
                    className={inputClass} 
                    value={form.certification_expiry_date ? new Date(form.certification_expiry_date).toISOString().split('T')[0] : ''} 
                    onChange={e => setForm({...form, certification_expiry_date: e.target.value})} 
                />
            </div>

            <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-3">Description</label>
                <input className={inputClass} placeholder="Short description (optional)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            
            <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={onClose} className="px-6 py-2 rounded-full text-gray-500 hover:bg-gray-100 font-bold text-sm">Cancel</button>    
                <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-8 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all font-bold text-sm tracking-wide disabled:opacity-70 transform active:scale-95"
                >
                {isSubmitting ? 'Saving...' : (initialData ? 'Save Changes' : '+ Create Product')}
                </button>
            </div>
        </form>
        </div>
    </div>
  );
}
