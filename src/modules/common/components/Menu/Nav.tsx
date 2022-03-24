import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutSide from 'modules/common/components/ClickOutSide';

interface Props {
  children: string;
  to?: string;
  subNavs?: Array<{
    key: string;
    label: string;
    to: string;
  }>;
}

const getLinkClass = (isOpen: boolean): string => {
  const defaultClassName =
    'font-light text-base capitalize focus:outline-none ease-in-out duration-75 transition';
  return `${defaultClassName} ${isOpen ? 'text-blue-400' : ''}`;
};

const getWrapperSubClassName = (isOpen: boolean): string => {
  return `mxh-transition ${!isOpen ? 'overflow-hidden max-h-0' : ''}`;
};

const Nav = memo(({ children, to, subNavs = [] }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickOutside = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <ClickOutSide callback={onClickOutside} className="text-left mb-4">
      {to ? (
        <Link
          to={to}
          className="font-light text-base capitalize focus:outline-none"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={getLinkClass(isOpen)}
        >
          {children}
        </button>
      )}
      <div
        className={getWrapperSubClassName(isOpen)}
        style={{ maxHeight: isOpen ? subNavs.length * 26 : 0 }}
      >
        {subNavs.map((item) => (
          <div key={item.key} className="mb-1">
            <Link
              className="text-sm font-light text-gray-300 lowercase inline-block"
              style={{ height: 22 }}
              to={item.to}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </ClickOutSide>
  );
});

export default Nav;
