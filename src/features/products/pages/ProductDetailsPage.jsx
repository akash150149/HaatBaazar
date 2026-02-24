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
                <button className="text-[10px] font-bold text-brand-600 underline">Size Guide</button>
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
                className="flex-1 rounded-full bg-slate-950 py-4 font-bold text-white transition-all hover:bg-brand-600 hover:shadow-xl active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
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
