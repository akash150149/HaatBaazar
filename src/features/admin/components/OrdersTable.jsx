import { formatCurrency } from "../../../utils/formatCurrency";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function OrdersTable({ orders }) {
  if (orders.length === 0) {
    return <p className="rounded-lg bg-slate-100 p-5 text-slate-600">No orders available.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-slate-200">
              <td className="px-4 py-3 font-medium text-slate-900">{order.id}</td>
              <td className="px-4 py-3 text-slate-700">{order.customer}</td>
              <td className="px-4 py-3 text-slate-700">{formatCurrency(order.total)}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs capitalize text-slate-700">
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-700">{formatDate(order.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
