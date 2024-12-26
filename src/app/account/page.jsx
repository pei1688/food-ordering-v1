import { getUserByEmail } from "@/action/user";
import UserForm from "@/components/layout/UserForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function page() {
  const session = await getSession();
  const userInformation = await getUserByEmail( session?.user?.email);
  if (!session.user) redirect("/login");

  return (
    <section className="flex flex-col  rounded-lg text-zinc-100  bg-food-200 h-full p-4">
      <div className="text-3xl max-w-md  w-full space-y-2">
        <h1 className="text-xl">我的檔案</h1>
        <p className="text-sm">管理你的檔案以保護你的帳戶</p>
      </div>
      <hr className="my-4 border-food-100" />
      <Suspense fallback={<LoadingSpinner />}>
        <UserForm user={userInformation} />
      </Suspense>
    </section>
  );
}

export default page;
