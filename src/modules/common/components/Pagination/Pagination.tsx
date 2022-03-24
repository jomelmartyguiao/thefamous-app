import { memo, useEffect, useState } from 'react';

import {
  getNumberArr,
  getPosition,
  checkPosOnClickNum,
  getActiveClass,
} from 'modules/common/constants/pagination';

interface Props {
  page: number;
  lastPage: number;
  onChange: (currentPage: number) => void;
}

const Pagination = memo(({ page, lastPage, onChange }: Props) => {
  const [position, setPosition] = useState<'left' | 'center' | 'right'>('left');
  const [hasChangePos, setHasChangePos] = useState(false);

  const numArr = getNumberArr(page, lastPage, position);

  useEffect(() => {
    if (hasChangePos) {
      setPosition(getPosition(page, lastPage));
      setHasChangePos(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onBackChange = () => {
    const newPos = page <= 4 ? 1 : page - 3;
    setPosition('left');
    onChange(newPos);
  };

  const onForwardChange = () => {
    const newPos = lastPage - 4 <= page ? lastPage : page + 3;
    onChange(newPos);
    setPosition('right');
  };

  const onClickNum = (num: number, index: number) => {
    const newPos = checkPosOnClickNum(index);
    setPosition(newPos);
    onChange(num);
  };

  const onPrev = () => {
    if (!(page <= 1)) {
      const newPos = position === 'right' ? 'center' : 'left';
      setPosition(newPos);
      onChange(page - 1);
    }
  };

  const onNext = () => {
    if (!(lastPage <= page)) {
      const newPos = position === 'left' ? 'center' : 'right';
      onChange(page + 1);
      setPosition(newPos);
    }
  };

  return (
    <div className="pagination justify-center">
      <button
        className="prev"
        onClick={onPrev}
        disabled={page <= 1}
        data-testid="move-back-1x"
      >
        prev
      </button>
      {!numArr.includes(1) && (
        <>
          <button
            className="first"
            data-testid="move-to-page-1"
            onClick={() => {
              onChange(1);
              setPosition('left');
            }}
          >
            1
          </button>
          <button
            disabled={page <= 1}
            onClick={onBackChange}
            data-testid="move-back-3x"
            className="move-3x"
          >
            ...
          </button>
        </>
      )}
      {numArr.map((item, i) => (
        <button
          key={item}
          onClick={() => onClickNum(item, i)}
          className={getActiveClass(page, item)}
          data-testid={`move-page-${item}`}
        >
          {item}
        </button>
      ))}
      {!numArr.includes(lastPage) && lastPage > 1 && (
        <>
          <button
            disabled={lastPage <= page}
            onClick={onForwardChange}
            data-testid="move-forward-3x"
            className="move-3x"
          >
            ...
          </button>
          <button
            disabled={lastPage <= page}
            onClick={() => {
              onChange(lastPage);
              setPosition('right');
            }}
            data-testid="move-to-last-page"
            className="last"
          >
            {lastPage}
          </button>
        </>
      )}
      <button
        className="next"
        disabled={lastPage <= page}
        onClick={onNext}
        data-testid="move-forward-1x"
      >
        next
      </button>
    </div>
  );
});

export default Pagination;
