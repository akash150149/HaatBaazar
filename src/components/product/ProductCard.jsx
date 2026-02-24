import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { getFallbackImage, withImageFallback } from "../../utils/image";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-2 hover:border-brand-300 hover:shadow-premium"
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-50">
        <img
          src={product.images?.[0] || getFallbackImage()}
          alt={product.title}
          onError={withImageFallback}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur-md">
          {product.rating.toFixed(1)} ★
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col space-y-2 px-1">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-600/60 transition-colors group-hover:text-brand-600">
          {product.category}
        </span>
        <h2 className="line-clamp-2 min-h-[3rem] font-display text-lg font-bold leading-tight text-slate-950">
          {product.title}
        </h2>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-black text-slate-950">{formatCurrency(product.price)}</p>
          <div className="rounded-full bg-slate-950 p-2 text-white transition-all group-hover:bg-brand-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

