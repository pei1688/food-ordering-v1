import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import UsersList from "../../../../components/_admin/UserList";
import { Suspense } from "react";
import { getUser } from "@/action/user";
import PaginationComponent from "@/components/PaginationComponent";
import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata = {
  title: "用戶列表",
};

async function page({ searchParams }) {
  const session = await getSession();
  const role = session?.user?.role;
  if (role === "user") redirect("/");

  let currentPage = parseInt(searchParams.page, 10);
  currentPage = !currentPage || currentPage < 1 ? 1 : currentPage;
  const perPage = 7;
  const { allUser, totalCount } = await getUser(perPage, currentPage);
  // 計算總頁數
  const totalPage = Math.ceil(totalCount / perPage);

  return (
    <section className="flex flex-col  rounded-lg text-zinc-100  bg-food-200 h-full p-4">
      <div className="text-3xl max-w-md  w-full pl-4 space-y-2">
        <h1 className="text-xl">用戶列表</h1>
        <p className="text-sm">查看與管理用戶權限</p>
      </div>
      <hr className="my-4 border-food-100" />
      <Suspense fallback={<LoadingSpinner />}>
        <UsersList allUser={allUser} />
      </Suspense>
      {/*分頁*/}
      {totalCount > 8 && (
        <PaginationComponent currentPage={currentPage} totalPage={totalPage} />
      )}
    </section>
  );
}

export default page;
