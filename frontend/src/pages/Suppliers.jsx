
import { useState } from 'react';
import { useSuppliers } from '../hooks/useSuppliers';
import SupplierFormModal from '../components/suppliers/SupplierFormModal';
import SupplierTable from '../components/suppliers/SupplierTable';
import SupplierProductModal from '../components/suppliers/SupplierProductModal';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

export default function Suppliers() {
  const { suppliers, isLoading, addNewSupplier } = useSuppliers();
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const itemsPerPage = 5;

  const handleCreateSupplier = async (supplierData) => {
    const result = await addNewSupplier(supplierData);
    if (result.success) {
        setNotification({ type: 'success', message: 'Supplier added successfully!' });
        setTimeout(() => setNotification(null), 3000);
        return { success: true };
    } else {
        return { success: false, error: result.error };
    }
  };

  const handleViewProducts = (supplier, e) => {
    e.stopPropagation();
    setSelectedSupplier(supplier);
    setShowProductModal(true);
  };

  const filtered = suppliers.filter(s => 
    s.name.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Suppliers</h1>
           <p className="text-gray-500 mt-1">Manage your supplier partnerships</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all transform active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Supplier
        </button>
      </div>

      {notification && (
          <div className={`p-4 mb-6 rounded-2xl text-sm font-medium flex items-center gap-3 shadow-sm ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {notification.message}
          </div>
      )}

      {showModal && (
        <SupplierFormModal 
            onClose={() => setShowModal(false)}
            onSubmit={handleCreateSupplier}
        />
      )}

      {showProductModal && (
        <SupplierProductModal 
            supplier={selectedSupplier}
            onClose={() => setShowProductModal(false)}
        />
      )}

      <div className="mb-6 flex gap-3">
        <input 
          className="border border-gray-200 bg-white p-3 rounded-full shadow-sm w-full md:w-1/3 focus:ring-2 focus:ring-orange-200 focus:outline-none pl-5 text-sm" 
          placeholder="Search by Company Name.." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && setAppliedSearch(search.trim())}
        />
        <button 
          onClick={() => setAppliedSearch(search.trim())}
          className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-700 transition-colors shadow-sm"
        >
          Search
        </button>
        {appliedSearch && (
            <button 
            onClick={() => { setSearch(''); setAppliedSearch(''); }}
            className="text-red-500 text-sm font-bold hover:underline"
            >
            Clear
            </button>
        )}
      </div>

      <SupplierTable 
        suppliers={displayed} 
        isLoading={isLoading} 
        onViewProducts={handleViewProducts} 
      />

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
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
    </div>
  );
}
