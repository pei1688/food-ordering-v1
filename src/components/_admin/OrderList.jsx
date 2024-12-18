import { CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";

async function OrderList({ orders }) {
  return (
    <div className="space-y-4">
      {orders.length > 0 &&
        orders.map((order) => (
          <div
            className="bg-food-100 py-4 px-4 flex flex-col sm:flex-row rounded-md shadow-sm hover:shadow-md items-center gap-4 "
            key={order.id}
          >
            {/* 支付狀態 */}
            <div className="flex items-center">
              {order.paid ? (
                <div className="bg-green-600 px-4 py-1 rounded-md text-white flex items-center justify-center">
                  <CircleCheck size={18} />
                </div>
              ) : (
                <div className="bg-red-600 px-4 py-1 rounded-md text-white flex items-center justify-center">
                  <CircleX size={18} />
                </div>
              )}
            </div>
            {/* 用戶 Email */}
            <div className="flex-1 text-sm  break-all md:break-normal">
              {order.userEmail}
            </div>
            {/* 訂單食物*/}
            <div className="flex-1 flex gap-2 ">
              {order.cartProducts.slice(0, 2).map((p) => (
                <span>
                  {p.name}x{p.quantity}
                </span>
              ))}
              {order.cartProducts.length > 2 && <span>...</span>}
            </div>

            {/* 訂單時間與詳細內容按鈕 */}
            <div className="flex flex-col md:flex-row md:items-center text-sm  gap-6">
              <div className="whitespace-nowrap">
                {new Date(order.createdAt).toLocaleString()}
              </div>

              <Link
                href={`/account/admin/orders/${order._id}`}
                className="text-brown-150 underline flex  justify-center"
              >
                詳細內容
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default OrderList;
