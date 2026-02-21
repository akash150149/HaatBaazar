import { useEffect, useState } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  rating: "",
  imageUrl: ""
};

function toFormValue(product) {
  if (!product) return EMPTY_FORM;
  return {
    title: product.title,
    description: product.description,
    price: String(product.price),
    category: product.category,
    stock: String(product.stock),
    rating: String(product.rating),
    imageUrl: product.images?.[0] || ""
  };
}

export default function ProductForm({ editingProduct, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(toFormValue(editingProduct));
    setError("");
  }, [editingProduct]);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.category.trim()) {
      setError("Title and category are required.");
      return;
    }

    if (Number(form.price) < 0 || Number(form.stock) < 0) {
      setError("Price and stock must be non-negative.");
      return;
    }

    try {
      await onSave({
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price || 0),
        category: form.category.trim().toLowerCase(),
        stock: Number(form.stock || 0),
        rating: Number(form.rating || 0),
        images: form.imageUrl.trim() ? [form.imageUrl.trim()] : undefined
      });
    } catch {
      setError("Unable to save product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          type="text"
          value={form.title}
          onChange={(event) => onChange("title", event.target.value)}
          placeholder="Product title"
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="text"
          value={form.category}
          onChange={(event) => onChange("category", event.target.value)}
          placeholder="Category"
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(event) => onChange("price", event.target.value)}
          placeholder="Price"
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="number"
          min="0"
          step="1"
          value={form.stock}
          onChange={(event) => onChange("stock", event.target.value)}
          placeholder="Stock"
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={(event) => onChange("rating", event.target.value)}
          placeholder="Rating (0-5)"
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="url"
          value={form.imageUrl}
          onChange={(event) => onChange("imageUrl", event.target.value)}
          placeholder="Image URL"
          className="rounded-md border border-slate-300 px-3 py-2"
        />
      </div>
      <textarea
        value={form.description}
        onChange={(event) => onChange("description", event.target.value)}
        placeholder="Description"
        className="min-h-24 w-full rounded-md border border-slate-300 p-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button type="submit" className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
