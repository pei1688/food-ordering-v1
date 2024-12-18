"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { deleteMenu, updateMenu } from "@/action/menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ImageUpload from "../ImageUpload";
import DeleteModal from "../Modal/DeleteModal";
import MenuItemProp from "../menu/MenuItemProp";
function EditFoodForm({ food, id, params, category }) {
  const [newImage, setNewImage] = useState(food.image || "/default-image.jpg");
  const [sizes, setSizes] = useState(food.sizes || []);
  const [extraIngredientPrice, setExtraIngredientPrice] = useState(
    food.extraIngredientPrice || []
  );
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  // 單一菜品刪除
  async function handleDelete() {
    setOpen(false); // 刪除後關閉 modal
    startTransition(async () => {
      const res = await deleteMenu(params.id);
      if (res?.error) {
        toast.error("刪除失敗");
      } else {
        toast.success("刪除成功");
        router.push("/account/admin/foodList");
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append(
      "extraIngredientPrice",
      JSON.stringify(extraIngredientPrice)
    );
    try {
      const res = await updateMenu(formData, newImage || "");
      if (res?.error) {
        toast.error("更新失敗");
      } else {
        toast.success("更新成功");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto text-zinc-100 mt-4 p-4 h-full"
    >
      <div className="md:flex-row flex flex-col space-x-4">
        {/* 圖片上傳組件 */}
        <ImageUpload newImage={newImage} setNewImage={setNewImage} />
        <hr className="border-food-100" />

        <div className="md:w-1/2 space-y-8 ">
          <div className="flex flex-col  gap-4">
            <Label>食物名稱</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={food.name}
              className="text-zinc-800"
            />
          </div>

          {/* 類別選擇&建立組件 */}
          <div className="flex flex-col gap-4">
            <Label>食物類別</Label>
            <select
              className="text-zinc-800 w-full px-4 py-2 rounded-lg"
              id="category"
              name="category"
            >
              {category?.length > 0 &&
                category.map((item, index) => (
                  <option key={index}>{item.name}</option>
                ))}
            </select>
          </div>

          <div className="flex flex-col  gap-4">
            <Label>食物介紹</Label>
            <Textarea
              placeholder="Type your message here."
              id="description"
              name="description"
              className="text-zinc-800"
              defaultValue={food.description}
            />
          </div>
          <div className="flex  flex-col  gap-4">
            <Label>食物定價</Label>
            <Input
              type="number"
              id="basePrice"
              name="basePrice"
              className="text-zinc-800"
              defaultValue={food.basePrice}
            />
          </div>
          <Input
            type="text"
            id="id"
            name="id"
            className="text-zinc-800 hidden"
            defaultValue={id}
          />
          <MenuItemProp
            prop={sizes}
            setProp={setSizes}
            name={"食物大小"}
            label={"食物大小"}
          />
          <MenuItemProp
            prop={extraIngredientPrice}
            setProp={setExtraIngredientPrice}
            name={"額外配料"}
            label={"小菜"}
          />
          <div className="flex justify-end">
            <Button variant="create">更新</Button>
            <Button
              type="button"
              variant="delete"
              onClick={() => {
                setOpen(true);
              }}
            >
              刪除
            </Button>
          </div>
          {/*確認刪除*/}
          <DeleteModal
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
            isPending={isPending}
          />
        </div>
      </div>
    </form>
  );
}

export default EditFoodForm;
