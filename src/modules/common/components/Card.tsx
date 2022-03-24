import { ReactNode } from 'react';

interface Props {
  children: ReactNode | JSX.Element | string;
}

const Card = ({ children }: Props) => (
  <div className="mb-4 border border-gray-200 shadow rounded-lg px-4 py-3">
    {children}
  </div>
);

export default Card;
