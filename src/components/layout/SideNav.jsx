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
      className="flex lg:flex-col gap-6 md:gap-8 justify-center sm:items-start items-center py-4 md:py-6
    fixed bottom-0 left-0 right-0 bg-food-300 lg:bg-transparent lg:static
    z-50 rounded-t-lg text-sm lg:text-xl"
    >
      <Link
        href={"/account"}
        className={`md:flex-row  flex flex-col p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
          isActive("/account") ? "bg-food-200" : ""
        }`}
      >
        <div className="flex items-center justify-center mb-1">
          <UserRound size={20} />
        </div>
        <p className="md:text-lg text-xs">個人資料</p>
      </Link>
      <Link
        href={"/account/userOrder"}
        className={`md:flex-row flex flex-col p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
          isActive("/account/userOrder") ? "bg-food-200" : ""
        }`}
      >
        <div className="flex items-center justify-center mb-1">
          <Tag size={18} />
        </div>
        <p className="md:text-lg text-xs ">訂單</p>
      </Link>

      {user?.role === "admin" && (
        <>
          <Link
            className={`md:flex-row  flex flex-col p-2 rounded-md items-center gap-2  hover:bg-food-200 transition-colors ${
              isActive("/account/admin/categories") ? "bg-food-200" : ""
            }`}
            href={"/account/admin/categories"}
          >
            <div className="flex items-center justify-center mb-1">
              <ChartColumnStacked size={18} />
            </div>
            <p className="md:text-lg text-xs">建立類別</p>
          </Link>

          <Link
            className={`md:flex-row  flex flex-col p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
              isActive("/account/admin/foodList") ? "bg-food-200" : ""
            }`}
            href={"/account/admin/foodList"}
          >
            <div className="flex items-center justify-center mb-1">
              <FolderKanban size={18} />
            </div>
            <p className="md:text-lg text-xs">食物總覽</p>
          </Link>
          <Link
            className={`md:flex-row  flex flex-col p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
              isActive("/account/admin/manageUsers") ? "bg-food-200" : ""
            }`}
            href={"/account/admin/manageUsers"}
          >
            <div className="flex items-center justify-center mb-1">
              <UserPen size={18} />
            </div>

            <p className="md:text-lg text-xs">管理用戶</p>
          </Link>
          <Link
            className={`md:flex-row  flex flex-col p-2 rounded-md items-center gap-2 hover:bg-food-200 transition-colors ${
              isActive("/account/admin/orders") ? "bg-food-200" : ""
            }`}
            href={"/account/admin/orders"}
          >
            <div className="flex items-center justify-center mb-1">
              <BookA size={18} />
            </div>
            <p className="md:text-lg text-xs">管理訂單</p>
          </Link>
        </>
      )}
    </nav>
  );
}

export default SideNav;
