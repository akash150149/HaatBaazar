import { useEffect, useMemo, useState } from "react";
import SeoHelmet from "../../../seo/SeoHelmet";
import Spinner from "../../../components/layout/Spinner";
import { useProducts } from "../../../context";
import { getOrders } from "../../../services/orderService";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import OrdersTable from "../components/OrdersTable";

export default function AdminDashboardPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [editingProduct, setEditingProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      setLoadingOrders(true);
      setOrdersError("");
      try {
        const data = await getOrders();
        if (isMounted) setOrders(data);
      } catch {
        if (isMounted) setOrdersError("Failed to load orders.");
      } finally {
        if (isMounted) setLoadingOrders(false);
      }
    }

    loadOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  const summary = useMemo(
    () => ({
      totalProducts: products.length,
      lowStock: products.filter((product) => product.stock <= 10).length,
      totalOrders: orders.length
    }),
    [products, orders]
  );

  const handleSaveProduct = async (payload) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        setMessage("Product updated.");
        setEditingProduct(null);
        return;
      }

      await addProduct(payload);
      setMessage("Product added.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to save product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setMessage("Product deleted.");
      if (editingProduct?.id === productId) setEditingProduct(null);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <section className="space-y-6">
      <SeoHelmet title="Admin Dashboard" description="Manage products and orders" />
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Manage products and monitor mock order activity.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-500">Products</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{summary.totalProducts}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-500">Low Stock</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{summary.lowStock}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-500">Orders</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{summary.totalOrders}</p>
        </article>
      </div>

      {message && <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}

      <ProductForm
        editingProduct={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Products</h2>
        <ProductTable products={products} onEdit={setEditingProduct} onDelete={handleDeleteProduct} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Orders</h2>
        {loadingOrders ? (
          <Spinner />
        ) : ordersError ? (
          <p className="rounded-md bg-red-50 p-4 text-red-700">{ordersError}</p>
        ) : (
          <OrdersTable orders={orders} />
        )}
      </section>
    </section>
  );
}
