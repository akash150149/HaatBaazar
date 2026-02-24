import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import Spinner from "../../../components/layout/Spinner";
import { useCart, useProducts } from "../../../context";
import { formatCurrency } from "../../../utils/formatCurrency";
import { getFallbackImage, withImageFallback } from "../../../utils/image";
import ProductCard from "../../../components/product/ProductCard";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const { loading, products, getProductById } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("9");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const product = useMemo(() => getProductById(productId), [getProductById, productId]);
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((item) => item.id !== product.id && item.category === product.category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [products, product]);

  if (loading) return <Spinner />;
  if (!product) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/products" className="text-brand-700">Back to products</Link>
      </section>
    );
  }

  return (
    <section className="space-y-16 py-8">
      <SeoHelmet title={product.title} description={product.description} />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image Gallery Mockup */}
        <div className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-premium">
          <img
            src={product.images?.[0] || getFallbackImage()}
            alt={product.title}
            onError={withImageFallback}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-6 left-6 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-slate-900 backdrop-blur-md">
            {product.rating.toFixed(1)} ★ Review Score
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-brand-600">
              {product.category}
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
              {product.title}
            </h1>
            <p className="text-lg leading-relaxed text-slate-500">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="font-display text-4xl font-black text-slate-950">
                {formatCurrency(product.price)}
              </p>
              <span className="text-sm font-medium text-emerald-600">In Stock & Ready to Ship</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Size (US)</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] font-bold text-accent underline decoration-2 underline-offset-4"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {["7", "8", "9", "10", "11", "12"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border font-bold transition-all ${selectedSize === size ? "border-brand-600 bg-brand-50 text-brand-600" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-white hover:shadow-soft"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                </button>
                <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-white hover:shadow-soft"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart({ ...product, size: selectedSize }, quantity)}
                className="flex-1 rounded-full bg-slate-950 py-4 font-bold text-white transition-all hover:bg-accent hover:shadow-glow active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Technical Anatomy Section */}
        <div className="mt-32 space-y-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter text-slate-950 sm:text-6xl">
              Engineered <span className="text-accent underline decoration-4 underline-offset-8">Excellence.</span>
            </h2>
            <p className="max-w-xl text-slate-500 font-medium">Inside every {product.title}, you'll find precision engineering designed for pure performance.</p>
          </div>

          <div className="grid gap-px bg-slate-200 border border-slate-200 rounded-[2.5rem] overflow-hidden lg:grid-cols-3">
            {[
              { title: "SOLEGRIP™ TECH", desc: "Advanced carbon-rubber outsole for multidirectional traction on any street surface.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "CLOUD-AIR FOAM", desc: "Proprietary nitrogen-infused midsole for 40% more energy return and all-day cushioning.", icon: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 013 11c0-2.78 1.129-5.295 2.965-7.133L9 11l4-4 4 4 4.035-4.035A9.963 9.963 0 0121 11c0 2.225-.725 4.28-1.944 5.942l4.944 4.944" },
              { title: "KINETIC WEAVE", desc: "Lightweight, laser-ventilated upper that maps to your foot's natural ergonomics.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" }
            ].map((tech, i) => (
              <article key={i} className="group bg-white p-12 transition-colors hover:bg-slate-50">
                <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white mb-8 group-hover:bg-accent transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tech.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-black uppercase tracking-tighter text-slate-950 mb-4">{tech.title}</h3>
                <p className="text-slate-500 leading-relaxed">{tech.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Size Guide Modal Overlay */}
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-[3rem] p-12 shadow-premium reveal-up">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-950"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="font-display text-4xl font-black uppercase tracking-tighter text-slate-950">Size <span className="text-accent underline decoration-4 underline-offset-4">Guide.</span></h2>
                  <p className="text-slate-500">Find your perfect fit with our international conversion table.</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <tr>
                        <th className="px-6 py-4">US Men</th>
                        <th className="px-6 py-4">UK</th>
                        <th className="px-6 py-4">EU</th>
                        <th className="px-6 py-4">CM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold">
                      {[
                        ["7", "6", "40", "25"],
                        ["8", "7", "41", "26"],
                        ["9", "8", "42", "27"],
                        ["10", "9", "43", "28"],
                        ["11", "10", "44", "29"],
                        ["12", "11", "45", "30"]
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          {row.map((cell, j) => <td key={j} className="px-6 py-4 text-slate-900">{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      <section className="space-y-10 pt-16">
        <div className="space-y-2 text-center lg:text-left">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Complete the <span className="text-brand-600">Look.</span>
          </h2>
          <p className="text-slate-500">Other items you might love in {product.category}.</p>
        </div>

        {relatedProducts.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 p-16 text-center">
            <p className="text-slate-400">No other items found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
