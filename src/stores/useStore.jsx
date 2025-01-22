import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartProducts: [],
      addToCart: (product) => {
        set((state) => {
          const existingProductIndex = state.cartProducts.findIndex((p) => {
            const isSameSize =
              p.selectedSize?.sizeName === product.selectedSize?.sizeName;

            const isSameExtras =
              p.selectedExtra.length === product.selectedExtra.length &&
              p.selectedExtra
                .map((extra) => extra.extraName)
                .sort()
                .join(",") ===
                product.selectedExtra
                  .map((extra) => extra.extraName)
                  .sort()
                  .join(",");

            return p._id === product._id && isSameSize && isSameExtras;
          });

          let newProducts;
          if (existingProductIndex !== -1) {
            newProducts = state.cartProducts.map((p, index) =>
              index === existingProductIndex
                ? {
                    ...p,
                    quantity: p.quantity + product.quantity,
                    totalPrice: p.totalPrice + product.totalPrice,
                  }
                : p
            );
          } else {
            newProducts = [...state.cartProducts, product];
          }
          return { cartProducts: newProducts };
        });
      },
      updateCartProduct: (indexToUpdate, quantity) => {
        set((state) => {
          const updatedCart = state.cartProducts.map((product, index) => {
            if (index === indexToUpdate) {
              const extrasPrice = product.selectedExtra.reduce(
                (sum, extra) => sum + extra.price,
                0
              );
              return {
                ...product,
                quantity,
                totalPrice: (product.basePrice + extrasPrice) * quantity,
              };
            }
            return product;
          });

          return { cartProducts: updatedCart };
        });
      },
      clearCart: () => {
        set({ cartProducts: [] });
      },
      removeCartProduct: (idx) => {
        set((state) => {
          const newCartProducts = state.cartProducts.filter(
            (v, index) => index !== idx
          );

          toast.success("已從購物車移除");
          return { cartProducts: newCartProducts };
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
