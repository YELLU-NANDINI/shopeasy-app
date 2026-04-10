import { create } from "zustand";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
interface CartState {
  cartItems: CartProduct[];
  addToCart: (p: CartProduct) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQty: (id: number) => void;   // ✅ NEW
  decreaseQty: (id: number) => void;   // ✅ NEW
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],

  addToCart: (p) =>
    set((state) => {
      const exists = state.cartItems.find((item) => item.id === p.id);

      if (exists) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === p.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, p],
      };
    }),

  increaseQty: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),
}));