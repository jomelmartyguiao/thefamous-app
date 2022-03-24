export const getNumberArr = (
  page: number,
  lastPage: number,
  position: 'left' | 'center' | 'right'
): Array<number> => {
  if (page === 1 && (lastPage === 1 || lastPage === 0)) {
    return [1];
  }

  if (page === 1) {
    return [1, 2, 3];
  }

  if (page === lastPage) {
    return [lastPage - 2, lastPage - 1, lastPage];
  }

  if (position === 'left') {
    return [page, page + 1, page + 2];
  }

  if (position === 'right') {
    return [page - 2, page - 1, page];
  }

  return [page - 1, page, page + 1];
};

export const getPosition = (
  page: number,
  lastPage: number
): 'left' | 'center' | 'right' => {
  if (page === 1) {
    return 'left';
  }
  if (page === lastPage) {
    return 'right';
  }
  return 'center';
};

export const checkPosOnClickNum = (
  index: number
): 'left' | 'center' | 'right' => {
  switch (index) {
    case 2:
      return 'right';
    case 1:
      return 'center';
    default:
      return 'left';
  }
};

export const getActiveClass = (currentPage: number, page: number): string => {
  if (currentPage === page) return 'page-number active';
  return 'page-number';
  // if (currentPage === page) {
  //   return 'px-2 py-1 focus:outline-none rounded text-xs border border-blue-400 text-white transition ease-in-out duration-300 bg-blue-400 hover:bg-blue-600 hover:border-blue-600';
  // }
  // return 'px-2 py-1 focus:outline-none rounded text-xs border hover:border-gray-600 hover:text-gray-900 transition ease-in-out duration-300';
};
