"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const CartContext = createContext({});

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  //儲存在localStorge
  function saveCartToLs(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  //加入購物車
  // function addToCart(product) {
  //   setCartProducts((prevProducts) => {
  //     const newProducts = [...prevProducts, product];
  //     saveCartToLs(newProducts);
  //     // console.log(newProducts);
  //     return newProducts;
  //   });
  // }

  function addToCartX(product) {
    setCartProducts((prevProducts) => {
      // 檢查是否已經有相同的產品
      const existingProductIndex = prevProducts.findIndex(
        (p) =>
          p._id === product._id && // ID相同
          p.selectedSize?.sizeName === product.selectedSize?.sizeName && // 尺寸相同
          p.selectedExtra?.extraName === product.selectedExtra?.extraName // 加料相同
      );

      let newProducts;
      if (existingProductIndex !== -1) {
        // 如果找到相同產品，更新數量
        newProducts = prevProducts.map((p, index) =>
          index === existingProductIndex
            ? {
                ...p,
                quantity: p.quantity + product.quantity,
                totalPrice: p.totalPrice + product.totalPrice,
              }
            : p
        );
      } else {
        // 如果沒有找到相同產品，新增產品
        newProducts = [...prevProducts, product];
      }
      saveCartToLs(newProducts);
      return newProducts;
    });
  }
  function addToCart(product) {
    setCartProducts((prevProducts) => {
      // 檢查是否已經有相同的產品
      const existingProductIndex = prevProducts.findIndex((p) => {
        // 檢查ID與尺寸是否相同
        const isSameSize = p.selectedSize?.sizeName === product.selectedSize?.sizeName;
  
        // 檢查加料是否完全相同
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
        // 如果找到相同產品，更新數量
        newProducts = prevProducts.map((p, index) =>
          index === existingProductIndex
            ? {
                ...p,
                quantity: p.quantity + product.quantity,
                totalPrice: p.totalPrice + product.totalPrice,
              }
            : p
        );
      } else {
        // 如果沒有找到相同產品，新增產品
        newProducts = [...prevProducts, product];
      }
      saveCartToLs(newProducts);
      return newProducts;
    });
  }
  

  //數量增減
  function updateCartProduct(indexToUpdate, quantity) {
    setCartProducts((prevCartProducts) => {
      const updatedCart = prevCartProducts.map((product, index) => {
        if (index === indexToUpdate) {
          return {
            ...product,
            quantity,
            totalPrice:
              (product.basePrice + (product.selectedExtra?.price || 0)) *
              quantity,
          };
        }
        return product;
      });

      saveCartToLs(updatedCart);
      return updatedCart;
    });
  }

  //清理購物車
  function clearCart() {
    setCartProducts([]);
    saveCartToLs([]);
  }

  //清除單一購物車物品
  function removeCartProduct(idx) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== idx
      );

      saveCartToLs(newCartProducts);
      toast.success("已從購物車移除");
      return newCartProducts;
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        clearCart,
        removeCartProduct,
        updateCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
