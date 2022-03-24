import { lazy } from 'react';
import type { RouteProps } from 'modules/common/types';

const Home = lazy(() => import('modules/explore/containers'));
const ExplorePage = lazy(() => import('modules/collections/containers/Collections'));
const LandingPage = lazy(() => import('modules/landing-page'));
const Brand = lazy(() => import('modules/Brand'));
// const Howtobuy = lazy(() => import('modules/howtobuy'));
const Collections = lazy(() => import('modules/collections/containers'));
const Trade = lazy(() => import('modules/trade/containers'));
const TradeItem = lazy(() => import('modules/trade/containers/TradeItem'));
const CollectionItem = lazy(() => import('modules/collections/containers/CollectionDetails'));
// const CollectionDetails = lazy(() => import('modules/collection-details'));
const Login = lazy(() => import('modules/auth/Login'));
const Signup = lazy(() => import('modules/auth/Signup'));
const ConnectWallet = lazy(() => import('modules/auth/ConnectWallet'));
const VerifyTxn = lazy(() => import('modules/auth/components/VerifyTxn'));
const MyAccount = lazy(() => import('modules/account'));
const About = lazy(() => import('modules/about'));
const Resources = lazy(() => import('modules/resources'));
const Privacy = lazy(() => import('./privacy'));
const Terms = lazy(() => import('./terms'));

const routes: Array<RouteProps> = [
  {
    key: 'landing-page',
    exact: true,
    path: '/',
    component: LandingPage,
  },
  {
    key: 'home',
    exact: true,
    path: '/explore',
    component: Home,
  },
  {
    key: 'explore',
    exact: true,
    path: '/collections',
    component: ExplorePage,
  },
  {
    key: 'login',
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    key: 'signup',
    exact: true,
    path: '/signup',
    component: Signup,
  },
  {
    key: 'connect-wallet',
    exact: true,
    path: '/connect-wallet',
    component: ConnectWallet,
  },
  {
    key: 'verifyTxn',
    exact: true,
    path: '/verify-txn',
    component: VerifyTxn,
  },
  {
    key: 'collection',
    exact: true,
    path: '/collection/:code',
    component: Collections,
  },
  {
    key: 'profile',
    exact: false,
    path: '/profile',
    component: MyAccount,
  },
  {
    key: 'collection-details',
    exact: true,
    path: '/nft',
    component: CollectionItem,
  },
  {
    key: 'about',
    exact: true,
    path: '/about',
    component: About,
  },
  {
    key: 'resources',
    exact: true,
    path: '/resources',
    component: Resources,
  },
  {
    key: 'privacy',
    exact: true,
    path: '/privacy',
    component: Privacy,
  },
  {
    key: 'terms',
    exact: true,
    path: '/terms',
    component: Terms,
  },
  {
    key: 'brand',
    exact: true,
    path: '/brand',
    component: Brand,
  },
  {
    key: 'trade',
    exact: true,
    path: '/trade',
    component: Trade,
  },
  {
    key: 'trade-item',
    exact: true,
    path: '/trade/item/:code',
    component: TradeItem,
  },
];

export default routes;
