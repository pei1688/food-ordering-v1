// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// function PaginationComponent({ totalPage, currentPage }) {
//   // 分頁邏輯
//   const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
//   const nextPage = currentPage + 1 <= totalPage ? currentPage + 1 : totalPage;
//   const pageNumber = [];
//   const offsetNumber = 3;
//   for (
//     let i = currentPage - offsetNumber;
//     i <= currentPage + offsetNumber;
//     i++
//   ) {
//     if (i >= 1 && i <= totalPage) {
//       pageNumber.push(i);
//     }
//   }
//   return (
//     <div className="">
//       <Pagination className="justify-center">
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious
//               href={`?page=${prevPage}`}
//               className={`px-4 py-1${
//                 currentPage === 1
//                   ? "opacity-60 pointer-events-none cursor-not-allowed"
//                   : ""
//               }`}
//             />
//           </PaginationItem>
//           <PaginationItem>
//             {pageNumber.map((pageNumber, index) => (
//               <PaginationLink
//                 href={`?page=${pageNumber}`}
//                 key={index}
//                 className={`items-center justify-center px-4 py-1 ${
//                   pageNumber === currentPage ? "  bg-zinc-500 mx-2" : ""
//                 }`}
//               >
//                 {pageNumber}
//               </PaginationLink>
//             ))}
//           </PaginationItem>
//           <PaginationItem></PaginationItem>
//           <PaginationItem>
//             <PaginationNext
//               href={`?page=${nextPage}`}
//               className={`px-4 py-1${
//                 currentPage === totalPage
//                   ? "opacity-60 pointer-events-none cursor-not-allowed"
//                   : ""
//               }`}
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   );
// }

// export default PaginationComponent;

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
