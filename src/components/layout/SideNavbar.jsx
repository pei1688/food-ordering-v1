import getSession from "@/lib/getSession";
import SideNav from "./SideNav";
import { getUserByEmail } from "@/action/user";

async function SideNavbar() {
  const session = await getSession();
  const user = await getUserByEmail(session?.user?.email);
  
  return (
    <div className="text-zinc-100 text-lg  lg:w-[300px] w-0 ">
      <SideNav user={user} />
    </div>
  );
}

export default SideNavbar;
