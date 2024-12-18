"use server";

import { Category } from "@/app/models/Category";
import connectDB from "@/lib/db";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { MenuItem } from "@/app/models/MenuItem";

//建立類別
export async function createCatgory(formData) {
  const session = await auth();
  if (!session.user) return;
  const category = formData.get("category");
  await connectDB();
  try {
    const res = await Category.create({ name: category });
    if (!res) {
      return { ok: false, error: "找不到菜單" };
    } else {
      revalidatePath("/account/admin/categories");
      return { ok: true };
    }
  } catch (error) {
    console.error(error);
  }
}

//全部類別獲取
export async function getCategories() {
  const session = await auth();
  if (!session.user) return;
  await connectDB();

  try {
    const res = await Category.find().select({ name: 1, _id: 1 });
    //轉換為字串，然後轉換為 json
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (error) {
    console.error(error);
  }
}

//更新類別
export async function updateCategory(id, newName) {
  const session = await auth();
  if (!session.user) return;
  await connectDB();
  try {
    // 更新類別名稱
    const res = await Category.findByIdAndUpdate(
      id,
      { name: newName },
      { new: true } // 返回更新後的資料
    );

    if (!res) {
      return { ok: false, error: "找不到指定的類別" };
    }
    revalidatePath("/account/admin/categories");
    return { ok: true, data: res };
  } catch (error) {
    console.error("更新類別時發生錯誤：", error);
    return { ok: false, error: "更新失敗" };
  }
}

// 刪除類別
export async function deleteCategory(id) {
  const session = await auth();
  if (!session.user) return;
  await connectDB();

  try {
    // 檢查是否有產品使用該類別
    const hasProducts = await MenuItem.exists({ category: id });
    if (hasProducts) {
      return { ok: false, error: "該類別已被使用，無法刪除" };
    }

    // 刪除類別
    const res = await Category.findByIdAndDelete(id);
    if (!res) {
      return { ok: false, error: "找不到指定的類別" };
    }

    revalidatePath("/account/admin/categories");
    return { ok: true, data: res };
  } catch (error) {
    console.error("刪除類別時發生錯誤：", error);
    return { ok: false, error: "找不到指定的類別" };
  }
}
