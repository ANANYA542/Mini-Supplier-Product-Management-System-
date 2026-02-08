export default function ProductFilters({ filters, onChange }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-orange-50/50">
        <select 
            name="category" 
            className="border border-gray-200 bg-gray-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm font-medium text-gray-700"
            onChange={onChange}
            value={filters.category}
        >
          <option value="">All Categories</option>
          <option value="Organic Food">Organic Food</option>
          <option value="Handmade">Handmade</option>
          <option value="Sustainable Goods">Sustainable Goods</option>
        </select>
  
        <select 
            name="certification_status" 
            className="border border-gray-200 bg-gray-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm font-medium text-gray-700"
            onChange={onChange}
            value={filters.certification_status}
        >
          <option value="">All Statuses</option>
          <option value="Certified">Certified</option>
          <option value="Pending">Pending</option>
          <option value="Not Certified">Not Certified</option>
        </select>
        
        <div className="md:col-span-2 relative">
           <input 
              name="search"
              className="w-full border border-gray-200 bg-gray-50 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm font-medium"
              placeholder="Search products..."
              onChange={onChange}
              value={filters.search}
           />
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
        </div>
      </div>
    );
  }
