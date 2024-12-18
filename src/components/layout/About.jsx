import Image from "next/image";
import SectionHeader from "./SectionHeader";
function About() {
  return (
    <section className="my-16">
    <div className="max-w-7xl mx-auto mt-8 text-zinc-400 flex flex-col gap-8">
      {/* 第一組內容 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[300px]">
        {/* 圖片 */}
        <div className="relative h-[200px] md:h-full">
          <Image
            src={"/foodImg/banner2.jpg"}
            className="object-cover"
            fill
            alt="Banner 2"
          />
        </div>
  
        {/* 文字 */}
        <div className="flex flex-col justify-center items-center text-center p-4">
          <SectionHeader subHeader={"關於我們"} />
          <p className="text-sm md:text-base lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            pariatur, vitae odit, temporibus incidunt voluptatum libero quod,
            ipsa dolor reprehenderit nulla provident perferendis minima harum!
            Laboriosam saepe expedita asperiores? Reprehenderit!
          </p>
        </div>
      </div>
  
      {/* 第二組內容 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 h-auto md:h-[300px]">
        {/* 文字 */}
        <div className="flex flex-col justify-center items-center text-center p-4">
          <p className="text-sm md:text-base lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            pariatur, vitae odit, temporibus incidunt voluptatum libero quod,
            ipsa dolor reprehenderit nulla provident perferendis minima harum!
            Laboriosam saepe expedita asperiores? Reprehenderit!
          </p>
        </div>
  
        {/* 圖片 */}
        <div className="relative h-[200px] md:h-full">
          <Image
            src={"/banner3.jpg"}
            className="object-cover"
            fill
            alt="Banner 3"
          />
        </div>
      </div>
    </div>
  </section>
  
  );
}

export default About;
