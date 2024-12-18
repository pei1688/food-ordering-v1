"use client";
import {
  BookA,
  ChartColumnStacked,
  FolderKanban,
  Tag,
  UserPen,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav({ user }) {
  const pathName = usePathname();
  const isActive = (path) => pathName === path;

  return (
    <nav
      className="flex lg:flex-col gap-8 justify-center sm:items-start items-center py-4 md:py-6
    fixed bottom-0 left-0 right-0 bg-food-300 lg:bg-transparent lg:static
    z-50 rounded-t-lg text-sm lg:text-xl"
    >
      <Link
        href={"/account"}
        className={`flex p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
          isActive("/account") ? "bg-food-200" : ""
        }`}
      >
        <UserRound size={20} />
        <p className="hidden md:flex">個人資料</p>
      </Link>
      <Link
        href={"/account/userOrder"}
        className={`flex p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
          isActive("/account/userOrder") ? "bg-food-200" : ""
        }`}
      >
        <Tag size={18} />
        <p className="hidden md:flex">訂單</p>
      </Link>

      {user?.role === "admin" && (
        <>
          <Link
            className={`flex p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
              isActive("/account/admin/categories") ? "bg-food-200" : ""
            }`}
            href={"/account/admin/categories"}
          >
            <ChartColumnStacked size={18} />
            <p className="hidden md:flex">建立類別</p>
          </Link>
          <Link
            className={`flex p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
              isActive("/account/admin/foodList") ? "bg-food-200" : ""
            }`}
            href={"/account/admin/foodList"}
          >
            <FolderKanban size={18} />
            <p className="hidden md:flex">食物總覽</p>
          </Link>
          <Link
            className={`flex p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
              isActive("/account/admin/manageUsers") ? "bg-food-200" : ""
            }`}
            href={"/account/admin/manageUsers"}
          >
            <UserPen size={18} />
            <p className="hidden md:flex">管理用戶</p>
          </Link>
          <Link
            className={`flex p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
              isActive("/account/admin/orders") ? "bg-food-200" : ""
            }`}
            href={"/account/admin/orders"}
          >
            <BookA size={18} />
            <p className="hidden md:flex">管理訂單</p>
          </Link>
        </>
      )}
    </nav>
  );
}

export default SideNav;
