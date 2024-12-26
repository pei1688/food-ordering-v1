"use client";
import { deleteCategory, updateCategory } from "@/action/category";
import DeleteModal from "@/components/Modal/DeleteModal";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

import { useState, useTransition } from "react";
import { toast } from "sonner";

function CategoryItem({ item }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categoryName, setCategoryName] = useState(item.name);
  const handleChange = (e) => setCategoryName(e.target.value);

  // 提交編輯表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory(item._id, categoryName);
      toast[res?.ok ? "success" : "error"](
        res?.ok ? "分類更新成功" : "分類更新失敗",
        res?.error
      );
    } catch (error) {
      toast.error("請求錯誤");
      console.error("請求錯誤", error);
    }
    setOpenEditModal(false);
  };

  // 執行刪除操作
  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteCategory(item._id);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("刪除成功");
      }
    });
    setOpenDeleteModal(false);
  };

  return (
    <section className="flex border border-food-400 hover:border-food-600 px-2 py-1 items-center justify-between rounded-lg bg-food-100">
      <Label className="text-md  ml-4">{item.name}</Label>
      <div className="flex gap-4">
        <Button
          variant="modal"
          size="none"
          className="text-brown-100 hover:text-brown-150"
          onClick={() => setOpenEditModal(true)}
        >
          編輯
        </Button>
        <Button
          variant="modal"
          size="none"
          className="text-red-400 hover:text-red-500"
          onClick={() => setOpenDeleteModal(true)}
        >
          刪除
        </Button>
      </div>

      {/* 編輯 Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <div className="relative h-[150px] flex flex-col">
          <Label className="text-xl p-4 flex items-center gap-2">
            <Pencil size={22} />
            <p >編輯類別</p>
          </Label>
          <div className="absolute top-0 right-0">
            <Button variant="modal" onClick={() => setOpenEditModal(false)}>
              X
            </Button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center mt-4 gap-4"
          >
            <Input
              type="text"
              className="text-food-300"
              value={categoryName}
              onChange={handleChange}
            />
            <Button variant="create">更改</Button>
          </form>
        </div>
      </Modal>

      {/*確認刪除*/}
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDelete}
        isPending={isPending}
      />
    </section>
  );
}

export default CategoryItem;
