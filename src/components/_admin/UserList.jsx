"use client";
import { updateUserRole } from "@/action/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Checkbox } from "../ui/checkbox";

function UsersList({ allUser }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const isAdmin = formData.get("role") === "on";
    const id = formData.get("id");
    const newRole = isAdmin ? "admin" : "user";

    startTransition(() => {
      updateUserRole(id, newRole);
    });
    router.push("/account");
  };

  return (
    <div className="space-y-4">
      {allUser.map((user) => (
        <div
          key={user._id}
          className="flex flex-wrap sm:justify-between gap-5 p-4 rounded-md border border-brown-100 shadow-md hover:shadow-lg items-center text-zinc-100"
        >
          <div className="border rounded-full border-food-600">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.image || ""}
                alt="avatar"
                className="bg-zinc-900"
              />
              <AvatarFallback>
                {user.name.split("").slice(0, 4).join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          {/* 用戶信息 */}
          <div className="flex-1">
            <div className="text-sm font-medium ">姓名: {user.name}</div>
            <div className="text-sm ">Email: {user.email}</div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto"
          >
            <Label className="flex items-center gap-2" htmlFor={user._id}>
              <Checkbox
                id={user._id}
                name="role"
                defaultChecked={user.role === "admin"}
                disabled={isPending}
              />
              管理員
            </Label>
            <Input type="hidden" name="id" defaultValue={user._id} />
            <Button type="submit" disabled={isPending}>
              {isPending ? "更新中..." : "更改"}
            </Button>
            <div className="text-sm flex gap-1">
              <p>建立時間:</p>
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
