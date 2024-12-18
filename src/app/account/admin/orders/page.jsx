import { getOrder } from "@/action/order";
import { auth } from "../../../../auth";
import { Suspense } from "react";
import OrderList from "@/components/_admin/OrderList";
import { redirect } from "next/navigation";
import PaginationComponent from "@/components/PaginationComponent";
import Spinner from "@/components/Spinner";

export const metadata = {
  title: "客戶訂單"
};

async function page({ searchParams }) {
  const session = await auth();
  const role = session?.user?.role;
  if (!role === "admin") redirect("/");

  let currentPage = parseInt(searchParams.page, 10);
  currentPage = !currentPage || currentPage < 1 ? 1 : currentPage;
  const perPage = 7;
  const { orders, totalCount } = await getOrder(perPage, currentPage);
  // 計算總頁數
  const totalPage = Math.ceil(totalCount / perPage);

  return (
    <section className="flex flex-col  rounded-lg text-zinc-100  bg-food-200 h-full p-4">
      <div className="text-3xl max-w-md  w-full pl-4 space-y-2">
        <h1 className="text-xl">管理訂單</h1>
        <p className="text-sm">查看與管理用戶訂單</p>
      </div>
      <hr className="my-4 border-food-100" />
      <div>
        <Suspense fallback={<Spinner />}>
          <OrderList orders={orders} />
        </Suspense>
      </div>
      {totalCount > 8 && (
        <div className="flex justify-center items-center mt-16 text-zinc-100">
          <PaginationComponent
            currentPage={currentPage}
            totalPage={totalPage}
          />
        </div>
      )}
    </section>
  );
}

export default page;
