import { useEffect, useState } from "react";
import { isLikelyImageUrl, normalizeImageUrl } from "../../../utils/image";
import { uploadProductImage } from "../../../services/productService";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    setForm(toFormValue(editingProduct));
    setError("");
    setSelectedFile(null);
    setUploadMessage("");
  }, [editingProduct]);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async () => {
    setError("");
    setUploadMessage("");
    if (!selectedFile) {
      setError("Please choose an image file first.");
      return;
    }

    try {
      setUploading(true);
      const data = await uploadProductImage(selectedFile);
      onChange("imageUrl", data.url);
      setUploadMessage("Image uploaded successfully.");
      setSelectedFile(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
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

    let normalizedImageUrl = normalizeImageUrl(form.imageUrl);
    if (form.imageUrl.trim() && !isLikelyImageUrl(normalizedImageUrl)) {
      setError("Use a direct image URL (.jpg/.png/.webp) or a cloud image link.");
      return;
    }

    try {
      if (selectedFile) {
        setUploading(true);
        const uploaded = await uploadProductImage(selectedFile);
        normalizedImageUrl = normalizeImageUrl(uploaded?.url);
        if (!normalizedImageUrl) {
          setError("Image upload succeeded but returned URL was invalid.");
          return;
        }
        setUploadMessage("Image uploaded successfully.");
      }

      await onSave({
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price || 0),
        category: form.category.trim().toLowerCase(),
        stock: Number(form.stock || 0),
        rating: Number(form.rating || 0),
        images: normalizedImageUrl ? [normalizedImageUrl] : undefined
      });
      setSelectedFile(null);
    } catch {
      setError("Unable to save product. Please try again.");
    } finally {
      setUploading(false);
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
          placeholder="Direct image URL (not Google search page)"
          className="rounded-md border border-slate-300 px-3 py-2"
        />
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 text-sm font-medium text-slate-700">Or upload image from your device</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
            className="w-full text-sm text-slate-600"
          />
          <button
            type="button"
            onClick={handleFileUpload}
            disabled={uploading}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Tip: selecting a file and clicking Add/Update Product will upload automatically.
        </p>
        {uploadMessage && <p className="mt-2 text-sm text-emerald-700">{uploadMessage}</p>}
      </div>
      <textarea
        value={form.description}
        onChange={(event) => onChange("description", event.target.value)}
        placeholder="Description"
        className="min-h-24 w-full rounded-md border border-slate-300 p-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={uploading}
          className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
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
