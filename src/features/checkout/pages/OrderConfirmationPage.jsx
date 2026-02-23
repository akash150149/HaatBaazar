import { Link, useLocation } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import { STORAGE_KEYS } from "../../../utils/constants";
import { formatCurrency } from "../../../utils/formatCurrency";

function readStoredOrder() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAST_ORDER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function formatPaymentMethod(method) {
  if (method === "online") return "Online Payment (Razorpay)";
  if (method === "cod") return "Cash on Delivery";
  return "Unknown";
}

function formatDate(value) {
  if (!value) return "N/A";
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function OrderConfirmationPage() {
  const location = useLocation();
  const order = location.state?.order || readStoredOrder();

  if (!order) {
    return (
      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-6">
        <SeoHelmet title="Order Confirmation" />
        <h1 className="text-2xl font-semibold">No recent order found</h1>
        <p className="text-slate-600">Place an order from checkout to view confirmation details.</p>
        <Link to="/products" className="text-brand-700">Go to products</Link>
      </section>
    );
  }

  return (
    <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-6">
      <SeoHelmet title="Order Confirmation" />
      <h1 className="text-2xl font-semibold">Order placed successfully</h1>
      <p className="text-slate-600">This is a mock confirmation screen. Payment integration can be added later.</p>
      <div className="rounded-md bg-slate-50 p-4 text-sm text-slate-700">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Placed At:</strong> {formatDate(order.placedAt || order.createdAt)}</p>
        <p><strong>Payment:</strong> {formatPaymentMethod(order.paymentMethod)}</p>
        <p><strong>Payment Status:</strong> {String(order.paymentStatus || "pending").toUpperCase()}</p>
        <p><strong>Items:</strong> {order.itemsCount}</p>
        <p><strong>Total:</strong> {formatCurrency(order.subtotal)}</p>
        <p><strong>Shipping:</strong> {order.shippingAddress}</p>
        {Array.isArray(order.items) && order.items.length > 0 && (
          <div className="mt-2 border-t border-slate-200 pt-2">
            <p className="mb-1 font-semibold">Order Items</p>
            {order.items.map((item) => (
              <p key={item.id || item.productId}>
                {item.title} x {item.quantity}
              </p>
            ))}
          </div>
        )}
      </div>
      <Link to="/products" className="text-brand-700">Continue shopping</Link>
    </section>
  );
}
