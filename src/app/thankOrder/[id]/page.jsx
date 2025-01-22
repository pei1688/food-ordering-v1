"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import useCartStore from "@/stores/useStore";
function page() {
  const { clearCart } = useCartStore();
  const [order, setOrder] = useState();
  const { id } = useParams();
  const router = useRouter();
  //如果網址轉入clearCart時會清空購物車
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
    }
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <section className=" text-zinc-100 ">
      <SectionHeader subHeader={"訂單完成"} />
      <div className="py-4 text-center">
        <p>感謝您的訂單🙂! 當您的訂單在途中時，我們會打電話給您</p>
        <p>您將在 5 秒內轉回到首頁...</p>
      </div>
    </section>
  );
}

export default page;
