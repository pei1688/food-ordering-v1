import { getUserByEmail } from "@/action/user";
import HeadNav from "./HeadNav";
import getSession from "@/lib/getSession";

async function Header() {
  const session = await getSession();
  const user = await getUserByEmail(session?.user?.email);
  let userName = user?.name || user?.email;
  if (userName?.includes("" || "@")) {
    userName = userName.split("@" || "")[0];
  }

  return (
    <header>
      <HeadNav user={user} />
    </header>
  );
}

export default Header;
