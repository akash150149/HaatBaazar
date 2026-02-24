import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { getFallbackImage, withImageFallback } from "../../../utils/image";

export default function TrendingSection({ products = [] }) {
    const trending = products.slice(0, 4);

    if (trending.length === 0) return null;

    return (
        <section className="space-y-16 py-20">
            <div className="flex flex-col items-end text-right space-y-2 px-6">
                <h2 className="font-display text-5xl font-black uppercase tracking-tighter text-slate-950 sm:text-7xl">
                    Trending <span className="text-accent">Drops.</span>
                </h2>
                <p className="text-slate-500 max-w-xs font-medium">The most anticipated releases currently dominating the streets.</p>
            </div>

            <div className="grid grid-cols-1 gap-px bg-slate-200 border-y border-slate-200 lg:grid-cols-4">
                {trending.map((product, idx) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="group relative bg-white p-10 transition-colors hover:bg-slate-50"
                    >
                        <div className="absolute top-10 left-10 z-0">
                            <span className="text-[12rem] font-black leading-none text-slate-100 transition-colors group-hover:text-accent/10">
                                0{idx + 1}
                            </span>
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="aspect-square overflow-hidden rounded-2xl bg-slate-50">
                                <img
                                    src={product.images?.[0] || getFallbackImage()}
                                    alt={product.title}
                                    onError={withImageFallback}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                                    {product.category}
                                </span>
                                <h3 className="line-clamp-1 font-display text-2xl font-black uppercase tracking-tighter text-slate-950">
                                    {product.title}
                                </h3>
                                <p className="text-xl font-bold text-slate-950">{formatCurrency(product.price)}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                            <span>Cop the Drop</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
