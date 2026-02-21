import Order from "../models/Order.js";

export async function createOrder(req, res) {
  const { items = [], subtotal, shippingAddress, paymentMethod } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order items are required" });
  }
  if (!shippingAddress?.trim()) {
    return res.status(400).json({ message: "Shipping address is required" });
  }

  const normalizedItems = items.map((item) => ({
    productId: item.id,
    title: item.title,
    price: Number(item.price),
    quantity: Number(item.quantity)
  }));

  const itemsCount = normalizedItems.reduce((count, item) => count + item.quantity, 0);
  const safeSubtotal = Number(subtotal || 0);

  const order = await Order.create({
    orderId: `ORD-${Date.now()}`,
    user: req.user.sub,
    items: normalizedItems,
    itemsCount,
    subtotal: safeSubtotal,
    shippingAddress: shippingAddress.trim(),
    paymentMethod,
    status: "processing"
  });

  const json = order.toJSON();
  return res.status(201).json({
    ...json,
    total: json.subtotal
  });
}

export async function listOrders(req, res) {
  const query = req.user.role === "admin" ? {} : { user: req.user.sub };
  const orders = await Order.find(query).sort({ createdAt: -1 }).populate("user", "name email");

  const normalized = orders.map((orderDoc) => {
    const order = orderDoc.toJSON();
    return {
      ...order,
      customer: orderDoc.user?.name || orderDoc.user?.email || "Unknown customer",
      total: order.subtotal
    };
  });

  return res.json(normalized);
}
