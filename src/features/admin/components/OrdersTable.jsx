import { useState } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { updateOrderStatus } from "../../../services/orderService";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

const STATUS_VARIANTS = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-indigo-50 text-indigo-700 border-indigo-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200"
};

export default function OrdersTable({ orders: initialOrders = [] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updatedOrder : o)));
    } catch {
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 p-12 text-center">
        <p className="text-slate-400">No storefront activity recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-6 py-4">Reference</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="group transition-colors hover:bg-slate-50/50">
                <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400 group-hover:text-brand-600 transition-colors">
                  {order.orderId || order.id.slice(-8).toUpperCase()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{order.customer}</span>
                    <span className="text-[10px] text-slate-400">{order.itemsCount} Piece(s)</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-black text-slate-950">{formatCurrency(order.total)}</td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`appearance-none rounded-full border px-4 py-1.5 text-[11px] font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 ${STATUS_VARIANTS[order.status] || "bg-slate-50"}`}
                    >
                      {Object.keys(STATUS_VARIANTS).map((s) => (
                        <option key={s} value={s} className="capitalize">{s}</option>
                      ))}
                    </select>
                    {updatingId === order.id && (
                      <span className="absolute -right-6 top-1/2 -translate-y-1/2">
                        <svg className="h-4 w-4 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

