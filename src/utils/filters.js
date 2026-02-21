export function filterProducts(products, query) {
  if (!query) return products;
  const normalized = query.toLowerCase();
  return products.filter((p) => p.title.toLowerCase().includes(normalized));
}
