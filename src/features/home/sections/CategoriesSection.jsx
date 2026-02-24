import { Link } from "react-router-dom";

export default function CategoriesSection({ categories = [] }) {
  return (
    <section className="space-y-10 py-12">
      <div className="space-y-2 text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Browse by <span className="text-brand-600">Niche.</span>
        </h2>
        <p className="text-slate-500">Find exactly what you're looking for.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${encodeURIComponent(category)}`}
            className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 transition-all hover:-translate-y-2 hover:border-brand-300 hover:shadow-premium"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-50 transition-all group-hover:scale-150" />

            <div className="relative z-10 space-y-4">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                Category
              </span>
              <h3 className="text-2xl font-bold capitalize text-slate-900">{category}</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Explore the latest trends and essential pieces in <span className="font-semibold">{category}</span>.
              </p>
              <div className="flex items-center space-x-2 pt-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                <span>View All</span>
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
