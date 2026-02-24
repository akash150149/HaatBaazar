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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
        {categories.slice(0, 4).map((category, idx) => (
          <Link
            key={category}
            to={`/products?category=${encodeURIComponent(category)}`}
            className={`group relative overflow-hidden rounded-[2.5rem] bg-slate-100 transition-all hover:shadow-premium ${idx === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-2 md:row-span-1"
              }`}
          >
            {/* Background Flair */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 to-transparent transition-opacity group-hover:opacity-100" />
            <div className="absolute -bottom-10 -right-10 select-none opacity-10">
              <span className="font-display text-8xl font-black uppercase tracking-tighter text-slate-950">
                {category.slice(0, 4)}
              </span>
            </div>

            <div className="absolute inset-0 p-8 flex flex-col justify-end transition-transform group-hover:translate-y-[-10px]">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                  Featured Collection
                </span>
                <h3 className={`font-display font-black uppercase tracking-tighter text-slate-950 ${idx === 0 ? "text-5xl" : "text-3xl"
                  }`}>
                  {category}
                </h3>
              </div>

              <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white opacity-0 transition-all group-hover:opacity-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
