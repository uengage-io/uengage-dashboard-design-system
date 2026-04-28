import { Pagination } from "@uengage/ui";
export default function PaginationPrev() {
  return (
    <>
      <Pagination
        totalPages={10}
        currentPage={1}
        siblingCount={3}
        onPageChange={() => {
          console.log("changing page");
        }}
        
      />
    </>
  );
}
