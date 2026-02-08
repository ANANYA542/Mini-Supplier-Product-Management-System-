import { useState } from 'react';

export default function SupplierFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', country: '', contact_person: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const inputClass = "border border-gray-200 bg-gray-50/50 p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all w-full text-sm";

  const validate = () => {
    if (!form.email.includes('@')) {
      setError('Invalid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const cleanForm = {
        name: form.name.trim(),
        email: form.email.trim(),
        country: form.country.trim(),
        contact_person: form.contact_person.trim(),
        phone: form.phone.trim()
      };
      
      const result = await onSubmit(cleanForm);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Error adding supplier.');
      }
    } catch (err) {
      console.error(err);
      setError('Error adding supplier. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-[fadeIn_0.2s_ease-out]">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-300 hover:text-gray-600 transition-colors">✕</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Supplier</h2>
        
        {error && (
            <div className="p-3 mb-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-100">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
             <label className="text-xs font-semibold text-gray-500 ml-3">Company Name</label>
             <input className={inputClass} placeholder="e.g. Global Tech" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-semibold text-gray-500 ml-3">Email Address</label>
             <input className={inputClass} placeholder="supplier@example.com" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-semibold text-gray-500 ml-3">Country</label>
             <input className={inputClass} placeholder="e.g. USA" value={form.country} onChange={e => setForm({...form, country: e.target.value})} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-3">Contact Person</label>
                <input className={inputClass} placeholder="Name" value={form.contact_person} onChange={e => setForm({...form, contact_person: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-3">Phone</label>
                <input className={inputClass} placeholder="Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
              </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-full text-gray-500 hover:bg-gray-100 font-bold text-sm">Cancel</button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-full font-bold text-sm shadow-md transition-all disabled:opacity-70"
            >
              {isSubmitting ? 'Adding...' : 'Add Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
