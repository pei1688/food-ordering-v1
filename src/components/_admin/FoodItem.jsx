import PaginationComponent from "@/components/PaginationComponent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function FoodItem({ searchedFood, totalCount, perPage, currentPage }) {
  // 計算總頁數
  const totalPage = Math.ceil(totalCount / perPage);

  return (
    <div className="flex flex-col min-h-[700px]">
      {" "}
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
          {searchedFood.map((item) => (
            <Link
              href={`/account/admin/foodList/edit/${item._id}`}
              key={item._id}
              className="flex flex-col h-[200px] border border-food-400 bg-food-100 rounded-md hover:shadow-lg duration-200 hover:border-food-600"
            >
              <div className="relative h-full w-full">
                <Image
                  className="object-cover rounded-md"
                  fill
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-between my-2 px-3">
                <p className="">{item.name}</p>
                <div className="flex items-center">
                  編輯 <ArrowRight size={18} className="text-food-600" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <hr className="my-2 border-food-100" />
      {/*分頁*/}
      {totalCount > 12 && (
        <PaginationComponent currentPage={currentPage} totalPage={totalPage} />
      )}
    </div>
  );
}

export default FoodItem;
