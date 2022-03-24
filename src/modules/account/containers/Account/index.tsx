import { lazy } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import CompiledRoutes from 'modules/common/components/CompiledRoutes';
import type { RouteProps } from 'modules/common/types';

const Account = lazy(() => import('modules/account/containers/Account/Account'));
const Wallet = lazy(() => import('modules/account/containers/Account/Wallet'));
const Billing = lazy(() => import('modules/account/containers/Account/Billing'));
const TwoFactorSecurity = lazy(() => import('modules/account/containers/Account/2FASecurity'));

const getRoutes = (rootUrl: string): Array<RouteProps> => [
  {
    key: 'my-account',
    exact: true,
    path: `${rootUrl}/my-account`,
    component: Account,
  },
  {
    key: 'wallet',
    exact: true,
    path: `${rootUrl}/wallet`,
    component: Wallet,
  },
  {
    key: 'billing',
    exact: true,
    path: `${rootUrl}/billing`,
    component: Billing,
  },
  {
    key: 'two-factor',
    exact: true,
    path: `${rootUrl}/2FA-security`,
    component: TwoFactorSecurity,
  },
];

const AccountPage = () => {
  const match = useRouteMatch();
  return(
    <>
      <div className="w-full lg:w-3/4 border rounded-md px-5 lg:px-10 py-2 shadow-md">
        <nav className="flex flex-row justify-center mb-3">
          <NavLink 
            to="/profile/account/my-account"
            className="py-4 px-6 block hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-medium"
            activeClassName='focus:outline-none text-blue-500 border-b-2 border-blue-500'>
              My Account
          </NavLink>
          <NavLink 
            to="/profile/account/wallet"
            className="py-4 px-6 block hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-medium"
            activeClassName='focus:outline-none text-blue-500 border-b-2 border-blue-500'>
            Wallets
          </NavLink>
          <NavLink 
            to="/profile/account/billing"
            className="py-4 px-6 block hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-medium"
            activeClassName='focus:outline-none text-blue-500 border-b-2 border-blue-500'>
            Billing
          </NavLink>
          <NavLink 
            to="/profile/account/2FA-security"
            className="py-4 px-6 block hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-medium"
            activeClassName='focus:outline-none text-blue-500 border-b-2 border-blue-500'>
            2FA Security
          </NavLink>
        </nav>
        <CompiledRoutes routes={getRoutes(match.url)} spinnerHeight="20rem" />
      </div>
    </>
  )
}
export default AccountPage