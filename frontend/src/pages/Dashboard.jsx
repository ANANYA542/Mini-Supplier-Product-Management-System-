import { useEffect, useState } from 'react';
import { getSummary } from '../services/api';
import { CategoryBarChart, CertificationPieChart } from '../components/dashboard/OverviewCharts';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getSummary();
        setData(res.data);
      } catch (err) {
        setError("Failed to load dashboard. Free-tier backend might be sleeping (approx 60s wake-up).");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loader text="Loading Dashboard..." />;
  if (error) return <ErrorMessage message={error} />;

  const { totalSuppliers, totalProducts, productsByCategory, certificationStats } = data;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Dashboard Overview</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100/50 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Suppliers</h2>
            <p className="text-5xl font-bold text-gray-800 mt-2">{totalSuppliers}</p>
          </div>
          <div className="bg-orange-100 p-4 rounded-full text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100/50 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Products</h2>
            <p className="text-5xl font-bold text-gray-800 mt-2">{totalProducts}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

        <div className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] min-h-[400px]">
           <div className="flex justify-between items-center mb-6">
             <div>
                <h3 className="text-lg font-bold text-gray-800">Products by Category</h3>
                <p className="text-xs text-gray-400 mt-1">Inventory distribution</p>
             </div>
           </div>
           
           <CategoryBarChart data={productsByCategory} />
        </div>


        <div className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                  <h3 className="text-lg font-bold text-gray-800">Certification Status</h3>
                  <p className="text-xs text-gray-400 mt-1">Compliance overview</p>
              </div>
            </div>

            <CertificationPieChart data={certificationStats} />
        </div>
      </div>
    </div>
  );
}
