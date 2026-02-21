import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import { useCart } from "../../../context";
import { formatCurrency } from "../../../utils/formatCurrency";
import { STORAGE_KEYS } from "../../../utils/constants";
import { createOrder } from "../../../services/orderService";

const PAYMENT_METHODS = [
  { value: "card", label: "Credit / Debit Card" },
  { value: "upi", label: "UPI" },
  { value: "cod", label: "Cash on Delivery" }
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].value);
  const [error, setError] = useState("");

  const submitOrder = async (event) => {
    event.preventDefault();
    setError("");
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!address.trim()) {
      setError("Shipping address is required.");
      return;
    }

    const orderPayload = {
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      itemsCount: items.reduce((count, item) => count + item.quantity, 0),
      subtotal,
      shippingAddress: address.trim(),
      paymentMethod
    };

    try {
      const createdOrder = await createOrder(orderPayload);
      localStorage.setItem(STORAGE_KEYS.LAST_ORDER, JSON.stringify(createdOrder));
      clearCart();
      navigate("/order-confirmation", { state: { order: createdOrder } });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to place order. Please try again.");
    }
  };

  return (
    <section className="space-y-4">
      <SeoHelmet title="Checkout" />
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <form onSubmit={submitOrder} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <label className="block text-sm font-medium">Shipping Address</label>
        <textarea
          required
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="min-h-24 w-full rounded-md border border-slate-300 p-2"
        />
        <label className="block text-sm font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(event) => setPaymentMethod(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        >
          {PAYMENT_METHODS.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
        <p className="text-sm text-slate-600">Items: {items.length}</p>
        <p className="text-lg font-semibold">Total: {formatCurrency(subtotal)}</p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded-md bg-brand-700 px-4 py-2 text-white">Place Order</button>
      </form>
    </section>
  );
}
