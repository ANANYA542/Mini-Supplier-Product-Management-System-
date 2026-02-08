
export default function SupplierTable({ suppliers, isLoading, onViewProducts }) {
  if (isLoading) {
    return (
        <div className="bg-white rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden p-10 text-center text-gray-400 animate-pulse">
            Loading suppliers...
        </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <th className="px-8 py-5">Supplier Name</th>
            <th className="px-8 py-5">Contact Person</th>
            <th className="px-8 py-5">Phone</th>
            <th className="px-8 py-5">Country</th>
            <th className="px-8 py-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {suppliers.length > 0 ? (
            suppliers.map((s) => (
              <tr 
                  key={s._id} 
                  className="hover:bg-orange-50/50 transition-colors group"
              >
                <td className="px-8 py-5">
                  <div className="font-bold text-gray-800 text-sm">{s.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.email}</div>
                </td>
                <td className="px-8 py-5">
                  <div className="text-gray-600 text-sm">{s.contact_person}</div>
                </td>
                <td className="px-8 py-5">
                  <div className="text-gray-600 text-sm">{s.phone}</div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-gray-600 text-sm">{s.country}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button 
                      onClick={(e) => onViewProducts(s, e)}
                      className="text-gray-400 hover:text-orange-500 font-bold text-xs bg-gray-50 hover:bg-orange-50 px-3 py-1.5 rounded-full transition-all"
                  >
                      View Products
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3" className="p-10 text-center text-gray-400 italic">No suppliers found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
