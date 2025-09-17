import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';
import DealsSection from '@/components/sections/DealsSection';
import BlogSection from '@/components/sections/BlogSection';
import OffersSection from '@/components/sections/OffersSection';
import FeaturedMakesSection from '@/components/sections/FeaturedMakesSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <DealsSection />
      <BlogSection />
      <OffersSection />
      <FeaturedMakesSection />
    </div>
  );
}
