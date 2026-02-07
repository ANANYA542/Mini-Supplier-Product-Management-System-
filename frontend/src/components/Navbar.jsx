import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white mb-6">
      <ul className="flex gap-6">
        <li><Link to="/" className="hover:text-gray-300">Dashboard</Link></li>
        <li><Link to="/suppliers" className="hover:text-gray-300">Suppliers</Link></li>
        <li><Link to="/products" className="hover:text-gray-300">Products</Link></li>
      </ul>
    </nav>
  );
}
