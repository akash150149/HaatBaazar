import apiClient from "./apiClient";

export async function getOrders() {
  const { data } = await apiClient.get("/orders");
  return data;
}

export async function createOrder(payload) {
  const { data } = await apiClient.post("/orders", payload);
  return data;
}
