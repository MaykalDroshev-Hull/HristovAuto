'use client';

import { useState } from 'react';
import { SearchFilters } from '@/types';
import { categories } from '@/data/categories';
import { t } from '@/lib/translations';

interface ProductFiltersProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

const ProductFilters = ({ filters, onFilterChange }: ProductFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
  });

  const brands = ['NBOX', 'CRUST', 'HOMETALES', 'AUTOPOWERZ', 'AutoPowerz'];
  const priceRanges = [
    { label: t.priceRanges.under500, min: 0, max: 11 },
    { label: t.priceRanges.range500to1000, min: 11, max: 22 },
    { label: t.priceRanges.range1000to2000, min: 22, max: 44 },
    { label: t.priceRanges.range2000to5000, min: 44, max: 110 },
    { label: t.priceRanges.over5000, min: 110, max: Infinity },
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const toggleSection = (section: keyof typeof isExpanded) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{t.filters.title}</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {t.filters.clearAll}
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          {t.filters.category}
          <span className={`transform transition-transform ${isExpanded.category ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {isExpanded.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.slug || category.name.toLowerCase()}
                  checked={filters.category === (category.slug || category.name.toLowerCase())}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          {t.filters.priceRange}
          <span className={`transform transition-transform ${isExpanded.price ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {isExpanded.price && (
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value={`${range.min}-${range.max}`}
                  checked={
                    filters.min_price === range.min && 
                    filters.max_price === range.max
                  }
                  onChange={() => {
                    handleFilterChange('min_price', range.min);
                    handleFilterChange('max_price', range.max);
                  }}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          {t.filters.brand}
          <span className={`transform transition-transform ${isExpanded.brand ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {isExpanded.brand && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  value={brand.toLowerCase()}
                  checked={filters.brand === brand.toLowerCase()}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          {t.filters.rating}
          <span className={`transform transition-transform ${isExpanded.rating ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {isExpanded.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">
                  {rating}+ {t.filters.stars}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t.filters.sortBy}
        </label>
        <select
          value={filters.sort_by || ''}
          onChange={(e) => handleFilterChange('sort_by', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        >
          <option value="">{t.filters.default}</option>
          <option value="price_asc">{t.filters.priceLowToHigh}</option>
          <option value="price_desc">{t.filters.priceHighToLow}</option>
          <option value="rating">{t.filters.rating}</option>
          <option value="newest">{t.filters.newest}</option>
          <option value="popular">{t.filters.mostPopular}</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
