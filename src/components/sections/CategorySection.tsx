'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

const CategorySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(5);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
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
      prev + itemsPerView >= categories.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 
        ? Math.max(0, categories.length - itemsPerView)
        : prev - itemsPerView
    );
  };

  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t.sections.browseByCategories}
          </h2>
          
          {/* Navigation Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-600 hover:text-primary-600"
              aria-label="Previous categories"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-600 hover:text-primary-600"
              aria-label="Next categories"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {visibleCategories.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(categories.length / itemsPerView) }).map((_, index) => (
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

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/products?category=${category.slug || category.name.toLowerCase()}`}
      className="group block"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            {category.name}
          </h3>
          
          {/* Arrow Icon */}
          <div className="mt-4 flex items-center text-primary-500 group-hover:translate-x-1 transition-transform duration-200">
            <span className="text-sm font-medium">{t.product.explore}</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategorySection;
