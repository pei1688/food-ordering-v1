"use client";
import CartProduct from "@/app/cart/cartProduct/CartProduct";
import AdressInfo from "./AdressInfo";
import { useContext, useState } from "react";
import { CartContext } from "@/context/AppContext";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";

function CheckoutForm({ initialAddressInfo, user }) {
  const [addressInfo, setAddressInfo] = useState(initialAddressInfo);
  const { cartProducts, removeCartProduct, updateCartProduct } =
    useContext(CartContext);
  const totalCartPrice = cartProducts.reduce(
    (total, product) => total + product.totalPrice,
    0
  );

  async function handleCheckout() {
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addressInfo,
          cartProducts,
          totalPrice: totalCartPrice,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "準備您的訂單...",
      success: "前往付款...",
      error: "錯誤...請稍後再嘗試一遍",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-zinc-100 min-h-[700px] flex justify-center items-center">
        <div className="flex flex-col items-center text-center space-y-6 p-8">
          <p className="text-2xl font-semibold">您還沒有選購食物😞</p>
          <p className="text-lg text-zinc-300">快來選擇一些美味的食物吧！</p>
          <Link
            href="/menu"
            className="text-xl flex gap-2 border border-food-600 p-3 hover:bg-food-300 hover:text-white transition-colors rounded-lg"
          >
            立即選購食物 <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 bg-food-100 p-4 bg-opacity-50 rounded-lg  ">
      {/* 左半部：購物車內容 */}
      <div className="overflow-y-auto lg:max-h-[600px] max-h-[400px] ">
        <h1 className="text-2xl gap-2 mb-2 flex items-center sticky">
          我的購物車
        </h1>
        {cartProducts?.length === 0 ? (
          <div className="text-center flex flex-col gap-3 text-zinc-100">
            <span>購物車還沒有物品</span>
            <Button variant="link" size="none">
              立即購物
            </Button>
          </div>
        ) : (
          <CartProduct
            cartProducts={cartProducts}
            removeCartProduct={removeCartProduct}
            totalCartPrice={totalCartPrice}
            updateCartProduct={updateCartProduct}
          />
        )}
      </div>

      {/* 右半部：結帳區域 */}
      {user ? (
        <form className="flex flex-col sm:mb-0 mb-6">
          <h1 className="text-2xl gap-2 mb-2 flex items-center">付款資訊</h1>
          <div className="  w-full rounded-lg pt-4 pb-8 md:px-8 flex flex-col space-y-8 lg:max-h-[700px] overflow-y-auto">
            <AdressInfo
              addressInfo={addressInfo}
              onAddressChange={setAddressInfo}
            />
            <Button
              type="button"
              variant="login"
              className="justify-center lg:flex hidden"
              onClick={handleCheckout}
            >
              前往付款
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-food-100 bg-opacity-50 w-full rounded-lg flex justify-center items-center text-2xl">
          請先
          <Link href={"/login"} className="hover:text-food-600 underline ml-1">
            登入
          </Link>
        </div>
      )}

      {/* 總價格：手機底部顯示 */}
      <div className="fixed bottom-0 left-0 right-0 bg-brown-400 rounded-t-md p-4 border-food-300 lg:hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-zinc-100">
            總價格:
            <span className="text-food-600 text-xl ml-2">
              ${totalCartPrice}
            </span>
          </h2>
          <Button
            type="button"
            variant="login"
            className="justify-center"
            onClick={handleCheckout}
          >
            前往付款
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CheckoutForm;
