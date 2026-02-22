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
    <section className="space-y-5 sm:space-y-6">
      <SeoHelmet title="Products" description="Browse, search, and filter products" />
      <div>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Products</h1>
        <p className="text-slate-600">Discover products across dynamic categories.</p>
      </div>

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

      <div className="flex flex-col gap-1 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>{queriedProducts.length} result(s) found</p>
        <p>Page {currentPage} of {totalPages}</p>
      </div>

      {paginated.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="text-xl font-semibold">No products match your filters</h2>
          <p className="mt-1 text-slate-600">Try a broader search, different category, or reset filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
}
