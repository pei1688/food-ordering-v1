import Link from "next/link";
import Banner from "../components/layout/Banner";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeader";
import About from "@/components/layout/About";

export default function Home() {
  return (
    <>
      <Banner />
      <HomeMenu />
      <About />
      <section className="my-16">
        <div className="max-w-2xl text-center mx-auto  text-zinc-400 flex flex-col gap-4 ">
          <SectionHeader subHeader={"Contact us"} />
          <Link href={"#"} className="text-3xl font-semibold mb-6">
            +89 756 112 445
          </Link>
        </div>
      </section>
    </>
  );
}
