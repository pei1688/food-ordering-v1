"use client";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleAlert, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import useCartStore from "@/stores/useStore";
// import MenuItemModal from "../Modal/MenuItemModal";
const MenuItemModal = dynamic(() => import("../Modal/MenuItemModal"), {
  ssr: false,
});

function MenuList({ item }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCartStore();
  return (
    <section className="bg-food-300 text-zinc-50 rounded-md mt-4  shadow-lg border border-food-400 hover:border-food-600 duration-200 cursor-pointer">
      <div className="relative h-[300px]">
        <Image
          src={item.image}
          alt="Food Item"
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          <p className="text-xl">${item.basePrice}</p>
          <div className="flex items-center gap-2 font-semibold">
            <p>100g</p>
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">
                <CircleAlert size={18} />
              </HoverCardTrigger>
              <HoverCardContent className="text-zinc-100 text-sm translate-y-[-85px] p-4">
                熱量: 500卡
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="flex items-center mt-5 justify-between">
          <h4>{item.name}</h4>
          <Button
            variant="add"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Plus size={22} />
          </Button>

          {/*彈出視窗*/}
          <MenuItemModal
            item={item}
            open={open}
            setOpen={setOpen}
            addToCart={addToCart}
          />
        </div>
      </div>
    </section>
  );
}

export default MenuList;
