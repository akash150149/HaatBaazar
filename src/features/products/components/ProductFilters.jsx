export default function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortChange,
  onReset
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <label htmlFor="search" className="mb-1 block text-xs font-semibold uppercase text-slate-500">Search</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search title or description"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="mb-1 block text-xs font-semibold uppercase text-slate-500">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="minPrice" className="mb-1 block text-xs font-semibold uppercase text-slate-500">Min Price</label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => onMinPriceChange(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-1 block text-xs font-semibold uppercase text-slate-500">Max Price</label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="sortBy" className="mb-1 block text-xs font-semibold uppercase text-slate-500">Sort By</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Top Rated</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
}
