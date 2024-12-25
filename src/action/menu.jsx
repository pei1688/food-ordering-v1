"use server";

import { MenuItem } from "@/app/models/MenuItem";
import connectDB from "@/lib/db";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { Category } from "@/app/models/Category";

//建立菜單
export async function createFood(formData, newImage) {
  const session = await auth();
  if (!session.user) return;
  const image = newImage;
  const fields = Object.fromEntries(formData);
  const filterfields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );
  // 查詢 Category 集合以獲取指定 category 的 ObjectId
  const category = await Category.findOne({ name: filterfields.category });
  if (!category) {
    console.error("找不到分類");
    return { ok: false, error: "找不到分類" };
  }

  const data = {
    ...filterfields,
    image,
    category: category._id, // 填入從 Category 查詢出來的 _id
    sizes: filterfields.sizes ? JSON.parse(filterfields.sizes) : [],
    extraIngredientPrice: filterfields.extraIngredientPrice
      ? JSON.parse(filterfields.extraIngredientPrice)
      : [],
  };
  await connectDB();
  try {
     await MenuItem.create(data);
    revalidatePath("/account/admin/foodList"); // 確保返回成功的訊息
    return { ok: true };
  } catch (error) {
    console.error(error);
  }
}

//獲取全部菜單&
export async function getFood() {
  try {
    // 查詢所有食物項目並使用 populate 來加載 category 資料
    const res = await MenuItem.find({})
      .populate("category")
    const food = JSON.parse(JSON.stringify(res));
    //數量
    const foodCount = await MenuItem.countDocuments({});

    const category = await Category.find({});

    const response = { food, foodCount, category };
    return response;
  } catch (error) {
    console.error("Error fetching food items:", error);
    return [];
  }
}

export async function getFoodFilter(perPage, page, category, sortBy, query) {
  const filters = {};

  // 處理分類過濾條件
  if (category && category !== "全部") {
    const categoryDoc = await Category.findOne({ name: category }).lean();
    if (!categoryDoc) {
      throw new Error(`Category '${category}' not found`);
    }
    filters.category = categoryDoc._id; // 將分類名稱轉為 ObjectId
  }

  // 處理名稱搜尋過濾條件
  if (query) {
    filters.name = { $regex: query, $options: "i" }; // 模糊搜尋
  }

  // 處理排序選項
  const sortOptions = {};
  if (sortBy === "asc") sortOptions.basePrice = 1;
  if (sortBy === "desc") sortOptions.basePrice = -1;

  // 並行查詢資料與計算總數
  const [food, totalCount] = await Promise.all([
    MenuItem.find(filters)
      .sort(sortOptions)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("category"), // 填充 category 資料
    MenuItem.countDocuments(filters),
  ]);

  // 取得所有分類清單
  const categories = await Category.find().select("name").lean();

  return { food, totalCount, categories };
}

//獲取單個菜
export async function getOneFood(id) {
  const session = await auth();
  if (!session.user) return;
  try {
    await connectDB();
    //.lean將查詢結果轉為普通的 JavaScript 物件，而不是 Mongoose 文檔實例
    const res = await MenuItem.findById({ _id: id }).lean();
    const food = JSON.parse(JSON.stringify(res));
    return food;
  } catch (error) {}
}

// 更新菜單
export async function updateMenu(formData, newImage) {
  const session = await auth();
  if (!session.user) return;
  const data = Object.fromEntries(formData);
  const categoryName = data.category; // 從 formData 中提取 category
  const category = await Category.findOne({ name: categoryName });
  // 去除空值
  const { id, ...filterData } = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "")
  );
  // 準備更新的數據
  const updateData = {
    ...filterData,
    category: category ? category._id : null, // 若無該類別則為 null
    image: newImage,
    sizes: filterData.sizes ? JSON.parse(filterData.sizes) : [],
    extraIngredientPrice: filterData.extraIngredientPrice
      ? JSON.parse(filterData.extraIngredientPrice)
      : [],
  };
  console.log(updateData);
  await connectDB();
  try {
    await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
    // 只刷新菜單頁面
    revalidatePath("/account/admin/foodList");
  } catch (error) {
    console.log(error);
  }
}

//刪除菜
export async function deleteMenu(paramsId) {
  const session = await auth();
  if (!session.user) return;
  await connectDB();
  try {
    const res = await MenuItem.findByIdAndDelete(paramsId);
    if (!res) {
      return { ok: false, error: "找不到菜單" };
    } else {
      return { ok: true };
    }
  } catch (error) {
    console.error(error);
  }
}
