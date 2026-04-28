export interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}
