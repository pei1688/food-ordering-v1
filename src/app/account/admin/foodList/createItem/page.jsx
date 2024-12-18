import { getCategories } from "@/action/category";
import { getOneFood } from "@/action/menu";
import CreateFoodForm from "@/components/_admin/CreateFoodForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "建立新食物",
};

async function page() {
  const category = await getCategories();
  return (
    <section className="flex flex-col rounded-lg text-brown-50 bg-food-200 h-full p-6">
      <div className="w-full flex items-center">
        <div className="flex-1 items-center">
          <h1 className="text-xl ">建立新食物</h1>
        </div>

        <div className=" bg-food-300 text-sm hover:bg-zinc-800 shadow-lg duration-200 px-4">
          <Link
            href={"/account/admin/foodList"}
            className="flex items-center py-2 w-full justify-center "
          >
            <ArrowLeft size={20} className="ml-2" />
            返回食物列表
          </Link>
        </div>
      </div>
      <hr className="my-4 border-food-100" />
      <CreateFoodForm category={category} />
    </section>
  );
}

export default page;
