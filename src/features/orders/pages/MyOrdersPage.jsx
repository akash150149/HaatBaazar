import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import Spinner from "../../../components/layout/Spinner";
import { getOrders } from "../../../services/orderService";
import { formatCurrency } from "../../../utils/formatCurrency";

function formatDate(value) {
    return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

const STATUS_THEMES = {
    pending: "text-amber-600 bg-amber-50",
    confirmed: "text-blue-600 bg-blue-50",
    processing: "text-indigo-600 bg-indigo-50",
    shipped: "text-purple-600 bg-purple-50",
    delivered: "text-emerald-600 bg-emerald-50",
    cancelled: "text-rose-600 bg-rose-50"
};

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOrders() {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                setError("Failed to load your orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadOrders();
    }, []);

    if (loading) return <Spinner />;

    return (
        <section className="space-y-10 py-8">
            <SeoHelmet title="My Orders" description="View your past orders and their status" />

            <div className="space-y-2 text-center lg:text-left">
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Order <span className="text-brand-600">History.</span>
                </h1>
                <p className="text-slate-500">Track and manage your premium collection pieces.</p>
            </div>

            {error && (
                <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-white/50 p-20 text-center">
                    <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                        <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">No orders yet</h2>
                    <p className="mt-2 text-slate-500 max-w-xs">You haven't placed any orders yet. Start building your collection today.</p>
                    <Link to="/products" className="mt-8 rounded-full bg-slate-950 px-8 py-3 text-white font-bold transition-all hover:bg-brand-600">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <article key={order.id} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft transition-all hover:border-brand-300 hover:shadow-premium">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-8 py-6">
                                <div className="flex flex-wrap gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Reference</p>
                                        <p className="font-mono text-sm font-bold text-slate-900">{order.orderId || order.id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Placed On</p>
                                        <p className="text-sm font-bold text-slate-900">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</p>
                                        <p className="text-sm font-bold text-slate-900">{formatCurrency(order.total)}</p>
                                    </div>
                                </div>
                                <div className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest ${STATUS_THEMES[order.status] || "bg-slate-100 text-slate-600"}`}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shipping To</p>
                                        <p className="text-sm leading-relaxed text-slate-600">{order.shippingAddress}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collection Pieces</p>
                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span className="text-slate-600">
                                                        <span className="font-bold text-slate-900">{item.title}</span>
                                                        {item.size && <span className="ml-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] uppercase">Size: {item.size}</span>}
                                                    </span>
                                                    <span className="font-bold text-slate-950">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
