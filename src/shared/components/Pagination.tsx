import { Pagination as ShadcnPagination, PaginationContent, PaginationItem, PaginationLink } from '@shadcd/pagination';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '../shadcd/components/ui/button';
import { useIsMobile } from '../shadcd/hooks/use-mobile';

interface Props {
  page?: number;
  total?: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page = 1, total = 10, onChange }: Props) {
  const maxBtns = useIsMobile() ? 5 : 7;

  let startPage = Math.max(1, page - Math.floor((maxBtns - 1) / 2));
  const endPage = Math.min(total, startPage + maxBtns - 1);
  startPage = Math.max(1, endPage - maxBtns + 1);

  const showLeftEllipsis = startPage > 1;
  const showRightEllipsis = endPage < total;

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            className="cursor-pointer h-9 w-9"
            disabled={page <= 1}
            onClick={() => {
              if (page > 1) onChange(page - 1);
            }}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            className="cursor-pointer h-9 w-9"
            disabled={!showLeftEllipsis}
            onClick={() => onChange(1)}
          >
            <ChevronsLeft />
          </Button>
        </PaginationItem>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink className="cursor-pointer" onClick={() => onChange(p)} isActive={p === page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            variant="ghost"
            className="cursor-pointer h-9 w-9"
            disabled={!showRightEllipsis}
            onClick={() => onChange(total)}
          >
            <ChevronsRight />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            disabled={page >= total}
            className="cursor-pointer h-9 w-9"
            onClick={() => {
              if (page < total) onChange(page + 1);
            }}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
