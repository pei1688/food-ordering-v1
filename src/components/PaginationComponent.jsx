"use client";

import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationComponent({ totalPage, currentPage }) {
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`?page=${page}`); // 使用 `push` 進行客戶端導航
  };

  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPage);
  const offsetNumber = 3;

  const pageNumber = Array.from(
    { length: offsetNumber * 2 + 1 },
    (_, index) => currentPage - offsetNumber + index
  ).filter((page) => page >= 1 && page <= totalPage);

  return (
    <div >
      <Pagination className="justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(prevPage)}
              className={`px-4 py-1 cursor-pointer${
                currentPage === 1
                  ? "opacity-60 pointer-events-none  text-zinc-500"
                  : ""
              }`}
            />
          </PaginationItem>
          {pageNumber.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                className={`items-center justify-center px-4 py-1 cursor-pointer ${
                  page === currentPage ? "bg-zinc-500 text-white" : ""
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(nextPage)}
              className={`px-4 py-1 cursor-pointer${
                currentPage === totalPage
                  ? "opacity-60 pointer-events-none text-zinc-500"
                  : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
