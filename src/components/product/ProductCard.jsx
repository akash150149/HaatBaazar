import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.title}
          className="mb-3 h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">{product.category}</p>
      <h2 className="min-h-12 text-base font-semibold text-slate-900">{product.title}</h2>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-lg font-bold text-brand-700">{formatCurrency(product.price)}</p>
        <p className="text-sm text-amber-600">{product.rating.toFixed(1)} ★</p>
      </div>
    </Link>
  );
}
