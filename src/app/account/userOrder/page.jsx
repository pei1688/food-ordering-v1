import { getOrderByEmail } from "@/action/order";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import getSession from "@/lib/getSession";
import UserOrderList from "@/components/order/UserOrderList";
import PaginationComponent from "@/components/PaginationComponent";
import Spinner from "@/components/LoadingSpinner";

export const metadata = {
  title: "訂單",
};

async function page({ searchParams }) {
  const session = await getSession();
  const email = session.user.email;
  const role = session?.user?.role;
  if (!role === "admin") redirect("/");

  let currentPage = parseInt(searchParams.page, 10);
  currentPage = !currentPage || currentPage < 1 ? 1 : currentPage;
  const perPage = 7;
  const { order, totalCount } = await getOrderByEmail(
    perPage,
    currentPage,
    email
  );
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
          <UserOrderList orders={order} />
        </Suspense>
      </div>
      {totalCount > 8 && (
        <PaginationComponent currentPage={currentPage} totalPage={totalPage} />
      )}
    </section>
  );
}

export default page;
