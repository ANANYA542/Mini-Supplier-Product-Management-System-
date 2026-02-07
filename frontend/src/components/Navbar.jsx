import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const linkClass = (path) => 
    `px-4 py-2 rounded-md transition-colors ${
      location.pathname === path 
        ? 'bg-blue-700 text-white font-medium' 
        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
    }`;

  return (
    <nav className="bg-blue-900 shadow-md mb-8">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-wide">
          Inventory<span className="text-blue-300">App</span>
        </div>
        <ul className="flex gap-4">
          <li><Link to="/" className={linkClass("/")}>Dashboard</Link></li>
          <li><Link to="/suppliers" className={linkClass("/suppliers")}>Suppliers</Link></li>
          <li><Link to="/products" className={linkClass("/products")}>Products</Link></li>
        </ul>
      </div>
    </nav>
  );
}
