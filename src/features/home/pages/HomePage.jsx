import { useMemo } from "react";
import SeoHelmet from "../../../seo/SeoHelmet";
import Spinner from "../../../components/layout/Spinner";
import { useProducts } from "../../../context";
import HeroSection from "../sections/HeroSection";
import TrendingSection from "../sections/TrendingSection";
import FeaturedProductsSection from "../sections/FeaturedProductsSection";
import CategoriesSection from "../sections/CategoriesSection";
import NewsletterSection from "../sections/NewsletterSection";
import LookbookSection from "../sections/LookbookSection";

export default function HomePage() {
  const { products, categories, loading, error } = useProducts();

  const featuredProducts = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [products]
  );

  if (loading) return <Spinner />;
  if (error) return <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>;

  return (
    <section className="space-y-24 py-6">
      <SeoHelmet title="Home" description="Premium sneakers and street fashion collection" />
      <HeroSection />

      <TrendingSection products={products} />

      <CategoriesSection categories={categories} />

      <FeaturedProductsSection products={featuredProducts} />

      <LookbookSection />

      <NewsletterSection />
    </section>
  );
}
