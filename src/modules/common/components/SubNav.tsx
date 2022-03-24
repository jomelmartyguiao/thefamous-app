import { NavLink } from 'react-router-dom';

interface Props {
  navs: Array<{
    exact?: boolean;
    to: string;
    label: string;
  }>;
}

const SubNav = ({ navs }: Props) => (
  <div className="flex rounded-full bg-gray-100 overflow-hidden h-11 justify-around px-1 items-center">
    {navs.map((item) => (
      <NavLink
        key={item.label}
        exact={item.exact}
        to={item.to}
        className="bg-transparent px-3 py-2 text-xs transition duration-300 ease-in-out"
        activeClassName="bg-blue-400 text-white rounded-3xl"
      >
        {item.label}
      </NavLink>
    ))}
  </div>
);

export default SubNav;
