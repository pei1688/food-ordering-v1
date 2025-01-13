"use server";

import { User } from "@/app/models/User";
import connectDB from "@/lib/db";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "../auth";
import { revalidatePath } from "next/cache";
import getSession from "@/lib/getSession";
//註冊
export async function registerProfile(formData) {
  const { email, password, name } = formData;

  await connectDB();
  const hashPassword = await hash(password, 12);

  const res = await User.create({
    name,
    email,
    password: hashPassword,
    image: "https://github.com/shadcn.png",
  });
  redirect("/login");
}

//一般帳號登入
export async function loginProfile(formData) {
  const { email, password } = formData;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });
  } catch (error) {
    return error;
  }
  redirect("/");
}
//社群帳號登入
export async function socialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirect: "/" });
}

//登出
export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}

//更新個人資料
export async function updateProfile(formData, newImage) {
  const session = await getSession();
  const email = session?.user?.email;
  const filteredFields = Object.fromEntries(
    Object.entries(formData).filter(([_, value]) => value !== "")
  );
  // console.log(filteredFields);
  await connectDB();
  try {
    // 更新 MongoDB 使用者資料
    const updatedFields = {
      ...filteredFields,
      image: newImage,
    };
    const result = await User.updateOne({ email }, { $set: updatedFields });
    console.log("Update Result:", result);
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("資料更新錯誤:", err);
    return { success: false };
  }
}

//獲取資料庫個人資訊id
export async function getUserByEmail(email) {
  try {
    await connectDB();
    const res = await User.findOne({ email });
    //使用JSON.stringify和JSON.parse手動轉換資料來刪除不支援的方法來傳遞資料
    const user = JSON.parse(JSON.stringify(res));
    return user;
  } catch (error) {}
}

//獲取全部使用者
export async function getUser(perPage,currentPage) {
  const session = await auth();
  if (!session.user) return;
  try {
    await connectDB();
    const res = await User.find({})
      .skip(perPage * (currentPage - 1))
      .limit(perPage);
    const allUser = JSON.parse(JSON.stringify(res));
    const totalCount = await User.countDocuments({});
    const response = { allUser, totalCount };
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//更新為管理員
export async function updateUserRole(id, newRole) {
  try {
    await connectDB();
    // 更新用戶角色到數據庫
    const result = await User.updateOne(
      { _id: id }, // 條件
      { $set: { role: newRole } } // 更新操作
    );
    revalidatePath("/admin/manageUsers"); // 替換為你的當前頁面路徑
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    throw new Error("更新用戶角色失敗");
  }
}
