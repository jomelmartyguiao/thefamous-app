import { useState, useEffect, memo } from 'react';
import Pagination from './Pagination';

interface Props {
  page: number;
  lastPage: number;
  onChange: (currentPage: number) => void;
}

const Wrapper = memo(({ page, lastPage, onChange }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const onChangePage = (newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
    onChange(newCurrentPage);
  };

  return (
    <Pagination
      page={currentPage}
      lastPage={lastPage || 1}
      onChange={onChangePage}
    />
  );
});

export default Wrapper;
