import React, { useRef, useEffect, ReactNode } from 'react';

interface Props {
  callback: () => void;
  children?: ReactNode | JSX.Element | string | number;
  className?: string;
  id?: string
}

const useOutside = (
  ref: React.MutableRefObject<HTMLDivElement>,
  callback: () => void = () => {}
) => {
  const onClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;

    if (ref.current && !ref.current.contains(target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', onClickOutside);
    return () => {
      document.removeEventListener('mouseup', onClickOutside);
    };
  });
};

const ClickOutside = ({ callback, children, className, ...rest }: Props) => {
  const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOutside(wrapperRef, callback);
  return (
    <div ref={wrapperRef} className={className} {...rest}>
      {children}
    </div>
  );
};

export default ClickOutside;
