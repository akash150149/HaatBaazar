import { Link } from "react-router-dom";

export default function CategoriesSection({ categories = [] }) {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-900">Shop by Category</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${encodeURIComponent(category)}`}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Category</p>
            <h3 className="mt-2 text-xl font-semibold capitalize text-slate-900">{category}</h3>
            <p className="mt-2 text-sm text-slate-600 group-hover:text-slate-900">Explore all products in this category.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-700">Browse now</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
