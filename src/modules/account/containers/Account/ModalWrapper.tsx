import { IconCircleClose } from 'modules/common/components/Icons';
import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | ReactNode;
  title: string;
  disabled?: boolean;
}

const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  title,
  disabled = false,
}: Props) => (
  <>
    {isOpen &&
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-10">
      <div className="bg-white rounded-lg w-full md:w-1/3 border border-gray-100 shadow-2xl p-5">
        <div className="p-2">
          <div className="relative mb-2">
            <div className="font-medium text-sm">{title}</div>
            <button
              onClick={onClose}
              disabled={disabled}
              className="text-red-500 absolute right-0 -top-2 disabled:text-red-200"
            >
              <IconCircleClose width="12" height="12" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>}
  </>
);

export default ModalWrapper;
