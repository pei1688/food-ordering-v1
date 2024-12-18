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
            {/* 用戶 Email */}
            <div className="flex-1 text-sm  break-all md:break-normal flex items-center  gap-2">
              <p>用戶:</p>
              {order.userEmail}
            </div>
            {/* 訂單食物*/}
            <div className="flex-1 flex gap-2">
              {order.cartProducts.slice(0, 3).map((p) => (
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
                href={`/account/userOrder/${order._id}`}
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

export default UserOrderList;
