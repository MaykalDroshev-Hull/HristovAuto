'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { offers } from '@/data/offers';
import { Offer } from '@/types';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

const OffersSection = () => {
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
      prev + itemsPerView >= offers.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 
        ? Math.max(0, offers.length - itemsPerView)
        : prev - itemsPerView
    );
  };

  const visibleOffers = offers.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.sections.ourOffers}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.sections.ourOffersSubtitle}
          </p>
        </div>

        {/* Offers Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-primary-600"
            aria-label="Previous offers"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-primary-600"
            aria-label="Next offers"
          >
            <ChevronRight size={24} />
          </button>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visibleOffers.map((offer: Offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(offers.length / itemsPerView) }).map((_, index) => (
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

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-64 bg-gray-100">
        <Image
          src={offer.image_url}
          alt={offer.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
        
        {/* Discount Badge */}
        {offer.discount_percentage && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {offer.discount_percentage}% {t.product.off}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-white">
          <h3 className="text-xl font-bold mb-2">
            {offer.name}
          </h3>
          
          {offer.description && (
            <p className="text-gray-200 text-sm mb-4 line-clamp-2">
              {offer.description}
            </p>
          )}

          <div className="flex items-center text-primary-400 font-medium group-hover:translate-x-1 transition-transform duration-200">
            <span>{t.product.learnMore}</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
