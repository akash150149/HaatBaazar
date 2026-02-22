import { Link } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";

export default function FeaturedProductsSection({ products = [] }) {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
        <Link to="/products" className="text-sm font-semibold text-brand-700 hover:text-brand-500">
          View all
        </Link>
      </div>
      {products.length === 0 ? (
        <p className="rounded-lg bg-slate-100 p-6 text-slate-600">No featured products available yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
