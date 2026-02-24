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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <label htmlFor="search" className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Search Collection</label>
        <div className="relative">
          <input
            id="search"
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Title, description, or keywords..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-6 py-3.5 text-sm transition-all focus:border-brand-500 focus:bg-white focus:shadow-soft outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Niche</label>
        <select
          id="category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full appearance-none rounded-full border border-slate-200 bg-slate-50 px-6 py-3.5 text-sm transition-all focus:border-brand-500 focus:bg-white focus:shadow-soft outline-none"
        >
          <option value="all">Every Category</option>
          {categories.map((item) => (
            <option key={item} value={item} className="capitalize">{item}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:col-span-1">
        <div>
          <label htmlFor="minPrice" className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Min</label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => onMinPriceChange(event.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-brand-500 focus:bg-white outline-none"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Max</label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm transition-all focus:border-brand-500 focus:bg-white outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="sortBy" className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Sort</label>
        <div className="flex gap-2">
          <select
            id="sortBy"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full appearance-none rounded-full border border-slate-200 bg-slate-50 px-6 py-3.5 text-sm transition-all focus:border-brand-500 focus:bg-white outline-none"
          >
            <option value="newest">Latest Arrivals</option>
            <option value="price-asc">Lowest Price</option>
            <option value="price-desc">Highest Price</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
          <button
            type="button"
            onClick={onReset}
            className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-all hover:bg-slate-100 active:scale-95"
            title="Reset Filters"
          >
            <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
