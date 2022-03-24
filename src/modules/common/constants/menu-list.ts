// import getToken from 'helpers/getToken';

interface NavProps {
  key: string;
  label: string;
  to?: string;
  href?: string;
  subNavs?: Array<{
    key: string;
    label: string;
    to: string;
  }>;
}

export const getNavList = (): Array<NavProps> => [
  {
    key: 'dashboard',
    label: 'Dashboard',
    to: '/',
  },
  {
    key: 'copyrights',
    label: 'Copyright NFTs',
    subNavs: [
      {
        key: 'create-copyright',
        label: 'Create',
        to: '/copyright/create',
      },
      {
        key: 'drafts',
        label: 'Drafts',
        to: '/copyright/projects/?status=Draft',
      },
      {
        key: 'in progress',
        label: 'In progress',
        to: '/copyright/projects/?status=In%20Progress',
      },
      {
        key: 'completed',
        label: 'Completed',
        to: '/copyright/projects/?status=Completed',
      },
    ],
  },
  {
    key: 'update',
    label: 'Update',
    subNavs: [
      // {
      //   key: 'about',
      //   label: 'About',
      //   to: '/update/about',
      // },
      {
        key: 'evidence',
        label: 'Evidence',
        to: '/update/copyright/evidence',
      },
      {
        key: 'work',
        label: 'Work',
        to: '/update/copyright/work',
      },
      {
        key: 'sub-nft',
        label: 'Sub NFT',
        to: '/update/copyright/sub-nft',
      },
      {
        key: 'transfer',
        label: 'Transfer',
        to: '/update/copyright/transfer',
      },
      {
        key: 'history',
        label: 'History',
        to: '/update/copyright/history',
      },
    ],
  },
  {
    key: 'display',
    label: 'Display',
    to: '/my-nfts',
  },
  {
    key: 'licenses',
    label: 'Licenses',
    to: '/*',
  },
  {
    key: 'marketplace',
    label: 'Marketplace',
    to: '/*',
  },
  {
    key: 'more',
    label: 'More',
    subNavs: [
      {
        key: 'network',
        label: 'FAQ',
        to: '/*',
      },
      {
        key: 'teams',
        label: 'Tour',
        to: '/*',
      },
    ],
  },
  // {
  //   key: 'marketplace',
  //   label: 'MARKETPLACE',
  //   to: '/marketplace',
  // },
];
