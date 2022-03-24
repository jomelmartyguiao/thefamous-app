import { ReactNode } from 'react';

import {
  IconCoins,
  IconSetting,
  IconLogout,
} from 'modules/common/components/Icons';

interface Props {
  keys: string;
  children: ReactNode;
}

interface UserProps {
  to: string,
  keys: string,
  title: string,
  children: ReactNode,
  // onClick?: any
}

export const creditLinks: Array<Props> =  [
  {
    keys: 'credit-icon',
    children: (
      <span className="text-yellow-300">
        <IconCoins width="18" height="18" />
      </span>
    ),
  },
];

export const userLinks: Array<UserProps> =  [
  // {
  //   to: '/',
  //   keys: 'bell',
  //   title: 'Notifications',
  //   children: <IconWallet width="18" height="18" />,
  // },
  {
    to: '/settings/profile',
    keys: 'settings',
    title: 'Settings',
    children: <IconSetting width="18" height="18" />,
  },
  {
    to: '/',
    keys: 'logout',
    title: 'Logout',
    children: <IconLogout width="18" height="18" />,
    // onClick: () => {
    //   localStorage.clear();
    //   dispatch(resetAuth(false));
    //   history.push('/');
    // }
  },
];
