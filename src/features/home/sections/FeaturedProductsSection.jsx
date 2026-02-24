import { Link } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";

export default function FeaturedProductsSection({ products = [] }) {
  return (
    <section className="space-y-10 py-12">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Featured <span className="text-brand-600">Drops.</span>
          </h2>
          <p className="text-slate-500">Curated excellence from our latest arrivals.</p>
        </div>
        <Link to="/products" className="group flex items-center space-x-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-bold transition-all hover:bg-slate-50 hover:shadow-soft">
          <span>View Catalog</span>
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 p-20 text-center">
          <p className="text-lg font-medium text-slate-400">Our latest collection is arriving soon.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
