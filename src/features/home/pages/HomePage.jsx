import { useMemo } from "react";
import SeoHelmet from "../../../seo/SeoHelmet";
import Spinner from "../../../components/layout/Spinner";
import { useProducts } from "../../../context";
import HeroSection from "../sections/HeroSection";
import FeaturedProductsSection from "../sections/FeaturedProductsSection";
import CategoriesSection from "../sections/CategoriesSection";
import CallToActionSection from "../sections/CallToActionSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import NewsletterSection from "../sections/NewsletterSection";

export default function HomePage() {
  const { products, categories, loading, error } = useProducts();

  const featuredProducts = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [products]
  );

  if (loading) return <Spinner />;
  if (error) return <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>;

  return (
    <section className="space-y-8 sm:space-y-10 lg:space-y-12">
      <SeoHelmet title="Home" description="Modern scalable ecommerce storefront" />
      <HeroSection />
      <FeaturedProductsSection products={featuredProducts} />
      <CategoriesSection categories={categories} />
      <CallToActionSection />
      <TestimonialsSection />
      <NewsletterSection />
    </section>
  );
}
