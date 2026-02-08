import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const linkClass = (path) => 
    `px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
      location.pathname === path 
        ? 'bg-orange-100 text-orange-600 shadow-sm' 
        : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-orange-100/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-bold shadow-md">
            G
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">GreenTrade<span className="text-orange-500">Hub</span></span>
        </div>
        <ul className="flex gap-2">
          <li><Link to="/" className={linkClass("/")}>Dashboard</Link></li>
          <li><Link to="/suppliers" className={linkClass("/suppliers")}>Suppliers</Link></li>
          <li><Link to="/products" className={linkClass("/products")}>Products</Link></li>
        </ul>
      </div>
    </nav>
  );
}
