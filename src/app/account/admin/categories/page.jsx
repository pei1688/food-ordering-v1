import { getCategories } from "@/action/category";
import CategoryForm from "@/components/_admin/CategoryForm";
import CategoryItem from "@/components/_admin/CategoryItem";


export const metadata = {
  title: "分類列表"
};

async function page() {
  const categories = await getCategories();

  return (
    <section className="flex flex-col  rounded-lg text-zinc-100  bg-food-200 h-full px-4 py-8">
      <div className="text-3xl max-w-md  pl-4 space-y-2">
        <h1 className="text-xl flex items-center gap-2"> 建立類別</h1>
      </div>
      <hr className="my-4 border-food-100" />
      <CategoryForm />
      <hr className="my-4 border-food-100" />
      <div className="text-3xl max-w-md  pl-4 space-y-2">
        <h1 className="text-xl flex items-center gap-2"> 現有類別</h1>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
        {categories?.length > 0 &&
          categories.map((item, index) => (
            <CategoryItem item={item} key={index} />
          ))}
      </div>
    </section>
  );
}

export default page;
