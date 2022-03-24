import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconCircleClose, IconSubMenu } from './Icons';
import Modal from './Modal';

type Nav = {
  label: string;
  to: string;
  key: string;
};
interface Props {
  children: string;
  hasNav?: boolean;
  navs?: Array<Nav>;
  modalTitle?: string;
}

const Title = ({
  children,
  hasNav = false,
  navs = [],
  modalTitle = '',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mb-4 border border-gray-200 shadow rounded-lg px-4 py-3 flex">
        <h4 className="flex-1 uppercase font-semibold text-gray-700">
          {children}
        </h4>
        {hasNav && (
          <button onClick={() => setIsOpen(true)} className="px-1">
            <IconSubMenu />
          </button>
        )}
      </div>
      {hasNav && (
        <Modal
          isOpen={isOpen}
          hideHeader
          // title={<div className="text-center">{modalTitle}</div>}
          onClose={() => setIsOpen(false)}
        >
          <div className="relative mb-4">
            <div className="font-semibold px-6 text-sm uppercase">
              {modalTitle}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-400 absolute right-0 -top-2 disabled:text-red-200"
            >
              <IconCircleClose width="12" height="12" />
            </button>
          </div>
          <div className="px-4">
            {navs.map((item: Nav) => (
              <Link
                key={item.key}
                to={item.to}
                className="text-gray-400 block px-2 py-1"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Title;
