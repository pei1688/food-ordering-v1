"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerProfile, socialLogin } from "@/action/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/lib/zodSchema";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { EggFried } from "lucide-react";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(formData) {
    try {
      setCreatingUser(true);
      const res = await registerProfile(formData);
      if (res?.error) {
        toast.error(`註冊失敗，錯誤原因: ${res.error.message}`);
      } else {
        toast.success("註冊成功");
        setCreatingUser(false);
      }
    } catch (error) {
      if (error) throw new Error(error);
    }
  }

  return (
    <>
      <h1 className="text-3xl mb-8 flex flex-col items-center justify-center gap-2 font-semibold">
        <EggFried size={40} />
        Welcome
        <p className="text-sm">請輸入您的註冊資訊</p>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6  md:mx-auto min-w-[300px]  sm:min-w-[350px] md:min-w-[500px]"
      >
        <div className="space-y-2">
          <Label className="items-center text-md flex">名字</Label>
          <Input
            type="name"
            placeholder="名字"
            id="name"
            name="name"
            className=" w-full text-zinc-800"
            {...register("name")}
          />
        </div>
        <div className="space-y-2">
          <Label className="items-center text-md flex">電子信箱</Label>
          <Input
            type="email"
            placeholder="電子信箱"
            {...register("email")}
            id="email"
            name="email"
            className=" w-full text-zinc-800"
            disabled={creatingUser}
          />
        </div>
        {errors.email && (
          <div className="text-sm text-red-500 text-start">
            {errors.email.message}
          </div>
        )}
        <div className="relative space-y-2">
          <Label className=" items-center text-md  flex">密碼</Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="密碼"
            {...register("password")}
            id="password"
            name="password"
            className=" w-full text-zinc-800"
            disabled={creatingUser}
          />
          <p
            className="absolute inset-y-9 right-0 px-3 text-sm cursor-pointer text-zinc-800 hover:text-zinc-700 "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "隱藏" : "顯示"}
          </p>
        </div>
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password.message}</div>
        )}
        <Button
          variant="login"
          className="w-full justify-center"
          disabled={creatingUser}
        >
          註冊
        </Button>
        <div className="text-center my-0 ">or</div>
      </form>
      <div className="space-y-6  md:mx-auto min-w-[300px]  sm:min-w-[350px] md:min-w-[500px] mt-4">
        <form action={socialLogin}>
          <Button
            variant="login"
            className="w-full justify-center"
            name="action"
            value="google"
          >
            <Image src={"/google.png"} alt="google" width={20} height={20} />
          </Button>
        </form>
        <div className="flex text-center justify-center text-sm">
          已經有帳戶了嗎?
          <Link href={"/login"} className="text-food-600 hover:underline">
            登入
          </Link>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
