import Image from "next/image";
function OrderProduct({ order }) {
  return (
    <div className="overflow-y-auto max-h-[500px]">
      <div className="w-full space-y-6 ">
        {order.cartProducts.map((product) => (
          <ul
            key={product.id}
            className="flex items-center justify-between gap-6 bg-food-100 bg-opacity-50 rounded-lg p-2 overflow-y-auto "
          >
            {/* 圖片與產品資訊 */}
            <li className="flex items-center gap-4   w-auto">
              <div className="relative w-[100px] h-[100px] flex-shrink-0">
                <Image
                  alt={product.name}
                  src={product.image}
                  fill
                  className="object-cover "
                />
              </div>
            </li>
            <li>
              <div className="flex  flex-col text-sm space-y-2 ">
                <h2 className="font-medium text-md ">
                  {product.name}x{product.quantity}
                </h2>
                {product.selectedSize && (
                  <div className="text-zinc-100">
                    大小:{" "}
                    <span className="font-medium">
                      {product.selectedSize.sizeName}
                    </span>
                  </div>
                )}
                {product.selectedExtra && (
                  <div className="text-zinc-100 ">
                    加選:{" "}
                    <span className="font-medium">
                      {product.selectedExtra.extraName} $
                      {product.selectedExtra.price}
                    </span>
                  </div>
                )}
              </div>
            </li>

            {/* 價格與刪除 */}
            <li className="flex items-center  justify-end gap-4 flex-1 mr-3">
              <div className="font-medium text-lg">${product.totalPrice}</div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default OrderProduct;
