import { ArrowRight, ShoppingCart } from "lucide-react";
import Dropdown from "./Dropdown";
import Image from "next/image";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";

function CartMenu({ cartProducts, removeCartProduct, totalCartPrice }) {

  
  return (
    <Dropdown
      trigger={
        <div className="text-zinc-100 relative">
          <Link href={"/cart"}>
            <ShoppingCart size={32} />
          </Link>
          {cartProducts?.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-food-600 text-xs px-1 rounded-full text-zinc-800 font-semibold">
              {cartProducts.length}
            </div>
          )}
        </div>
      }
      dropdownClassName="w-[350px] p-2 bg-white shadow-xl text-zinc-800 rounded-lg text-sm"
    >
      {cartProducts && cartProducts.length > 0 ? (
        <div className="p-4">
          <Label className="text-food-200 opacity-50 text-sm">
            已加入的購物車
          </Label>
          <ul >
            {cartProducts.map((product, index) => (
              <li
                key={index}
                className="py-2 flex items-center  justify-between"
              >
                <div className="flex gap-2 text-center items-center">
                  <div className="relative w-[50px] h-[50px] ">
                    <Image
                      src={product.image}
                      className="object-cover "
                      fill
                      alt="index"
                    />
                  </div>
                  <div className="font-semibold ">{product.name}</div>
                  <div className="">x{product.quantity}</div>
                </div>
                <div className="font-semibold text-food-400 flex gap-4">
                  ${product.totalPrice}
                  <Button
                    onClick={() => removeCartProduct(index)}
                    type="button"
                    variant="remove"
                    size="none"
                  >
                    移除
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-food-400 h-0.5 bg-opacity-50 my-2" />
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-zinc-800">
              總價格: <span className=" ">${totalCartPrice}</span>
            </h2>
            <Link href={"/cart"} className=" ">
              <Button variant="cart" className="flex items-center ">
                查看購物車
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center">
          <Label className="text-food-200 opacity-50 text-sm p-4 w-full">
            最近加入的購物車
          </Label>
          購物車為空
        </div>
      )}
    </Dropdown>
  );
}

export default CartMenu;
