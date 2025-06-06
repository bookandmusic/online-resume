"use client";

import { useMemo, useState } from "react";

export function usePagination<T>(data: T[], pageSize: number = 6) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  return {
    page,
    setPage,
    totalPages,
    currentItems,
  };
}
