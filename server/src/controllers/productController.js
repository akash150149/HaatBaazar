import Product from "../models/Product.js";
import { getCloudinary } from "../config/cloudinary.js";
import path from "node:path";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";

const FALLBACK_IMAGE = "https://placehold.co/800x600?text=No+Image";

function normalizeImageUrls(images) {
  if (!Array.isArray(images)) return [FALLBACK_IMAGE];
  const sanitized = images
    .map((item) => String(item || "").trim())
    .filter((item) => /^https?:\/\//i.test(item));
  return sanitized.length > 0 ? sanitized : [FALLBACK_IMAGE];
}

function uploadBufferToCloudinary(cloudinary, buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
    stream.end(buffer);
  });
}

function extensionFromMime(mime = "") {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "bin";
}

async function saveImageLocally(req) {
  const ext = extensionFromMime(req.file.mimetype);
  const fileName = `${Date.now()}-${randomUUID()}.${ext}`;
  const uploadsDir = path.resolve(process.cwd(), "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, fileName);
  await fs.writeFile(filePath, req.file.buffer);

  return `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
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

export async function uploadProductImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({ message: "Cloudinary is not configured" });
  }

  if (!req.file.buffer || req.file.size <= 0) {
    return res.status(400).json({ message: "Uploaded image is empty" });
  }

  if (!req.file.mimetype?.startsWith("image/")) {
    return res.status(400).json({ message: "Only image files are allowed" });
  }

  let uploaded;
  try {
    const cloudinary = getCloudinary();
    uploaded = await uploadBufferToCloudinary(cloudinary, req.file.buffer, {
      folder: "shop/products",
      resource_type: "image"
    });
  } catch (err) {
    const providerMessage = err?.error?.message || err?.message || "Cloudinary upload failed";
    if (err?.code === "ETIMEDOUT") {
      const localUrl = await saveImageLocally(req);
      return res.status(201).json({
        url: localUrl,
        storage: "local-fallback",
        warning: "Cloudinary unreachable, saved locally instead."
      });
    }

    const wrapped = new Error(`Cloudinary upload failed: ${providerMessage}`);
    wrapped.statusCode = err?.http_code || 502;
    throw wrapped;
  }

  return res.status(201).json({
    url: uploaded.secure_url
  });
}
