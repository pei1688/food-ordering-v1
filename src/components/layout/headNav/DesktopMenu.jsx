const { default: CartMenu } = require("@/components/Dropdown/CartMenu");
const { default: UserMenu } = require("@/components/Dropdown/UserMenu");
const { default: Link } = require("next/link");

const DesktopMenu = ({
  user,
  isActive,
  cartProducts,
  totalCartPrice,
  removeCartProduct,
}) => (
  <div className="md:flex hidden items-center gap-10 duration-200">
    <Link
      href="#"
      className={`hover:text-brown-150  ${
        isActive("/about") ? "text-brown-150" : ""
      }`}
    >
      關於
    </Link>
    <Link
      href="/menu"
      className={`hover:text-brown-150 ${
        isActive("/menu") ? "text-brown-150" : ""
      }`}
    >
      商品一覽
    </Link>
    <Link
      href="#"
      className={`hover:text-brown-150 ${
        isActive("/connect") ? "text-brown-150" : ""
      }`}
    >
      聯絡
    </Link>
    <UserMenu user={user} />
    <CartMenu
      cartProducts={cartProducts}
      removeCartProduct={removeCartProduct}
      totalCartPrice={totalCartPrice}
    />
  </div>
);

export default DesktopMenu;
