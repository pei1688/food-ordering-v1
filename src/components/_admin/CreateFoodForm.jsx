"use client";
import { useState } from "react";
import ImageUpload from "../ImageUpload";
import MenuItemProp from "../menu/MenuItemProp";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { createFood } from "@/action/menu";

function CreateFoodForm({ category }) {
  const [newImage, setNewImage] = useState("/default-image.jpg");
  const [sizes, setSizes] = useState([]);
  const [extraIngredientPrice, setExtraIngredientPrice] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append(
      "extraIngredientPrice",
      JSON.stringify(extraIngredientPrice)
    );
    try {
      const res = await createFood(formData, newImage || "");
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
            />
          </div>
          <div className="flex  flex-col  gap-4">
            <Label>食物定價</Label>
            <Input
              type="number"
              id="basePrice"
              name="basePrice"
              className="text-zinc-800"
            />
          </div>
          <Input
            type="text"
            id="id"
            name="id"
            className="text-zinc-800 hidden"
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
            <Button variant="create" className="w-full flex justify-center">
              建立
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateFoodForm;
