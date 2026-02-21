import { createContext, useContext, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";

const CartContext = createContext(null);

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStoredCart());

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(nextItems));
  };

  const addToCart = (product, quantity = 1) => {
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      const nextItems = items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      persist(nextItems);
      return;
    }
    persist([...items, { ...product, quantity }]);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    persist(items.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (productId) => {
    persist(items.filter((item) => item.id !== productId));
  };

  const clearCart = () => persist([]);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }),
    [items, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
