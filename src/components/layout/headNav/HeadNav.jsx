"use client";
import { useState } from "react";
import { EggFried, Logs, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import dynamic from "next/dynamic";
import useCartStore from "@/stores/useStore";

const CartSidebar = dynamic(() => import("./CartSidebar"), {
  ssr: false,
});

function HeadNav({ user }) {
  const { cartProducts, updateCartProduct, removeCartProduct } = useCartStore();
  const [openMenu, setOpenMenu] = useState(false);
  const [openCartSidebar, setOpenCartSidebar] = useState(false);
  const pathName = usePathname();
  const isActive = (path) => pathName === path;
  const totalCartPrice = cartProducts.reduce(
    (total, product) => total + product.totalPrice,
    0
  );

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const toggleCartSidebar = () => {
    setOpenCartSidebar(!openCartSidebar);
    closeMenu();
  };
  const closeCartSidebar = () => setOpenCartSidebar(false);

  return (
    <>
      <nav className="fixed left-0 right-0 z-50  top-0   ">
        <div className="flex  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center w-full justify-between text-brown-50 transition-all bg-gradient-to-tr  from-food-300/15 to-food-200/50 py-4 lg:py-5 rounded-b-lg">
          <Link
            href="/"
            className="text-brown-150 font-semibold text-xl md:text-4xl flex items-center gap-3"
          >
            <EggFried size={35} />
            <p>DineEasy</p>
          </Link>
          <DesktopMenu
            user={user}
            isActive={isActive}
            cartProducts={cartProducts}
            totalCartPrice={totalCartPrice}
            removeCartProduct={removeCartProduct}
          />
          <div className="absolute top-4 right-4 text-brown-150 flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="md:hidden "
              aria-label="Toggle Menu"
            >
              <Logs size={30} />
            </button>
            <div className="text-zinc-100 relative md:hidden flex">
              <button onClick={toggleCartSidebar}>
                <ShoppingCart size={30} />
              </button>
              {cartProducts?.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-food-600 text-xs px-1 rounded-full text-zinc-800 font-semibold">
                  {cartProducts.length}
                </div>
              )}
            </div>
          </div>
        </div>
        <MobileMenu
          openMenu={openMenu}
          closeMenu={closeMenu}
          toggleCartSidebar={toggleCartSidebar}
          user={user}
          cartProducts={cartProducts}
        />
        <CartSidebar
          openCartSidebar={openCartSidebar}
          closeCartSidebar={closeCartSidebar}
          cartProducts={cartProducts}
          totalCartPrice={totalCartPrice}
          removeCartProduct={removeCartProduct}
          updateCartProduct={updateCartProduct}
        />
      </nav>
    </>
  );
}

export default HeadNav;
