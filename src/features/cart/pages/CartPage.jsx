import { Link } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import { useCart } from "../../../context";
import { formatCurrency } from "../../../utils/formatCurrency";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="space-y-3">
        <SeoHelmet title="Cart" />
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link to="/products" className="text-brand-700">Continue shopping</Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <SeoHelmet title="Cart" />
      <h1 className="text-2xl font-semibold">Cart</h1>
      {items.map((item) => (
        <article key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
          <div>
            <h2 className="font-medium">{item.title}</h2>
            <div className="flex gap-4">
              <p className="text-sm text-slate-500">{formatCurrency(item.price)}</p>
              {item.size && <p className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-2 rounded-md">Size: {item.size}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) => updateQuantity(item.id, Number(event.target.value || 1))}
              className="w-20 rounded-md border border-slate-300 px-2 py-1"
            />
            <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-600">Remove</button>
          </div>
        </article>
      ))}
      <div className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
        <strong>Subtotal: {formatCurrency(subtotal)}</strong>
        <Link to="/checkout" className="rounded-md bg-brand-700 px-4 py-2 text-white">Checkout</Link>
      </div>
    </section>
  );
}
