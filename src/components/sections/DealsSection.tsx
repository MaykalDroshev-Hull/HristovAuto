'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

const DealsSection = () => {
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get products with discounts for deals section
    const discountedProducts = products.filter(product => 
      product.original_price > product.discounted_price
    ).slice(0, 6);
    setDealsProducts(discountedProducts);
  }, []);

  const handleAddToCart = (product: Product) => {
    // Add to cart logic
    console.log('Adding to cart:', product);
    // In a real app, this would update the cart state and localStorage
  };

  const handleViewDetails = (product: Product) => {
    // Navigate to product details
    window.location.href = `/products/${product.id}`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.sections.dealOfTheWeek}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.sections.dealOfTheWeekSubtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dealsProducts.map((product: Product) => (
            <DealProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products?deals=true"
            className="inline-flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {t.product.viewAllDeals}
          </Link>
        </div>
      </div>
    </section>
  );
};

interface DealProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const DealProductCard = ({ product, onAddToCart, onViewDetails }: DealProductCardProps) => {
  const discountPercentage = calculateDiscount(product.original_price, product.discounted_price);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={cn(
            'fill-current',
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          )}
        />
      );
    }
    return stars;
  };

  return (
    <div 
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
          {discountPercentage}% {t.product.off}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {renderStars(Math.floor(product.rating))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.rating_count || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.discounted_price)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(product.original_price)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <ShoppingCart size={16} />
          <span>{t.product.addToCart}</span>
        </button>
      </div>
    </div>
  );
};

export default DealsSection;
