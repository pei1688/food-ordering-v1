import connectDB from "@/lib/db";
import { auth } from "../../../auth";
import { Order } from "@/app/models/Order";

export async function GET(req) {
  await connectDB();
  const session = await auth();
  const userEmail = session?.user?.email;
  const role = session?.user?.role;

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (_id) {
    return Response.json(await Order.findById(_id));
  }
  if (role === "admin") {
    return Response.json(await Order.find());
  }
  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}
