import { useEffect, useState } from 'react';
import { getSuppliers, addSupplier } from '../services/api';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', country: '', contact_person: '', phone: '' });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSupplier(form);
      setForm({ name: '', email: '', country: '', contact_person: '', phone: '' });
      fetchSuppliers();
      alert('Supplier added!');
    } catch (err) {
      alert('Error adding supplier');
    }
  };

  const filtered = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Add Supplier</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Country" value={form.country} onChange={e => setForm({...form, country: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Contact Person" value={form.contact_person} onChange={e => setForm({...form, contact_person: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Supplier</button>
        </form>
      </div>

      <div className="mb-4">
        <input 
          className="border p-2 rounded w-full md:w-1/3" 
          placeholder="Search suppliers..." 
          value={search} 
          onChange={e => { setSearch(e.target.value); setPage(1); }} 
        />
      </div>

      <div className="border rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Country</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map(s => (
              <tr key={s._id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3">{s.country}</td>
                <td className="p-3">{s.contact_person} ({s.phone})</td>
                <td className="p-3 text-blue-600">{s.email}</td>
              </tr>
            ))}
            {displayed.length === 0 && (
              <tr><td colSpan="4" className="p-4 text-center text-gray-500">No suppliers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2 justify-center">
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
