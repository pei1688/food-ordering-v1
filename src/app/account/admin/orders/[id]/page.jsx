import { getOrderById } from "@/action/order";
import SectionHeader from "@/components/layout/SectionHeader";
import OrderAddress from "@/components/order/OrderAddress";
import OrderProduct from "@/components/order/OrderProduct";
import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";

async function page({ params }) {
  const { id } = params;
  const order = await getOrderById(id);
  const session = await getSession();
  const role = session?.user?.role;
  if (!role === "admin") redirect("/");

  return (
    <section className=" text-zinc-100 bg-food-200 p-4 rounded-lg">
      <SectionHeader subHeader={"客戶訂單資訊"} />
      <div className="flex justify-end mb-4">
        <Button variant="create">
          <Link href={"/account/admin/orders"}>返回</Link>
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

export default page;
