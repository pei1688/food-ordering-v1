"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

function Filter({ categories, currentFilter, currentSort }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  //分類
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    if (params.has("page")) {
      params.set("page", "1");
    }
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  //高到低
  function handleSort(sort) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  //搜尋
  function handleSearch(res) {
    const params = new URLSearchParams(searchParams);
    if (res) {
      params.set("query", res);
    } else {
      params.delete("query");
    }
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between text-brown-50 space-y-4 sm:space-y-0 ">
      {/* 分類按鈕 */}
      <div className=" lg:flex hidden max-w-[450px] pb-4 gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            value={category}
            variant="none"
            onClick={(e) => handleFilter(e.target.value)}
            className={`${
              currentFilter === category
                ? " border-b-2 border-zinc-400"
                : "bg-transparent  border-b-2 border-transparent"
            } p-2 hover:border-zinc-400 transition-all duration-200`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className=" lg:hidden flex pb-4 ">
        <select
          className="p-2 rounded-md shadow-sm bg-transparent focus:outline-none cursor-pointer accent-auto w-full"
          value={currentFilter}
          onChange={(e) => handleFilter(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category} className="text-zinc-800">
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* 搜索欄和排序 */}
      <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-4 sm:my-0 my-4 w-full sm:w-auto pb-4">
        {/* 搜索欄 */}
        <div className="relative flex w-full sm:w-[300px]">
          <Input
            className="bg-brown-50 rounded-full w-full text-brown-400  pl-8 shadow-xl py-1"
            placeholder="搜索"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500">
            <Search size={15} />
          </div>
        </div>

        {/* 排序下拉選單 */}
        <select
          className="p-2 rounded-md shadow-sm bg-transparent focus:outline-none cursor-pointer accent-auto"
          value={currentSort}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="default" className="text-zinc-800">
            一般排序
          </option>
          <option value="asc" className="text-zinc-800">
            價格低到高
          </option>
          <option value="desc" className="text-zinc-800">
            價格高到低
          </option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
