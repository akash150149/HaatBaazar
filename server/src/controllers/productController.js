import Product from "../models/Product.js";

const FALLBACK_IMAGE = "https://placehold.co/800x600?text=No+Image";

function normalizeImageUrls(images) {
  if (!Array.isArray(images)) return [FALLBACK_IMAGE];
  const sanitized = images
    .map((item) => String(item || "").trim())
    .filter((item) => /^https?:\/\//i.test(item));
  return sanitized.length > 0 ? sanitized : [FALLBACK_IMAGE];
}

export async function listProducts(req, res) {
  const products = await Product.find().sort({ createdAt: -1 });
  return res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(product);
}

export async function createProduct(req, res) {
  const payload = req.body || {};
  if (!payload.title || !payload.category) {
    return res.status(400).json({ message: "Title and category are required" });
  }

  const created = await Product.create({
    title: payload.title,
    description: payload.description || "",
    price: Number(payload.price || 0),
    category: payload.category,
    images: normalizeImageUrls(payload.images),
    stock: Number(payload.stock || 0),
    rating: Number(payload.rating || 0)
  });

  return res.status(201).json(created);
}

export async function updateProduct(req, res) {
  const payload = req.body || {};

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...payload,
      ...(payload.images !== undefined ? { images: normalizeImageUrls(payload.images) } : {}),
      ...(payload.price !== undefined ? { price: Number(payload.price) } : {}),
      ...(payload.stock !== undefined ? { stock: Number(payload.stock) } : {}),
      ...(payload.rating !== undefined ? { rating: Number(payload.rating) } : {})
    },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(updated);
}

export async function deleteProduct(req, res) {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json({ message: "Product deleted" });
}
