'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredProducts } from '@/data/featured-products';
import { FeaturedProduct } from '@/types';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

const FeaturedProductsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= featuredProducts.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 
        ? Math.max(0, featuredProducts.length - itemsPerView)
        : prev - itemsPerView
    );
  };

  const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.sections.featuredProducts}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.sections.featuredProductsSubtitle}
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-primary-600"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-primary-600"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visibleProducts.map((product: FeaturedProduct) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(featuredProducts.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200',
                index === Math.floor(currentIndex / itemsPerView)
                  ? 'bg-primary-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeaturedProductCardProps {
  product: FeaturedProduct;
}

const FeaturedProductCard = ({ product }: FeaturedProductCardProps) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-gray-600 line-clamp-3">
                {product.description}
              </p>
            )}

            <Link
              href={product.link || `/products/${product.id}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              {t.product.learnMore}
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 md:h-auto bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;
