import { ReactNode } from 'react';
import Header from './Header';
import FooterHome from './FooterHome';

interface Props {
  children: ReactNode;
}

const Content = ({ children }: Props) => (
  <div className="flex flex-col h-full w-full">
    <Header />
    {children}
    <FooterHome /> 
  </div>
);

export default Content;
