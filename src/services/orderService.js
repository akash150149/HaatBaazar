import apiClient from "./apiClient";

export async function getOrders() {
  const { data } = await apiClient.get("/orders");
  return data;
}

export async function createOrder(payload) {
  const { data } = await apiClient.post("/orders", payload);
  return data;
}

export async function createRazorpayOrder(payload) {
  const { data } = await apiClient.post("/orders/payment/razorpay/order", payload);
  return data;
}

export async function verifyRazorpayPayment(payload) {
  const { data } = await apiClient.post("/orders/payment/razorpay/verify", payload);
  return data;
}

export async function updateOrderStatus(orderId, status) {
  const { data } = await apiClient.patch(`/orders/${orderId}/status`, { status });
  return data;
}
