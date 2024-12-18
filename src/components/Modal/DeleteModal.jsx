"use client";

import Modal from "./Modal";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";
import { Label } from "../ui/label";

function DeleteModal({ open, setOpen, handleDelete, isPending }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="relative h-[150px] flex flex-col">
        <Label className="text-xl p-4 flex items-center gap-2">
          <TriangleAlert size={22} /> 確認刪除
        </Label>
        <p className="px-4 text-sm">刪除後就無法再復原了，確定要刪除嗎?</p>
        <div className="absolute top-0 right-0">
          <Button variant="modal" onClick={() => setOpen(false)}>
            X
          </Button>
        </div>
        <div className="flex items-center justify-end mt-4 gap-4">
          <Button
            variant="modal"
            className="text-red-500 hover:text-red-600"
            onClick={handleDelete}
            disabled={isPending}
          >
            確認刪除
          </Button>
          <Button variant="modal" onClick={() => setOpen(false)}>
            取消
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
