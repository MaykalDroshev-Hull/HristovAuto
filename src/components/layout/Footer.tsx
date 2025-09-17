'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { t } from '@/lib/translations';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    shop: [
      { name: t.categories.exterior, href: '/products?category=exterior' },
      { name: t.categories.interior, href: '/products?category=interior' },
      { name: 'Производителност', href: '/products?category=performance' },
      { name: t.categories.wheelsAndTyres, href: '/products?category=wheels%20and%20tyres' },
      { name: t.categories.electronics, href: '/products?category=electronics' },
      { name: t.categories.toolsAndGarage, href: '/products?category=tools%20and%20garage' },
    ],
    support: [
      { name: 'Център за помощ', href: '/help' },
      { name: 'Свържете се с нас', href: '/contact' },
      { name: t.nav.orderStatus, href: '/orders' },
      { name: 'Връщания', href: '/returns' },
      { name: 'Информация за доставка', href: '/shipping' },
      { name: 'Гаранция', href: '/warranty' },
    ],
    company: [
      { name: 'За нас', href: '/about' },
      { name: 'Кариери', href: '/careers' },
      { name: 'Медии', href: '/press' },
      { name: 'Блог', href: '/blog' },
      { name: 'Партньори', href: '/partners' },
      { name: 'Инвеститори', href: '/investors' },
    ],
    legal: [
      { name: 'Политика за поверителност', href: '/privacy' },
      { name: 'Условия за ползване', href: '/terms' },
      { name: 'Политика за бисквитки', href: '/cookies' },
      { name: 'Достъпност', href: '/accessibility' },
      { name: 'Карта на сайта', href: '/sitemap' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <footer className="bg-gray-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="text-2xl font-bold text-primary-400 mb-4 block">
                Христов АУТО
              </Link>
              <p className="text-gray-300 mb-6">
                Вашият доверен партньор за премиум авточасти и аксесоари. 
                Качествени продукти за всички марки и модели превозни средства.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                      aria-label={social.name}
                    >
                      <Icon size={20} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.shop}</h3>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.support}</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.company}</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.legal}</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-lg font-semibold mb-2">{t.footer.stayUpdated}</h3>
              <p className="text-gray-300 mb-4">
                {t.footer.newsletterSubtitle}
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.footer.enterEmail}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  {t.footer.subscribe}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-gray-950 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Христов АУТО. {t.footer.allRightsReserved}
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>{t.footer.securePayment}</span>
                <span>•</span>
                <span>{t.footer.freeShipping}</span>
                <span>•</span>
                <span>{t.footer.support247}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
