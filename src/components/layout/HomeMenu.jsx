import { getFood } from "@/action/menu";
import MenuList from "../menu/MenuList";
import SectionHeader from "./SectionHeader";
import { Button } from "../ui/button";
import Link from "next/link";
import { Truck } from "lucide-react";

// export async function getStaticProps() {
//     // 預取資料
//     return {
//       props: {
//         food,
//       },
//       revalidate: 600, // 每10分鐘重刷頁面
//     };
// }

async function HomeMenu() {
  const { food } = await getFood();

  return (
    <section className="my-16">
      <SectionHeader subHeader={"優惠訊息"} />
      <div className="flex flex-col justify-center gap-2 items-center text-center text-brown-50 leading-6  pb-4">
        <Truck size={30} />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
          aliquam aspernatur minus odio voluptatum cum.
        </p>
      </div>
      <SectionHeader subHeader={"精選菜單"} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {food.slice(0, 4).map((item, index) => (
          <MenuList item={item} key={index} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button size="none" variant="create" className="px-6 py-2">
          <Link href={"/menu"}>查看全部</Link>
        </Button>
      </div>
    </section>
  );
}

export default HomeMenu;
