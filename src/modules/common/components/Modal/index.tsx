import { ReactNode } from 'react';
import Wrapper from './Wrapper';
import Header from './Header';

interface Props {
  children: ReactNode | JSX.Element | string;
  footer?: ReactNode | JSX.Element | string;
  hideHeader?: boolean;
  title?: ReactNode | JSX.Element | string;
  onClose?: () => void;
  isOpen: boolean;
  bgOpacity?: '0' | '25' | '50' | '75' | '100';
  position?: 'top' | 'center';
  closeOnClickOutSide?: boolean;
  transparent?: boolean;
}

const getString = (transparent: boolean): string => {
  const className =
    'border-0 rounded-lg shadow-lg relative flex flex-col w-full md:w-1/4 md:min-w-1/4 mx-auto outline-none focus:outline-none';

  return `${className} ${transparent ? 'bg-transparent' : 'bg-white'}`;
};

const Modal = ({
  children,
  footer,
  hideHeader = false,
  title = '',
  onClose = () => {},
  isOpen,
  bgOpacity = '50',
  position = 'center',
  closeOnClickOutSide = false,
  transparent = false,
}: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Wrapper
      onClose={onClose}
      closeOnClickOutSide={closeOnClickOutSide}
      position={position}
      opacity={bgOpacity}
    >
      <div className={getString(transparent)}>
        {!hideHeader && <Header title={title} onClose={onClose} />}
        <div className="relative p-4 flex-auto text-sm">{children}</div>
        {footer && (
          <div className="flex items-center justify-end p-4 border-t border-solid border-gray-100 rounded-b">
            {footer}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Modal;
