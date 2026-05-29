import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContextCore";

const STORAGE_KEY = "vendefacil_cart";

const getStoredCart = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Solo guarda los campos necesarios — no imágenes pesadas ni datos extra
const normalizeProduct = product => ({
  id:       product.id,
  title:    product.title,
  price:    product.price,
  image:    product.image,
  category: product.category,
  discount: product.discount ?? null,
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCart);

  // Persistir en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = product => {
    const item = normalizeProduct(product);
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = id =>
    setCartItems(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id, quantity) =>
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, Number(quantity)) } : i)
    );

  const decreaseQuantity = id =>
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
          .filter(i => i.quantity > 0)
    );

  const clearCart = () => setCartItems([]);

  // useMemo solo para los valores derivados que se calculan — no para las funciones
  const cartCount = useMemo(() => cartItems.reduce((t, i) => t + i.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((t, i) => t + i.price * i.quantity, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
