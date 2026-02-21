import apiClient from "./apiClient";

export async function getProducts() {
  const { data } = await apiClient.get("/products");
  return data;
}

export async function getProductById(id) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}

export async function createProduct(payload) {
  const { data } = await apiClient.post("/products", payload);
  return data;
}

export async function editProduct(productId, payload) {
  const { data } = await apiClient.put(`/products/${productId}`, payload);
  return data;
}

export async function removeProduct(productId) {
  await apiClient.delete(`/products/${productId}`);
}
