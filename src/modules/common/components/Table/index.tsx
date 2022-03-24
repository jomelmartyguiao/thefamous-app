import { ReactNode } from 'react';

interface Props {
  columns: Array<{
    label: string | ReactNode | JSX.Element;
    flex1?: boolean;
    width?: string;
  }>;
  headerClassName?: string;
}

const Table = ({ columns }: Props) => {
  return (
    <div className="rounded-lg bg-gray-100">
      <div className="flex mb-2 px-2"></div>
    </div>
  );
};

export default Table;
