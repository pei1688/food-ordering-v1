import { getFood } from "@/action/menu";
import { lazy, Suspense } from "react";
import Slider from "@/components/Slider";
import LoadingSpinner from "@/components/LoadingSpinner";
import dynamic from "next/dynamic";
import { filterFood, searchFood, sortFood } from "@/lib/utils";

const Filter = dynamic(() => import("@/components/Filter"));
const MenuList = lazy(() => import("@/components/menu/MenuList"), {
  loading: () => <p>載入菜單...</p>,
}); //懶加載

export const metadata = {
  title: "商品一覽",
};

export async function generateStaticParams() {
  const { category } = await getFood();

  return category.map((cat) => ({
    category: cat.name,
  }));
}

async function page({ searchParams }) {
  const { food, category } = await getFood();
  const filter = searchParams?.category || "全部";
  const sortBy = searchParams?.sort || "default";
  const query = searchParams?.query || "";

  const filteredFood = filterFood(food, filter);
  const sortedFood = sortFood(filteredFood, sortBy);
  const searchedFood = searchFood(sortedFood, query);

  // 類別
  const categories = [
    "全部",
    ...new Set(category.map((item) => item.name).filter(Boolean)),
  ];

  return (
    <section className="min-h-screen mb-16">
      <div className="space-y-6">
        <Slider />
        {/* 過濾 */}
        <Suspense fallback={<LoadingSpinner />}>
          <Filter
            query={query}
            categories={categories}
            currentFilter={filter}
            currentSort={sortBy}
          />
        </Suspense>

        {/* 食物清單 */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchedFood.length === 0 ? (
            <p className="text-center text-brown-50 col-span-full pt-8">
              查無符合的食物。
            </p>
          ) : (
            searchedFood.map((item) => (
              <Suspense fallback={<LoadingSpinner />} key={item._id}>
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
