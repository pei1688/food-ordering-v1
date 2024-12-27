import Link from "next/link";
async function UserOrderList({ orders }) {
  return (
    <div className="space-y-4">
      {orders.length > 0 &&
        orders.map((order, index) => (
          <div
            className="bg-food-100 py-4 px-4 flex flex-col sm:flex-row rounded-md shadow-sm hover:shadow-md items-center gap-6 "
            key={index}
          >
            <div className="flex items-center text-sm gap-4 flex-1">
              {order.paid ? (
                <div className="bg-green-600 px-4 py-1 rounded-md text-white flex items-center justify-center">
                  已付款
                </div>
              ) : (
                <div className="bg-red-700 px-4 py-1 rounded-md text-white flex items-center justify-center">
                  待付款
                </div>
              )}
              <div className=" text-sm  break-all md:break-normal flex items-center  gap-2">
                <div className="whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            {/* 訂單食物*/}
            <div className="flex-1 flex gap-2">
              {order.cartProducts && order.cartProducts.length > 0 ? (
                order.cartProducts.map((p) => (
                  <span key={p.name}>
                    {p.name}x{p.quantity}
                  </span>
                ))
              ) : (
                <span>無食物項目</span>
              )}
              {order.cartProducts?.length > 2 && <span>...</span>}
            </div>
            {/* 訂單時間與詳細內容按鈕 */}
            <div className="flex flex-col md:flex-row md:items-center text-sm  gap-6">
              <Link
                href={`/account/userOrder/${order._id}`}
                className="text-brown-150 underline flex  justify-center"
              >
                訂單資訊
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserOrderList;
