import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { getFallbackImage, withImageFallback } from "../../utils/image";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-slate-50 transition-all hover:shadow-premium"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.images?.[0] || getFallbackImage()}
          alt={product.title}
          onError={withImageFallback}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 opacity-0 backdrop-blur-[2px] transition-all group-hover:opacity-100">
          <p className="text-3xl font-black text-white">{formatCurrency(product.price)}</p>
          <div className="mt-6 rounded-full bg-accent px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-transform group-hover:translate-y-[-10px]">
            Quick View
          </div>
        </div>

        <div className="absolute left-6 top-6 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-soft">
          {product.rating.toFixed(1)} ★
        </div>
      </div>

      <div className="p-8 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
          {product.category}
        </span>
        <h2 className="line-clamp-1 font-display text-xl font-black uppercase tracking-tighter text-slate-950">
          {product.title}
        </h2>
      </div>

      {/* Decorative Accent Line */}
      <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

