import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers';
import Products from './pages/Products';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-6 pt-24">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
