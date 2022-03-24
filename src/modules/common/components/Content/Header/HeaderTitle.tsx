import { ReactNode } from 'react';

interface Props {
  subTitle: string,
  children: ReactNode
}

const HeaderTitle = ({ children, subTitle }: Props) => (
  <div className="flex-no-shrink">
    <div className="font-bold tracking-wider text-2xl text-gray-700">
      {children}
    </div>
    <div
      style={{ lineHeight: 0 }}
      className="font-extralight text-c-blue text-center text-xxs"
    >
      {subTitle}
    </div>
  </div>
);

export default HeaderTitle;
