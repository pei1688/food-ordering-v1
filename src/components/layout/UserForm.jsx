"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { updateProfile } from "@/action/user";
import { Contact, User } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "../ImageUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSchema } from "@/lib/zodSchema";

function UserForm({ user }) {
  const { image, name, email, city, phone, postalCode, streetAddress } = user;

  const [newImage, setNewImage] = useState(image || "");

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      phone,
      city,
      postalCode,
      streetAddress,
    },
  });

  async function onSubmit(data) {
    try {
      const result = await updateProfile(data, newImage || "");
      if (result.success) {
        toast.success("更新成功");
      } else {
        toast.error("更新失敗");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      // action={(formData) => updateProfile(formData, newImage || "")}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8  w-full mx-auto text-zinc-800"
    >
      <div className="md:flex-row flex flex-col md:space-x-4">
        <ImageUpload newImage={newImage} setNewImage={setNewImage} />
        <hr className="border-food-100" />

        {/* Profile Information Section - 50% width */}
        <div className="md:w-1/2 space-y-4 md:mt-0 mt-4 ">
          <h2 className="text-zinc-100 flex items-center gap-1 text-lg">
            <User size={20} />
            基本資料
          </h2>
          <div className="space-y-4">
            <Label className="text-zinc-100">姓名</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              className="w-full"
            />
          </div>
          <div className="space-y-4">
            <Label className="text-zinc-100">電子信箱</Label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={email}
              className="w-full"
              disabled
            />
          </div>

          <hr className="border-food-100" />
          <h2 className="text-zinc-100 flex items-center gap-1 text-lg">
            <Contact size={20} />
            聯絡資訊
          </h2>
          <div className="space-y-4">
            <Label className="text-zinc-100">電話</Label>
            <Input
              {...register("phone")}
              type="phone"
              id="phone"
              name="phone"
              placeholder="ex.09123456"
              defaultValue={phone || ""}
              className="w-full"
            />
            {error?.phone && (
              <p className="text-red-500">{error.phone.message}</p>
            )}
          </div>

          <div className=" flex items-center gap-4">
            <div className="space-y-4 flex-1">
              <Label className="text-zinc-100 ">城市</Label>
              <Input
                {...register("city")}
                type="text"
                id="city"
                name="city"
                placeholder="ex.台灣"
                defaultValue={city || ""}
                className="w-full"
              />
              {error?.city && (
                <p className="text-red-500">{error.city.message}</p>
              )}
            </div>

            <div className="space-y-4 flex-1">
              <Label className="text-zinc-100 ">地址</Label>
              <Input
                {...register("streetAddress")}
                type="text"
                id="streetAddress"
                name="streetAddress"
                placeholder="ex.地址"
                defaultValue={streetAddress || ""}
                className="w-full"
              />
              {error?.streetAddress && (
                <p className="text-red-500">{error.streetAddress.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-zinc-100">郵遞區號</Label>
            <Input
              {...register("postalCode")}
              type="number"
              id="postalCode"
              name="postalCode"
              placeholder="ex.321"
              defaultValue={postalCode || ""}
              className="w-full"
            />
            {error?.postalCode && (
              <p className="text-red-500">{error.postalCode.message}</p>
            )}
          </div>

          <div className="justify-end flex">
            <Button variant="login" className="w-full justify-center">
              儲存
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UserForm;

//aws s3
// async function handleFileChange(ev) {
//   const files = ev.target.files;
//   if (files?.length > 0) {
//     const data = new FormData();
//     data.append("file", files[0]);
//     try {
//       const response = await fetch("/api/uploadProfile", {
//         method: "POST",
//         body: data,
//       });
//       if (response.ok) {
//         const link = await response.json();
//         setImage(link);
//         toast.success("圖片上傳成功！");
//       } else {
//         console.error("Image upload failed:", await response.text());
//       }
//     } catch (error) {
//       toast.error("上傳錯誤");
//     }
//   }
// }
