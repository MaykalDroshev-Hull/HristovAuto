'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('logged') === 'true';
    const userData = localStorage.getItem('userObject');
    
    setIsLoggedIn(loggedIn);
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get cart items count
    const cartCount = localStorage.getItem('cart-total-items') || '0';
    setCartItems(parseInt(cartCount));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('userObject');
    localStorage.removeItem('userid');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/');
  };

  const categories = [
    { name: t.categories.exterior, href: '/products?category=exterior' },
    { name: t.categories.interior, href: '/products?category=interior' },
    { name: 'Производителност', href: '/products?category=performance' },
    { name: t.categories.wheelsAndTyres, href: '/products?category=wheels%20and%20tyres' },
    { name: t.categories.carBodyParts, href: '/products?category=car%20body%20parts' },
    { name: 'Ремонтни части', href: '/products?category=repair%20parts' },
    { name: t.categories.electronics, href: '/products?category=electronics' },
    { name: t.categories.toolsAndGarage, href: '/products?category=tools%20and%20garage' },
  ];

  return (
    <>
      {/* Top Navigation */}
      <div className="bg-gray-100 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-4">
              <Link href="#" className="hover:text-primary-600 transition-colors">
                {t.nav.help}
              </Link>
              <div className="w-px h-4 bg-gray-300"></div>
              <Link href="#" className="hover:text-primary-600 transition-colors">
                {t.nav.orderStatus}
              </Link>
            </div>
            <div className="hidden md:block">
              <span className="font-semibold">{t.nav.freeShipping}</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-phone text-gray-500"></i>
              <span>{t.nav.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                Христов АУТО
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.nav.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </div>

            {/* Right side navigation */}
            <div className="flex items-center space-x-4">
              {/* User Account */}
              {isLoggedIn ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                    <User size={20} />
                    <span className="hidden sm:block">Здравей, {user?.name || 'Потребител'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t.nav.myAccount}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t.nav.logout}
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="font-semibold text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {t.nav.login}
                </Link>
              )}

              {/* Garage */}
              <Link href="#" className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                <span>{t.nav.garage}</span>
                <i className="fa-solid fa-angle-down text-xs"></i>
              </Link>

              {/* Favorites */}
              <Link href="/favorites" className="relative text-gray-700 hover:text-primary-600 transition-colors">
                <Heart size={20} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative text-gray-700 hover:text-primary-600 transition-colors">
                <ShoppingCart size={20} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Category Navigation - Desktop */}
          <div className="hidden md:block border-t border-gray-200">
            <div className="flex space-x-8 py-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-gray-700 hover:text-primary-600 transition-colors text-sm font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          'md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}>
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Mobile Categories */}
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block py-2 text-gray-700 hover:text-primary-600 transition-colors border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Mobile User Actions */}
            {!isLoggedIn && (
              <Link
                href="/signin"
                className="block py-2 text-primary-600 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
