import { useEffect, useState } from 'react';
import { getSuppliers, addSupplier } from '../services/api';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', country: '', contact_person: '', phone: '' });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }

  const itemsPerPage = 5;

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setIsLoading(true);
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
      setNotification({ type: 'error', message: 'Failed to fetch suppliers.' });
    } finally {
      setIsLoading(false);
    }
  };

  const validate = () => {
    if (!form.email.includes('@')) {
      setNotification({ type: 'error', message: 'Invalid email address.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await addSupplier(form);
      setForm({ name: '', email: '', country: '', contact_person: '', phone: '' });
      fetchSuppliers();
      setNotification({ type: 'success', message: 'Supplier added successfully!' });
      

      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: 'Error adding supplier. Please check your inputs.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const inputClass = "border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Suppliers Management</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Add New Supplier</h2>
        
        {notification && (
          <div className={`p-3 mb-4 rounded-md text-sm ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <input className={inputClass} placeholder="Company Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className={inputClass} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input className={inputClass} placeholder="Country" value={form.country} onChange={e => setForm({...form, country: e.target.value})} required />
          <input className={inputClass} placeholder="Contact Person" value={form.contact_person} onChange={e => setForm({...form, contact_person: e.target.value})} required />
          <input className={inputClass} placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
          <div className="flex items-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full font-medium shadow-sm disabled:bg-blue-300"
            >
              {isSubmitting ? 'Adding...' : '+ Add Supplier'}
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input 
          className="border border-gray-300 p-2 rounded-md shadow-sm w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          placeholder="Search suppliers..." 
          value={search} 
          onChange={e => { setSearch(e.target.value); setPage(1); }} 
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold">Company Name</th>
              <th className="p-4 font-semibold">Country</th>
              <th className="p-4 font-semibold">Contact Person</th>
              <th className="p-4 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
               <tr><td colSpan="4" className="p-8 text-center text-gray-500">Loading suppliers...</td></tr>
            ) : displayed.length > 0 ? (
              displayed.map(s => (
                <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{s.name}</td>
                  <td className="p-4 text-gray-600">{s.country}</td>
                  <td className="p-4 text-gray-600">
                    <div className="flex flex-col">
                      <span>{s.contact_person}</span>
                      <span className="text-xs text-gray-400">{s.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 text-blue-600 text-sm hover:underline cursor-pointer">{s.email}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="p-8 text-center text-gray-500 italic">No suppliers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex gap-3 justify-center items-center">
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
