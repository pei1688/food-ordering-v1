import { getOrderById } from "@/action/order";
import SectionHeader from "@/components/layout/SectionHeader";
import OrderAddress from "@/components/order/OrderAddress";
import OrderProduct from "@/components/order/OrderProduct";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function userOrderForm({ params }) {
  const { id } = params; // 獲取動態路由參數
  const order = await getOrderById(id);

  return (
    <section className="flex flex-col  rounded-lg text-zinc-100  bg-food-200 h-full p-4">
      <SectionHeader subHeader={"您的訂單資訊"} />
      <div className="flex justify-end mb-4">
        <Button variant="create">
          <Link href={"/account/userOrder"}>返回</Link>
        </Button>
      </div>
      {order && (
        <div className="grid  md:grid-cols-2 gap-6  ">
          <OrderProduct order={order} />
          <OrderAddress order={order} />
        </div>
      )}
    </section>
  );
}

export default userOrderForm;
