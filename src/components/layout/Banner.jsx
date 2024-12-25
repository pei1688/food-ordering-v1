import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <section className="flex my-16 ">
      <div className="relative h-[250px] sm:h-[500px] flex w-full">
        <Image
          src={"/foodbanner.jpg"}
          fill
          alt="Food Banner"
          priority //seo優化 ，僅為頁面首屏的主要圖片設置
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-80 rounded-md"
        />
        <div className=" items-end justify-end flex flex-col p-4  absolute sm:top-[150px] sm:right-[20px] top-0 right-0 text-brown-50">
          <h1 className="font-semibold text-lg sm:text-4xl  mb-4">
            最棒的食物都在這裡!
          </h1>
          <p className="my-4 text-sm ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="mt-6">
            <Link href={"/menu"}>
              <Button className=" flex items-center" variant="banner">
                查看菜單
                <ArrowRight size={22} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
