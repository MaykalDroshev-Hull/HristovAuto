'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { blogs } from '@/data/blogs';
import { Blog } from '@/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

const BlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
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
      prev + itemsPerView >= blogs.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 
        ? Math.max(0, blogs.length - itemsPerView)
        : prev - itemsPerView
    );
  };

  const visibleBlogs = blogs.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.sections.ourBlogs}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.sections.ourBlogsSubtitle}
          </p>
        </div>

        {/* Blog Posts Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-primary-600"
            aria-label="Previous blog posts"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-primary-600"
            aria-label="Next blog posts"
          >
            <ChevronRight size={24} />
          </button>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleBlogs.map((blog: Blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(blogs.length / itemsPerView) }).map((_, index) => (
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {t.product.viewAllArticles}
          </Link>
        </div>
      </div>
    </section>
  );
};

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/blog/${blog.slug || blog.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={blog.image_url}
            alt={blog.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category and Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              {blog.category_display}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(blog.data)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {blog.name}
          </h3>

          {/* Description */}
          {blog.content && (
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {blog.content}
            </p>
          )}

          {/* Read More */}
          <div className="flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
            <span>{t.product.learnMore}</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogSection;
