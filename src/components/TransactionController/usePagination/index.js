import { useEffect, useState } from 'react';

const usePagination = (items, itemsPerPage = 4) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const setPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { totalPages, currentPage, setPage };
};

export default usePagination;
