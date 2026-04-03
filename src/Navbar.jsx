import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-0 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src="/images/brand-icon.png" alt="CheckoutDen" className="h-20 w-auto" />
          <span className="text-lg font-bold text-gray-900">CheckoutDen</span>
        </Link>
      </div>
    </nav>
  );
}
