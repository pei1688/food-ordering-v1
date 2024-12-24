"use client";
import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

function CartProduct({
  cartProducts,
  removeCartProduct,
  totalCartPrice,
  updateCartProduct,
}) {
  return (
    <div className="space-y-6">
      {cartProducts?.length > 0 &&
        cartProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center  justify-between gap-2  bg-opacity-50  pb-4 border-b-brown-150/50 border-b"
          >
            {/* 圖片與產品資訊 */}
            <div className="flex items-center gap-4  min-w-[200px]">
              <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex-shrink-0 border rounded-lg border-brown-400">
                <Image
                  alt={product.name}
                  src={product.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col text-sm space-y-2 ">
                <h3 className="font-medium text-lg text-zinc-100">
                  {product.name}
                </h3>
                {product.selectedSize && (
                  <div>
                    <span className="font-medium text-food-600 ">
                      大小:{product.selectedSize.sizeName}
                    </span>
                  </div>
                )}
                {product.selectedExtra && product.selectedExtra.length > 0 && (
                  <div className="flex flex-col">
                    {product.selectedExtra.map((extra) => (
                      <span
                        key={extra.extraName}
                        className="font-medium text-food-600"
                      >
                        +{extra.extraName} ${extra.price}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 選擇數量 */}
            <div className="flex flex-1  items-center gap-4 justify-center  ">
              <Counter
                quantity={product.quantity}
                setQuantity={(quantity) => updateCartProduct(index, quantity)}
              />
            </div>

            {/* 價格與刪除 */}
            <div className="flex flex-1 w-full justify-end items-center flex-row gap-4">
              <div className="font-medium text-lg text-zinc-50">
                ${product.totalPrice}
              </div>
              <Button
                onClick={() => removeCartProduct(index)}
                type="button"
                variant="remove"
              >
                移除
              </Button>
            </div>
          </div>
        ))}

      {/* 總價格 */}
      <div className="flex-col lg:flex  justify-between items-end pt-4 hidden">
        <h2 className="text-lg font-medium text-zinc-100">
          總價格:{" "}
          <span className="text-zinc-50text-xl ml-2">${totalCartPrice}</span>
        </h2>
      </div>
    </div>
  );
}

export default CartProduct;
