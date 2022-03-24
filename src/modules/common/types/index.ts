import { FC, ReactNode } from 'react';

import { CancelTokenSource } from 'axios';

type CancellationKeys = {
  key: string;
  cancellation: CancelTokenSource;
};

type ProfileProps = {
  id: string,
  wallet: string,
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  verified: string,
  photo: string,
  signature: string,
  profile_type: string
  founder_club_code: string
  discord_club_member: string
  bio: string
  network: string
  tf_wallets: Array<TFWalletProps>
};

type NotificationProps = {
  id: string,
  type: string,
  message: string,
  data: {
    code : string,
    coin: string
    price: string
  },
  read: number,
  created_at: string
}

type RouteProps = {
  key: string;
  exact: boolean;
  path: string;
  component: FC;
  props?: object;
};

type TFWalletProps = {
  address: string
  created_at: string
  id: string
  network: string
  primary: string
  type: string
  updated_at: string
  user_id: string
  wallet: string
};

type GuestProps = {
  name: string;
  email: string;
};

type PaginationProps = {
  lastPage: number;
  page: number;
  perPage?: number;
  total: number;
};

type MarkProps = {
  key: string | number;
  left: number;
  top: number;
  width?: number | string;
  height?: number | string;
  children?: ReactNode | JSX.Element | string | number;
  disabled?: boolean;
};

type CountProps = {
  draft: number,
  in_progress: number,
  completed: number,
}

export type {
  ProfileProps,
  CancellationKeys,
  RouteProps,
  TFWalletProps,
  GuestProps,
  PaginationProps,
  MarkProps,
  CountProps,
  NotificationProps,
};
