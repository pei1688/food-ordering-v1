import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Dropdown from "./Dropdown";
import { logoutUser } from "@/action/user";
import { Button } from "@/components/ui/button";
import { FolderKanban, LogOut, User, UserPen, UserRound } from "lucide-react";

function UserMenu({ user }) {
  // console.log(user);

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-2 cursor-pointer">
          {user ? (
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.image || ""}
                alt="avatar"
                className="bg-zinc-900"
              />
              <AvatarFallback>
                {user?.name?.slice(0, 2) || "未登入"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User size={32} />
          )}
        </div>
      }
      dropdownClassName="w-[150px] bg-white shadow-xl text-zinc-800 rounded-lg text-sm"
    >
      {user ? (
        <>
          <div className="p-4">會員: {user?.name}</div>
          <Link href="/account">
            <div className="w-full hover:bg-zinc-200 p-4 rounded-t-md duration-200 flex items-center gap-2">
              <UserRound size={20} />
              個人資料
            </div>
          </Link>
          {user?.role === "admin" && (
            <>
              <Link href="/account/admin/foodList">
                <div className="w-full hover:bg-zinc-200 p-4 rounded-t-md duration-200 flex items-center gap-2">
                  <FolderKanban size={18} />
                  食物列表
                </div>
              </Link>
              <Link href="/account/admin/manageUsers">
                <div className="w-full hover:bg-zinc-200 p-4 rounded-t-md duration-200 flex items-center gap-2">
                  <UserPen size={18} />
                  管理用戶
                </div>
              </Link>
            </>
          )}
          <form action={logoutUser}>
            <Button
              className="w-full hover:bg-zinc-200 p-4 rounded-t-md duration-200 flex items-center gap-2"
              size="none"
              variant="none"
            >
              <LogOut size={18} />
              登出
            </Button>
          </form>
        </>
      ) : (
        <div>
          <div className="p-4">會員: 尚未登入</div>
          <Link href="/login">
            <div className="w-full hover:bg-zinc-200 p-4 rounded-t-md duration-200">
              登入
            </div>
          </Link>
          <Link href="/register">
            <div className="w-full hover:bg-zinc-200 p-4 rounded-b-md duration-200">
              註冊
            </div>
          </Link>
        </div>
      )}
    </Dropdown>
  );
}

export default UserMenu;
