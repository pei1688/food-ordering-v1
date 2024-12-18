"use server";
import { Order } from "@/app/models/Order";
import { auth } from "../auth";
import connectDB from "@/lib/db";

//獲得特定使用者訂單
export async function getOrderByEmail(perPage, currentPage, email) {
  const session = await auth();
  if (!session?.user) return;
  await connectDB();
  try {
    const order = await Order.find({ userEmail: email })
      .skip(perPage * (currentPage - 1))
      .limit(perPage)
      .sort({ createdAt: -1 }) // 按建立日期降序排列
      .lean();
    //數量
    const totalCount = await Order.countDocuments({ userEmail: email });
    const response = { order, totalCount };
    return response;
  } catch (error) {
    console.error(error);
  }
}

//獲得單個訂單
export async function getOrderById(id) {
  const session = await auth();
  if (!session?.user) return;
  await connectDB();
  try {
    const order = await Order.findById(id).lean();
    return order;
  } catch (error) {
    console.error(error);
  }
}

//獲得全部訂單
export async function getOrder(perPage,  currentPage) {
  await connectDB();
  try {
    const orders = await Order.find({})
      .skip(perPage * ( currentPage - 1))
      .limit(perPage)
      .sort({ createdAt: -1 }) // 按建立日期降序排列
      .lean();

    //數量
    const totalCount = await Order.countDocuments({});
    const response = { orders, totalCount };
    return response;
  } catch (error) {
    console.error("獲取訂單失敗：", error);
    return { orders: [], totalCount: 0 };
  }
}
