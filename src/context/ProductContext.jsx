import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createProduct,
  editProduct,
  getProducts,
  removeProduct
} from "../services/productService";

const ProductContext = createContext(null);

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products]
  );

  const getProductById = (id) => products.find((product) => product.id === id) || null;

  const queryProducts = ({
    search = "",
    category = "all",
    minPrice = 0,
    maxPrice = Infinity,
    sortBy = "newest"
  } = {}) => {
    const normalizedSearch = normalizeText(search);

    const filtered = products.filter((product) => {
      const inCategory = category === "all" ? true : product.category === category;
      const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
      const inSearch = normalizedSearch
        ? normalizeText(product.title).includes(normalizedSearch) ||
          normalizeText(product.description).includes(normalizedSearch)
        : true;

      return inCategory && inPriceRange && inSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating-desc") return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const addProduct = async (payload) => {
    const created = await createProduct(payload);
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  const updateProduct = async (productId, payload) => {
    const updated = await editProduct(productId, payload);
    setProducts((prev) => prev.map((item) => (item.id === productId ? updated : item)));
    return updated;
  };

  const deleteProduct = async (productId) => {
    await removeProduct(productId);
    setProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  const value = useMemo(
    () => ({
      products,
      categories,
      loading,
      error,
      reload: loadProducts,
      getProductById,
      queryProducts,
      addProduct,
      updateProduct,
      deleteProduct
    }),
    [products, categories, loading, error]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
}
