import { getCategories } from "@/action/category";
import { getOneFood } from "@/action/menu";
import EditFoodForm from "@/components/_admin/EditFoodForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "編輯食物",
};

async function page({ params }) {
  const { id } = params;
  const food = await getOneFood(id);
  const category = await getCategories();

  return (
    <section className="flex flex-col  rounded-lg text-zinc-100  bg-food-200 h-full p-4">
      <div className="text-xl items-center  w-full  px-4 flex justify-between">
        <div className="text-xl items-center  w-full flex">
          <h1 className="">編輯:</h1>
          <h1 className="text-food-600">{food?.name}</h1>
        </div>
        <Link href={"/account/admin/foodList"}>
          <Button variant="create">返回</Button>
        </Link>
      </div>
      <hr className="my-4 border-food-100" />
      <EditFoodForm food={food} id={id} params={params} category={category} />
    </section>
  );
}

export default page;
