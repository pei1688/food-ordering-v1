import { logoutUser } from "@/action/user";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";

function MobileMenu({
  openMenu,
  closeMenu,
  toggleCartSidebar,
  user,
  cartProducts,
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full pt-36 bg-zinc-800 bg-opacity-100 z-50 flex flex-col items-center gap-12 text-brown-50 text-lg transition-opacity duration-300 ease-in-out ${
        openMenu
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute top-4 right-4 text-brown-150 flex items-center gap-4">
        <button onClick={closeMenu} aria-label="Close Menu">
          <X size={30} />
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
      <Link href="#" onClick={closeMenu}>
        關於
      </Link>
      <Link href="/menu" onClick={closeMenu}>
        商品一覽
      </Link>
      <Link href="#" onClick={closeMenu}>
        聯絡
      </Link>
      {user ? (
        <>
          <Link href="/account" onClick={closeMenu}>
            個人檔案
          </Link>
          <form action={logoutUser}>
            <Button className="text-lg" size="none" onClick={closeMenu}>
              登出
            </Button>
          </form>
        </>
      ) : (
        <Link href="/login" onClick={closeMenu}>
          登入
        </Link>
      )}
    </div>
  );
}

export default MobileMenu;
