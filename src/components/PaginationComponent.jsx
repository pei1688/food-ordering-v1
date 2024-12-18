import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationComponent({ totalPage, currentPage }) {
  // 分頁邏輯
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
  const nextPage = currentPage + 1 <= totalPage ? currentPage + 1 : totalPage;
  const pageNumber = [];
  const offsetNumber = 3;
  for (
    let i = currentPage - offsetNumber;
    i <= currentPage + offsetNumber;
    i++
  ) {
    if (i >= 1 && i <= totalPage) {
      pageNumber.push(i);
    }
  }
  return (
    <div className="">
      <Pagination className="justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${prevPage}`}
              className={`${
                currentPage === 1
                  ? "opacity-60 pointer-events-none cursor-not-allowed"
                  : ""
              }`}
            />
          </PaginationItem>
          <PaginationItem>
            {pageNumber.map((pageNumber, index) => (
              <PaginationLink
                href={`?page=${pageNumber}`}
                key={index}
                className="items-center  justify-center"
              >
                {pageNumber}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`?page=${nextPage}`}
              className={`${
                currentPage === totalPage
                  ? "opacity-60 pointer-events-none cursor-not-allowed"
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
