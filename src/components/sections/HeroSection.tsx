'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

const HeroSection = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];
  const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Nissan', 'Volkswagen', 'Opel', 'Peugeot'];
  const models = ['Camry', 'Civic', 'F-150', 'X3', 'C-Class', 'A4', 'Altima', 'Golf', 'Astra', '308'];

  const handleShopNow = () => {
    if (selectedYear && selectedMake && selectedModel) {
      // Navigate to products page with vehicle selection
      window.location.href = `/products?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}`;
    } else {
      // Navigate to products page without vehicle selection
      window.location.href = '/products';
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/car_image25.png"
          alt="Car background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t.hero.title}{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  {t.hero.vehicle}
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-6">
              {/* Year Selection */}
              <div className="relative">
                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.hero.year}
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0"
                    >
                      <option value="">{t.hero.selectYear}</option>
                      {years.map((year) => (
                        <option key={year} value={year} className="bg-gray-800">
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ChevronDown className="text-gray-400" size={20} />
                </div>
              </div>

              {/* Make Selection */}
              <div className="relative">
                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.hero.make}
                    </label>
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0"
                      disabled={!selectedYear}
                    >
                      <option value="">{t.hero.selectMake}</option>
                      {makes.map((make) => (
                        <option key={make} value={make} className="bg-gray-800">
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ChevronDown className="text-gray-400" size={20} />
                </div>
              </div>

              {/* Model Selection */}
              <div className="relative">
                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.hero.model}
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0"
                      disabled={!selectedMake}
                    >
                      <option value="">{t.hero.selectModel}</option>
                      {models.map((model) => (
                        <option key={model} value={model} className="bg-gray-800">
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ChevronDown className="text-gray-400" size={20} />
                </div>
              </div>

              {/* Shop Now Button */}
              <button
                onClick={handleShopNow}
                className={cn(
                  'w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300',
                  'bg-primary-500 hover:bg-primary-600 text-black',
                  'transform hover:scale-105 hover:shadow-xl',
                  'focus:outline-none focus:ring-4 focus:ring-primary-500/50'
                )}
              >
                {t.hero.shopNow}
              </button>
            </div>
          </div>

          {/* Right Content - Car Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src="/images/car_image25.png"
                alt="Car showcase"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl translate-y-48 -translate-x-48"></div>
    </section>
  );
};

export default HeroSection;
