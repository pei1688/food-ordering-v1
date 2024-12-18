"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCatgory } from "@/action/category";
import { toast } from "sonner";

function CategoryForm() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await createCatgory(formData);

    if (res?.ok) {
      toast.success("建立成功");
      e.target.reset();
    } else {
      toast.error("建立失敗");
    }
  }
  return (
    <form
      // action={createCatgory}
      onSubmit={handleSubmit}
      className=" flex items-end  max-w-md gap-4 w-full mx-auto text-zinc-100 my-4 p-4 "
    >
      <div className="flex flex-col space-y-3 w-full">
        <Label className="text-md">新的類別名稱</Label>
        <Input
          type="text"
          name="category"
          id="category"
          className="text-zinc-800 "
        />
      </div>

      <div className="pt-2">
        <Button>建立</Button>
      </div>
    </form>
  );
}

export default CategoryForm;
