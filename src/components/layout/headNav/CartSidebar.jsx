import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CartSidebar({
  openCartSidebar,
  closeCartSidebar,
  cartProducts,
  removeCartProduct,
  totalCartPrice,
  updateCartProduct,
}) {
  return (
    <section
      className={`fixed flex top-0 right-0 w-full h-full bg-zinc-800 bg-opacity-40 text-brown-50 z-50 transform transition-transform duration-300 ease-in-out ${
        openCartSidebar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* 關閉按鈕 */}
      <div className="flex items-center justify-center h-[57px] w-[57px] bg-brown-400">
        <button onClick={closeCartSidebar} aria-label="Close Cart Sidebar">
          <X size={25} />
        </button>
      </div>

      {/* 側邊欄內容 */}
      <div className="w-full bg-brown-400 p-4 min-h-screen overflow-y-auto">
        {/* 購物車標題 */}
        <h2 className="text-lg font-semibold mb-2">你的購物車</h2>

        {/* 購物車內容 */}
        {cartProducts.length > 0 ? (
          <ul>
            {cartProducts.map((product, index) => (
              <li
                key={index}
                className="py-4 flex items-center border-y border-brown-100 border-opacity-10 justify-between"
              >
                <div className="flex gap-4 text-center">
                  {/* 商品圖片 */}
                  <div className="relative w-[100px] h-[68px]">
                    <Image
                      src={product.image}
                      className="object-cover"
                      fill
                      alt={product.name}
                    />
                  </div>
                  {/* 商品資訊 */}
                  <div className="items-start flex gap-2 flex-col text-sm">
                    <p>
                      {product.name}x{product.quantity}
                    </p>
                    <p className="bg-zinc-700">
                      大小:{product.selectedSize.sizeName}
                    </p>
                    {product.selectedExtra.length > 0 &&
                      product.selectedExtra.map((extra) => (
                        <p>加料:{extra.extraName}</p>
                      ))}
                    <p className="bg-zinc-700">NT${product.totalPrice}元</p>
                    <div className="flex items-center gap-4">
                      {/* 數量調整 */}
                      <Counter
                        quantity={product.quantity}
                        setQuantity={(quantity) =>
                          updateCartProduct(index, quantity)
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* 移除商品按鈕 */}
                <Button
                  onClick={() => removeCartProduct(index)}
                  type="button"
                  variant="remove"
                  size="none"
                >
                  移除
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-brown-150 my-16">購物車是空的。</p>
        )}

        {/* 商品總金額 */}
        <div className="flex mt-[30px] items-center justify-between text-lg font-semibold">
          <p>合計商品金額:</p>
          <p>NT${totalCartPrice}</p>
        </div>

        {/* 查看購物車按鈕 */}
        <div className="pb-4 mt-[30px]">
          <Link
            href={"/cart"}
            onClick={closeCartSidebar}
            className="w-full p-2 flex justify-center bg-brown-200 hover:bg-brown-300 text-zinc-100"
          >
            查看購物車
          </Link>
        </div>

        {/* 注意事項 */}
        <p className="p-4 text-sm text-red-500 leading-7">
          *注意！此金額尚未計算運費，僅供對照商品明細和商品金額參考，並非最終結算金額，結帳前會顯示詳細金額。
        </p>
      </div>
    </section>
  );
}

export default CartSidebar;
