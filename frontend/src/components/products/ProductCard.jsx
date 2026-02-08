export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group border border-gray-100">
        <div className="h-48 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
                <div className="text-4xl font-black text-orange-200 tracking-tighter opacity-70 transform rotate-12 select-none">
                    {product.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
                </div>
                <div className="absolute top-3 right-3">
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm ${
                    product.certification_status === 'Certified' ? 'bg-white text-green-600' : 
                    product.certification_status === 'Pending' ? 'bg-white text-yellow-600' : 'bg-white text-gray-600'
                }`}>
                    {product.certification_status}
                </span>
                {product.certification_expiry_date && (
                    <div className="text-[9px] text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full mt-1 text-center font-medium">
                        Exp: {new Date(product.certification_expiry_date).toLocaleDateString()}
                    </div>
                )}
                </div>
        </div>
        
        <div className="p-6">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-orange-500 transition-colors">{product.name}</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4 bg-gray-50 inline-block px-2 py-1 rounded-md">{product.category}</p>
        
        <div className="flex justify-between items-end mt-4">
            <div>
            <p className="text-xs text-gray-400 mb-1">Price</p>
            <span className="text-2xl font-bold text-gray-800">${product.price}/{product.unit}</span>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Stock</p>
            <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">{product.stock_quantity} {product.unit}</span>
            <div className="flex gap-2 mt-2 justify-end">
                <button 
                    onClick={() => onEdit(product)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Product"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button 
                    onClick={() => onDelete(product._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Product"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold border border-white shadow-sm">
            {product.supplier_id?.name ? product.supplier_id.name.charAt(0) : '?'}
            </div>
            <span className="text-xs text-gray-500 truncate flex-1 font-medium">{product.supplier_id?.name || 'Unknown Supplier'}</span>
        </div>
        </div>
    </div>
  );
}
