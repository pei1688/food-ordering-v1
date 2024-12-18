import { Suspense } from "react";
import FoodItem from "../../../../components/_admin/FoodItem";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getUserByEmail } from "@/action/user";
import Filter from "@/components/Filter";
import { getFoodFilter } from "@/action/menu";
import Spinner from "@/components/Spinner";

export const metadata = {
  title: "食物列表",
};

async function page({ searchParams }) {
  const session = await getSession();
  const user = await getUserByEmail(session?.user?.email);
  if (user?.role !== "admin") redirect("/account");

  // 分頁參數處理
  let currentPage = parseInt(searchParams.page, 10);
  currentPage = !currentPage || currentPage < 1 ? 1 : currentPage;
  const perPage = 12;

  // 查詢參數
  const filter = searchParams?.category ?? "全部";
  const sortBy = searchParams?.sort ?? "default";
  const query = searchParams?.query ?? "";

  // 從伺服端取得過濾後的資料
  const { food, totalCount, categories } = await getFoodFilter(
    perPage,
    currentPage,
    filter,
    sortBy,
    query
  );

  // 類別處理（取得所有類別）
  const categoryList = [
    "全部",
    ...categories.map((cat) => cat.name).filter(Boolean),
  ];

  return (
    <section className="flex flex-col rounded-lg text-brown-50 bg-food-200 h-full p-6">
      <div className="w-full flex items-center">
        <div className="flex-1 items-center">
          <h1 className="text-xl ">食物列表</h1>
        </div>

        <div className=" bg-food-300 text-sm hover:bg-zinc-800 shadow-lg duration-200 px-4">
          <Link
            href={"/account/admin/foodList/createItem"}
            className="flex items-center py-2 w-full justify-center "
          >
            建立新食物
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
      <div className="my-4">
        <Filter
          query={query}
          categories={categoryList}
          currentFilter={filter}
          currentSort={sortBy}
        />
      </div>

      <hr className="my-4 border-food-100" />

      <Suspense fallback={<Spinner />}>
        <FoodItem
          searchedFood={food}
          totalCount={totalCount}
          perPage={perPage}
          currentPage={currentPage}
        />
      </Suspense>
    </section>
  );
}

export default page;
