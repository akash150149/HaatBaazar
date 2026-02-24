import Order from "../models/Order.js";
import crypto from "crypto";
import { getRazorpayInstance } from "../config/razorpay.js";

function normalizeOrderItems(items = []) {
  return items.map((item) => ({
    productId: item.id || item.productId,
    title: item.title,
    price: Number(item.price),
    quantity: Number(item.quantity),
    size: item.size,
    color: item.color
  })).filter((item) =>
    item.productId &&
    item.title &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    Number.isFinite(item.quantity) &&
    item.quantity > 0
  );
}

function serializeOrder(orderDoc, customerFallback = "Unknown customer") {
  const order = orderDoc.toJSON();
  return {
    ...order,
    customer: customerFallback,
    total: order.subtotal
  };
}

async function createPersistedOrder({
  userId,
  items,
  subtotal,
  shippingAddress,
  paymentMethod,
  paymentStatus,
  paymentMeta = {}
}) {
  const normalizedItems = normalizeOrderItems(items);
  const itemsCount = normalizedItems.reduce((count, item) => count + item.quantity, 0);
  const safeSubtotal = Number(subtotal || 0);

  if (normalizedItems.length === 0 || itemsCount <= 0) {
    const err = new Error("Order items are invalid");
    err.statusCode = 400;
    throw err;
  }
  if (!Number.isFinite(safeSubtotal) || safeSubtotal <= 0) {
    const err = new Error("Order subtotal is invalid");
    err.statusCode = 400;
    throw err;
  }

  const order = await Order.create({
    orderId: `ORD-${Date.now()}`,
    user: userId,
    items: normalizedItems,
    itemsCount,
    subtotal: safeSubtotal,
    shippingAddress: String(shippingAddress || "").trim(),
    paymentMethod,
    paymentStatus,
    paymentMeta,
    status: "pending"
  });

  return order;
}

export async function createOrder(req, res) {
  const { items = [], subtotal, shippingAddress, paymentMethod } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order items are required" });
  }
  if (!shippingAddress?.trim()) {
    return res.status(400).json({ message: "Shipping address is required" });
  }
  if (paymentMethod !== "cod") {
    return res.status(400).json({ message: "Use online payment flow for non-COD orders" });
  }

  const order = await createPersistedOrder({
    userId: req.user.sub,
    items,
    subtotal,
    shippingAddress,
    paymentMethod: "cod",
    paymentStatus: "pending"
  });

  return res.status(201).json(serializeOrder(order));
}

export async function createRazorpayOrder(req, res) {
  const { subtotal } = req.body || {};
  const amount = Math.round(Number(subtotal || 0) * 100);

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid payment amount" });
  }

  let created;
  try {
    const razorpay = getRazorpayInstance();
    created = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.user.sub
      }
    });
  } catch (err) {
    const wrapped = new Error("Payment provider timeout/unreachable. Please try again.");
    wrapped.statusCode = err?.code === "ETIMEDOUT" ? 503 : 502;
    throw wrapped;
  }

  return res.status(201).json({
    orderId: created.id,
    amount: created.amount,
    currency: created.currency,
    keyId: process.env.RAZORPAY_KEY_ID
  });
}

export async function verifyRazorpayPayment(req, res) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderPayload
  } = req.body || {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Missing payment verification fields" });
  }
  if (!orderPayload?.shippingAddress || !Array.isArray(orderPayload?.items) || orderPayload.items.length === 0) {
    return res.status(400).json({ message: "Order payload is incomplete" });
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ message: "Razorpay secret is not configured" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  const order = await createPersistedOrder({
    userId: req.user.sub,
    items: orderPayload.items,
    subtotal: orderPayload.subtotal,
    shippingAddress: orderPayload.shippingAddress,
    paymentMethod: "online",
    paymentStatus: "paid",
    paymentMeta: {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    }
  });

  return res.status(201).json(serializeOrder(order));
}

export async function updateOrderStatus(req, res) {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json(serializeOrder(order));
}

export async function listOrders(req, res) {
  const query = req.user.role === "admin" ? {} : { user: req.user.sub };
  const orders = await Order.find(query).sort({ createdAt: -1 }).populate("user", "name email");

  const normalized = orders.map((orderDoc) => serializeOrder(orderDoc, orderDoc.user?.name || orderDoc.user?.email || "Unknown customer"));

  return res.json(normalized);
}
