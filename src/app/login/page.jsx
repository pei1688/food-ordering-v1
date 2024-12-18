import getSession from "@/lib/getSession";
import LoginForm from "./loginForm/LoginForm";
import { redirect } from "next/navigation";

export const metadata = {
  title:"登入"
}

async function page() {
  const session = await getSession();
  const user = session?.user;

  if (user) redirect("/");

  return (
    <section className=" text-zinc-200 h-[600px] md:min-h-[950px] flex flex-col justify-center  ">
      <LoginForm />
    </section>
  );
}

export default page;
