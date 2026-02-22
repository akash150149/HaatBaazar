import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import Spinner from "../../../components/layout/Spinner";
import { useCart, useProducts } from "../../../context";
import { formatCurrency } from "../../../utils/formatCurrency";
import ProductCard from "../../../components/product/ProductCard";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const { loading, products, getProductById } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

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
    <section className="space-y-8">
      <SeoHelmet title={product.title} description={product.description} />
      <div className="grid gap-6 md:grid-cols-2">
        <img src={product.images[0]} alt={product.title} className="h-72 w-full rounded-xl object-cover sm:h-80" />
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-3xl font-semibold sm:text-4xl">{product.title}</h1>
          <p className="text-slate-600">{product.description}</p>
          <p className="text-2xl text-brand-700">{formatCurrency(product.price)}</p>
          <p className="text-sm text-slate-600">Rating: {product.rating.toFixed(1)} / 5</p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value || 1)))}
              className="w-20 rounded-md border border-slate-300 px-3 py-2"
            />
            <button
              type="button"
              onClick={() => addToCart(product, quantity)}
              className="rounded-md bg-brand-700 px-4 py-2 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Related Products</h2>
        {relatedProducts.length === 0 ? (
          <p className="rounded-md bg-slate-100 p-4 text-slate-600">No related products found in this category.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
