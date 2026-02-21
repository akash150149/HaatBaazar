import { useMemo } from "react";

export function usePagination(items = [], page = 1, pageSize = 12) {
  return useMemo(() => {
    const start = (page - 1) * pageSize;
    const paginated = items.slice(start, start + pageSize);
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    return { paginated, totalPages };
  }, [items, page, pageSize]);
}
