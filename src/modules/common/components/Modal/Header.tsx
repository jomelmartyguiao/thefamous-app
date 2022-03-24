import { ReactNode } from 'react';

interface Props {
  title: ReactNode | JSX.Element | string;
  onClose: () => void;
}

const Header = ({ title, onClose }: Props) => (
  <div className="flex items-center justify-between p-4 border-b border-solid border-gray-100 rounded-t-lg bg-blue-900">
    <h3 className="text-sm flex-1 font-meduim text-white tracking-wider">{title}</h3>
    <button
      data-testid="modal-header-close"
      type="button"
      className="rounded-full bg-white ml-auto bg-transparent border-0 text-blue-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
      onClick={onClose}
    >
      <span className="bg-transparent h-5 w-5 text-xl block outline-none focus:outline-none">
        ×
      </span>
    </button>
  </div>
);

export default Header;
