"use client";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
function ImageUpload({ newImage, setNewImage }) {
  return (
    <div className="md:w-1/2 flex  items-center flex-col gap-4  md:mb-4 mb-8">
      <CldUploadWidget
        uploadPreset="food-ordering"
        onSuccess={(result) => setNewImage(result.info.secure_url)}
      >
        {({ open }) => {
          return (
            <>
              <div className="relative  w-full h-[400px]">
                <Image
                  src={newImage || "/default-image.jpg"}
                  alt="food image"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-md border border-food-600"
                />
              </div>
              <Label htmlFor="file"></Label>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
                className=" w-full justify-center"
                variant="create"
              >
                {" "}
                上傳圖片
              </Button>
            </>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default ImageUpload;
