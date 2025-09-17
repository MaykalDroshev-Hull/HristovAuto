'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToFavorites?: (product: Product) => void;
  showAddToCart?: boolean;
  className?: string;
}

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onAddToFavorites,
  showAddToCart = true,
  className 
}: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);

  const discountPercentage = calculateDiscount(product.original_price, product.discounted_price);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      setIsAddingToCart(true);
      try {
        await onAddToCart(product);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const handleAddToFavorites = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToFavorites) {
      setIsAddingToFavorites(true);
      try {
        await onAddToFavorites(product);
      } finally {
        setIsAddingToFavorites(false);
      }
    }
  };

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
    <div className={cn('group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden', className)}>
      <Link href={`/products/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {discountPercentage}% {t.product.off}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleAddToFavorites}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100"
            disabled={isAddingToFavorites}
          >
            <Heart 
              size={16} 
              className={cn(
                'transition-colors duration-200',
                isAddingToFavorites ? 'text-red-500 animate-pulse' : 'text-gray-600 hover:text-red-500'
              )}
            />
          </button>

          {/* Out of Stock Overlay */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {t.product.outOfStock}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          )}

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
            {product.original_price > product.discounted_price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock || isAddingToCart}
              className={cn(
                'w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200',
                product.in_stock && !isAddingToCart
                  ? 'bg-primary-500 hover:bg-primary-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              )}
            >
              {isAddingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{t.product.adding}</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>{product.in_stock ? t.product.addToCart : t.product.outOfStock}</span>
                </>
              )}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
