import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const dark = pathname === '/';

  return (
    <nav className={`w-full backdrop-blur sticky top-0 z-50 border-b ${dark ? 'bg-gray-950/80 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
      <div className="max-w-6xl mx-auto px-4 py-0 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src="/images/brand-icon.png" alt="CheckoutDen" className="h-20 w-auto" />
          <span className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>CheckoutDen</span>
        </Link>
      </div>
    </nav>
  );
}
