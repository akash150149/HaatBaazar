import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import Spinner from "../../../components/layout/Spinner";
import ProductCard from "../../../components/product/ProductCard";
import ProductFilters from "../components/ProductFilters";
import ProductPagination from "../components/ProductPagination";
import { useProducts } from "../../../context";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePagination } from "../../../hooks/usePagination";
import appConfig from "../../../config/appConfig";

const DEFAULT_FILTERS = {
  search: "",
  category: "all",
  minPrice: "0",
  maxPrice: "",
  sortBy: "newest"
};

export default function ProductsPage() {
  const { loading, error, categories, queryProducts } = useProducts();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(filters.search, 250);
  const categoryFromUrl = searchParams.get("category") || "";

  useEffect(() => {
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setFilters((prev) => (prev.category === categoryFromUrl ? prev : { ...prev, category: categoryFromUrl }));
    }
  }, [categoryFromUrl, categories]);

  const queriedProducts = useMemo(() => {
    const minPrice = Number(filters.minPrice || 0);
    const maxPrice = filters.maxPrice === "" ? Infinity : Number(filters.maxPrice);

    return queryProducts({
      search: debouncedSearch,
      category: filters.category,
      minPrice: Number.isFinite(minPrice) ? minPrice : 0,
      maxPrice: Number.isFinite(maxPrice) ? maxPrice : Infinity,
      sortBy: filters.sortBy
    });
  }, [queryProducts, debouncedSearch, filters.category, filters.minPrice, filters.maxPrice, filters.sortBy]);

  const { paginated, totalPages } = usePagination(queriedProducts, currentPage, appConfig.itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters.category, filters.minPrice, filters.maxPrice, filters.sortBy]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const handlePageChange = (nextPage) => {
    const safePage = Math.min(totalPages, Math.max(1, nextPage));
    setCurrentPage(safePage);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>;

  return (
    <section className="space-y-12 py-8">
      <SeoHelmet title="Products" description="Browse, search, and filter products" />

      <div className="space-y-4 text-center lg:text-left">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          The <span className="text-brand-600">Collection.</span>
        </h1>
        <p className="max-w-2xl text-lg text-slate-500">
          Discover our curated selection of high-performance essentials designed for the modern lifestyle.
        </p>
      </div>

      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <ProductFilters
          search={filters.search}
          onSearchChange={(value) => updateFilter("search", value)}
          category={filters.category}
          onCategoryChange={(value) => updateFilter("category", value)}
          categories={categories}
          minPrice={filters.minPrice}
          onMinPriceChange={(value) => updateFilter("minPrice", value)}
          maxPrice={filters.maxPrice}
          onMaxPriceChange={(value) => updateFilter("maxPrice", value)}
          sortBy={filters.sortBy}
          onSortChange={(value) => updateFilter("sortBy", value)}
          onReset={resetFilters}
        />
      </div>

      <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-slate-400 sm:flex-row sm:items-center sm:justify-between px-2">
        <p>{queriedProducts.length} Piece(s) Available</p>
        <p className="text-brand-600">Page {currentPage} / {totalPages}</p>
      </div>

      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-white/50 p-20 text-center">
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">No match found</h2>
          <p className="mt-2 text-slate-500 max-w-xs">Adjust your filters or try a different keyword to explore the collection.</p>
          <button onClick={resetFilters} className="mt-8 rounded-full bg-slate-950 px-8 py-3 text-white font-bold transition-all hover:bg-brand-600">
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="pt-8">
        <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}
