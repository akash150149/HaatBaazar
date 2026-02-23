import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import { useAuth, useCart } from "../../../context";
import { formatCurrency } from "../../../utils/formatCurrency";
import { STORAGE_KEYS } from "../../../utils/constants";
import {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment
} from "../../../services/orderService";

const PAYMENT_METHODS = [
  { value: "online", label: "Online Payment (Razorpay)" },
  { value: "cod", label: "Cash on Delivery" }
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].value);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

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
      setProcessing(true);
      let createdOrder;

      if (paymentMethod === "online") {
        const sdkLoaded = await loadRazorpayScript();
        if (!sdkLoaded) {
          setError("Unable to load Razorpay. Check internet and try again.");
          return;
        }

        const paymentOrder = await createRazorpayOrder({ subtotal });
        createdOrder = await new Promise((resolve, reject) => {
          const razorpay = new window.Razorpay({
            key: paymentOrder.keyId,
            amount: paymentOrder.amount,
            currency: paymentOrder.currency,
            name: "HaatBaazar",
            description: "Order payment",
            order_id: paymentOrder.orderId,
            prefill: {
              name: user?.name || "",
              email: user?.email || ""
            },
            theme: {
              color: "#1b7f5f"
            },
            handler: async (response) => {
              try {
                const verifiedOrder = await verifyRazorpayPayment({
                  ...response,
                  orderPayload
                });
                resolve(verifiedOrder);
              } catch (verifyErr) {
                reject(verifyErr);
              }
            },
            modal: {
              ondismiss: () => reject(new Error("Payment cancelled"))
            }
          });
          razorpay.open();
        });
      } else {
        createdOrder = await createOrder({ ...orderPayload, paymentMethod: "cod" });
      }

      localStorage.setItem(STORAGE_KEYS.LAST_ORDER, JSON.stringify(createdOrder));
      clearCart();
      navigate("/order-confirmation", { state: { order: createdOrder } });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to place order. Please try again.");
    } finally {
      setProcessing(false);
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
        <button
          type="submit"
          disabled={processing}
          className="rounded-md bg-brand-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {processing ? "Processing..." : "Place Order"}
        </button>
      </form>
    </section>
  );
}
