"use client";
import Image from "next/image";
import Link from "next/link";

import { EggFried } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/zodSchema";
import { loginProfile, socialLogin } from "@/action/user";
import { toast } from "sonner";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function onSubmit(formData) {
    try {
      await loginProfile(formData);
      toast.success("登入成功");
    } catch (error) {
      console.log(error);
      toast.error("登入失敗");
    }
  }

  return (
    <>
      <h1 className="text-3xl mb-4 flex flex-col items-center justify-center gap-2 font-semibold">
        <EggFried size={40} />
        Welcome,back
        <p className="text-sm">請輸入您的登入資訊</p>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6  md:mx-auto min-w-[300px]  sm:min-w-[350px] md:min-w-[500px]"
      >
        <div className="space-y-2">
          <Label className="  items-center  text-md flex">電子信箱</Label>
          <Input
            type="email"
            placeholder="電子信箱"
            id="email"
            name="email"
            className=" w-full text-zinc-800"
            {...register("email")}
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
            id="password"
            name="password"
            className=" w-full text-zinc-800"
            {...register("password")}
          />
          <p
            className="absolute inset-y-9 right-0 px-3 text-sm cursor-pointer hover:text-gray-500 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "隱藏" : "顯示"}
          </p>
        </div>
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password.message}</div>
        )}
        <Button variant="login" className="w-full justify-center">
          登入
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
        <div className="flex  text-center justify-center text-sm">
          還沒有帳戶嗎?
          <Link href={"/register"} className="text-food-600 hover:underline">
            註冊
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
