'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { t } from '@/lib/translations';

const FeaturedMakesSection = () => {
  const featuredMakes = [
    'Kai', 'Honda', 'Subaru', 'Chevy', 'Ford', 'Nissan',
    'Dodge', 'Ram', 'Toyota', 'Jeep', 'GMC', 'Hyundai',
    'Cadillac', 'Mercedes', 'Lexus'
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {t.sections.featuredMakes}
              </h2>
              <h3 className="text-2xl font-bold text-gray-900">
                {t.sections.featuredModels}
              </h3>
            </div>
          </div>

          {/* Right Content - Makes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featuredMakes.map((make) => (
              <Link
                key={make}
                href={`/products?make=${make.toLowerCase()}`}
                className="group flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <span className="text-gray-700 font-medium group-hover:text-primary-600 transition-colors duration-200">
                  {make}
                </span>
                <ChevronRight 
                  size={16} 
                  className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" 
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMakesSection;
