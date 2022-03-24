import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { lazy, useState } from 'react';

import CompiledRoutes from 'modules/common/components/CompiledRoutes';
import type { RouteProps, ProfileProps } from 'modules/common/types';
import useAppSelector from 'helpers/useAppSelector';
import { logout } from 'modules/auth/apis';

import { 
  ActivityIcon,
  IconDashboard,
  NftIcon, 
  BuildingIcon,
  StakingIcon, 
  UserIcon,
  IconLogout,
  IconBell
 } from "modules/common/components/Icons";
import toastMessage from 'helpers/toastMessage';
import NotAllowed from 'modules/common/components/NotAllowed';
const Dashboard = lazy(() => import('modules/account/containers/Dashboard'));
const MyNFTs = lazy(() => import('modules/account/containers/MyNFTs'));
const AddCollection = lazy(() => import('modules/account/containers/AddCollection'));
const Collection = lazy(() => import('modules/account/containers/Collection'));
const AddItem = lazy(() => import('modules/account/containers/AddItem'));
const Sell = lazy(() => import('modules/account/containers/Trade/Sell'));
const MyNFT = lazy(() => import('modules/account/containers/Trade/MyNFT'));
const Passport = lazy(() => import('modules/account/containers/Passport'));
const Account = lazy(() => import('modules/account/containers/Account/'));
const Activity = lazy(() => import('modules/account/containers/Activity'));
const Notifications = lazy(() => import('modules/account/containers/Notifications'));

const getRoutes = (rootUrl: string): Array<RouteProps> => [
  {
    key: 'dashboard',
    exact: true,
    path: `${rootUrl}/dashboard`,
    component: Dashboard,
  },
  {
    key: 'mynfts',
    exact: true,
    path: `${rootUrl}/mynfts`,
    component: MyNFTs,
  },
  {
    key: 'add-collection',
    exact: true,
    path: `${rootUrl}/mynfts/add-collection`,
    component: AddCollection,
  },
  {
    key: 'collections',
    exact: true,
    path: `${rootUrl}/my-collections/:code`,
    component: Collection,
  },
  {
    key: 'add-item',
    exact: true,
    path: `${rootUrl}/my-collections/:code/add-item`,
    component: AddItem,
  },
  {
    key: 'my-nft',
    exact: true,
    path: `${rootUrl}/my-nft/:code`,
    component: MyNFT,
  },
  {
    key: 'list-item',
    exact: true,
    path: `${rootUrl}/list-item/:code`,
    component: Sell,
  },
  {
    key: 'passport',
    exact: true,
    path: `${rootUrl}/nft/passport/:code`,
    component: Passport,
  },
  {
    key: 'account',
    exact: false,
    path: `${rootUrl}/account/`,
    component: Account,
  },
  {
    key: 'activity',
    exact: true,
    path: `${rootUrl}/activity`,
    component: Activity,
  },
  {
    key: 'notifications',
    exact: true,
    path: `${rootUrl}/notifications`,
    component: Notifications,
  },
];

const MyAccount = () => {
  const [hover, setHover] = useState('');

  const history = useHistory();
  const match = useRouteMatch();
  const profile: ProfileProps = useAppSelector('common.profile');

  const logoutAcount = () => {
    logout({}, (res) => {
      toastMessage(res);
      history.push("/explore");
    })
  }
  
  const token = localStorage.getItem("token")
  return (
    <>
      {token ?
      <div className="h-auto min-h-screenFooter relative flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row lg:space-x-7 mb-14 pt-28">
          <div className="w-full lg:w-1/4 h-auto lg:h-lg flex flex-col bg-blue-900 border rounded-md p-5 relative shadow-md">
            <div className="border rounded-md p-2 flex flex-row space-x-5 md:space-x-0 md:flex-col items-center bg-blue-900 mx-auto md:mx-0 px-10 md:px-0">
              <div className="h-10 w-10 md:h-16 md:w-16 rounded-full overflow-hidden">
                {profile?.photo ?
                  <img src={profile?.photo} alt="profile-pic" className="w-full h-full object-cover" />
                : <UserIcon className="w-full h-full text-gray-100" />}
              </div>
              <div>
                <h1 className="text-white text-sm md:text-lg font-semibold text-center">{profile?.username || '-'}</h1>
                <h1 className="text-white text-xxs md:text-xs font-medium text-center">{profile?.email || '---'}</h1>
              </div>
              {/* <div className="border p-2 hover:bg-blue-900 text-sm text-white hover:c-darkgray text-center 
                flex space-x-2 justify-center rounded-md mt-4 w-full transform duration-200 ease-in-out">
                <Qr className="h-5 w-5" />
                <span>Show Qr Code</span>
              </div> */}
            </div>
            <div className="grid grid-cols-2 lg:flex lg:flex-col lg:space-y-2 w-full my-2 lg:my-7">
              <NavLink 
                to="/profile/dashboard"
                className="text-sm font-semibold rounded-md text-center p-2 text-white flex space-x-2 items-center 
                  w-full hover:text-c-darkgray hover:bg-white">
                <IconDashboard />
                <span>Dashboard</span>
              </NavLink>
              <NavLink 
                to="/profile/mynfts" 
                className="text-sm font-semibold rounded-md text-center p-2 text-white flex space-x-2 items-center 
                  w-full hover:text-c-darkgray hover:bg-white">
                <NftIcon />
                <span>NFTs Vault</span>
              </NavLink>
              <NavLink 
                to="/profile/notifications" 
                className="text-sm font-semibold rounded-md text-center p-2 text-white flex space-x-2 items-center 
                  w-full hover:text-c-darkgray hover:bg-white">
                <IconBell />
                <span>Notifications</span>
              </NavLink>
              <NavLink 
                to="/profile/activity" 
                className="text-sm font-semibold rounded-md text-center p-2 text-white flex space-x-2 items-center 
                  w-full hover:text-c-darkgray hover:bg-white">
                <ActivityIcon />
                <span>Activity</span>
              </NavLink>
              <h1 
                onMouseEnter={() => setHover('staking')}
                onMouseLeave={() => setHover('')}
                className="text-sm font-semibold rounded-md text-center p-2 text-white hidden md:flex space-x-2 items-center 
                w-full cursor-not-allowed">
                <StakingIcon />
                <span>{hover === 'staking' ? 'Coming Soon' : 'Staking'}</span>
              </h1>
              <h1 
                onMouseEnter={() => setHover('founder')}
                onMouseLeave={() => setHover('')}
                className="text-sm font-semibold rounded-md text-center p-2 text-white hidden md:flex space-x-2 items-center 
                w-full cursor-not-allowed">
                <BuildingIcon />
                <span>{hover === 'founder' ? 'Coming Soon' : 'Founder Club'}</span>
              </h1>
              <NavLink 
                to="/profile/account/my-account" 
                className="text-sm font-semibold rounded-md text-center p-2 text-white flex space-x-2 items-center 
                  w-full hover:text-c-darkgray hover:bg-white">
                <UserIcon />
                <span>Account</span>
              </NavLink>
            </div>
            <div className="border-t flex flex-row p-2">
              <IconLogout className="text-red-500" />
              <span 
                onClick={logoutAcount}
                className="text-red-500 ml-2 text-xs cursor-pointer font-semibold">
                Logout
              </span>
            </div>
          </div>
          <CompiledRoutes routes={getRoutes(match.url)} spinnerHeight="20rem" />
        </div>
      </div>
      : <NotAllowed />}
    </>    
  )
}

export default MyAccount
