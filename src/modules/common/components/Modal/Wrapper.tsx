import { ReactNode } from 'react';
import ClickOutSide from 'modules/common/components/ClickOutSide';

const getInnerWrapperClass = (position: 'top' | 'center'): string => {
  const className = 'relative mx-auto mb-auto w-full px-4';
  return `${className} ${position === 'top' ? 'mt-20 mb-auto' : 'my-auto'}`;
};

type Opacities = {
  0: string;
  25: string;
  50: string;
  75: string;
  100: string;
};

const opacities: Opacities = {
  0: 'opacity-0',
  25: 'opacity-25',
  50: 'opacity-50',
  75: 'opacity-75',
  100: 'opacity-100',
};

const getBgClass = (opacity: '0' | '25' | '50' | '75' | '100'): string =>
  `${opacities[opacity]} fixed inset-0 z-40 bg-black`;

interface Props {
  children: ReactNode | JSX.Element | string | number;
  position: 'top' | 'center';
  opacity: '0' | '25' | '50' | '75' | '100';
  onClose: () => void;
  closeOnClickOutSide?: boolean;
}

const Wrapper = ({
  children,
  position = 'center',
  opacity = '50',
  onClose,
  closeOnClickOutSide = false,
}: Props) => {
  const onClickOutSide = () => {
    if (closeOnClickOutSide) {
      onClose();
    }
  };

  return (
    <>
      <div
        data-testid="modal-wrapper"
        className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto m-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <ClickOutSide
          data-testid="modal-wrapper-inner"
          className={getInnerWrapperClass(position)}
          callback={onClickOutSide}
        >
          {children}
        </ClickOutSide>
      </div>
      <div
        onClick={onClose}
        data-testid="modal-bg"
        className={getBgClass(opacity)}
      />
    </>
  );
};

export default Wrapper;
