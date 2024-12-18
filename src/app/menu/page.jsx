import { getFood } from "@/action/menu";
import Filter from "@/components/Filter";
import MenuList from "@/components/menu/MenuList";
import Slider from "@/components/Slider";
import { Suspense } from "react";

export const metadata = {
  title:"商品一覽"
}

async function page({ searchParams }) {
  const { food, category } = await getFood();
  const filter = searchParams?.category ?? "全部";
  const sortBy = searchParams?.sort ?? "default";
  const query = searchParams?.query ?? "";

  // 過濾類別資料
  const filteredFood =
    filter === "全部"
      ? food
      : food.filter((item) => item.category.name === filter);

  // 過濾排序資料
  const sortedFood = [...filteredFood].sort((a, b) => {
    if (sortBy === "asc") return a.basePrice - b.basePrice; // 價格升序
    if (sortBy === "desc") return b.basePrice - a.basePrice; // 價格降序
    return 0; // 預設排序
  });
  //過濾搜尋
  const searchedFood = sortedFood.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // 類別
  const categories = [
    "全部",
    ...new Set(
      category.map((item) => item.name || "").filter((name) => name) // 過濾掉空字串
    ),
  ];

  return (
    <section className=" min-h-screen mb-16">
      <div className="space-y-6">
        <Slider />
        {/* 過濾 */}
        <Filter
          query={query}
          categories={categories}
          currentFilter={filter}
          currentSort={sortBy}
        />

        {/* 食物清單 */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {searchedFood.length === 0 ? (
            // 顯示無結果提示
            <p className="text-center text-brown-50 col-span-full pt-8">
              查無符合的食物。
            </p>
          ) : (
            searchedFood.map((item) => (
              <Suspense fallback="載入中..." key={item._id}>
                <MenuList item={item} />
              </Suspense>
            ))
          )}
        </div>

      
      </div>
    </section>
  );
}

export default page;
