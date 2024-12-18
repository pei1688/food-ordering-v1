import getSession from "@/lib/getSession";
import RegisterForm from "./RegisterForm/RegisterForm";
import { redirect } from "next/navigation";

export const metadata = {
  title:"註冊"
}

async function page() {
  const session = await getSession();
  const user = session?.user;
  
  if (user) redirect("/");
  return (
    <section className=" text-zinc-200 h-[700px] md:min-h-[950px] flex flex-col justify-center ">
      <RegisterForm />
    </section>
  );
}

export default page;
