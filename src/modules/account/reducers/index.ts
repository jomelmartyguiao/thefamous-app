import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  CollectionProps,
  ItemProps,
  TraitProps,
  BlockchainProps,
  DashboardProps,
  ActivityProps,
  WalletProps,
  BillingProps,
} from 'modules/account/types';

interface AccountState {
  collectionList: Array<CollectionProps>;
  itemList: Array<ItemProps>;
  boughtList: Array<ItemProps>;
  itemData: ItemProps | {};
  traitList: Array<TraitProps>;
  blockchainData: BlockchainProps | {};
  dashboardData: DashboardProps | {};
  billingData: Array<BillingProps>
  activityList: Array<ActivityProps>;
  walletList: Array<WalletProps>;
}

const initialState: AccountState = {
  collectionList: [],
  itemList: [],
  boughtList: [],
  traitList: [],
  itemData: {},
  blockchainData: {},
  dashboardData: {},
  activityList: [],
  walletList: [],
  billingData: [],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setCollectionList: (state, action: PayloadAction<Array<CollectionProps>>) => {
      state.collectionList = action.payload || [];
    },
    setItemList: (state, action: PayloadAction<Array<ItemProps>>) => {
      state.itemList = action.payload || [];
    },
    setBoughtList: (state, action: PayloadAction<Array<ItemProps>>) => {
      state.boughtList = action.payload || [];
    },
    setItemData: (state, action: PayloadAction<ItemProps | {}>) => {
      state.itemData = action.payload || {};
    },
    setTraitList: (state, action: PayloadAction<Array<TraitProps>>) => {
      state.traitList = action.payload || [];
    },
    setBlockchainData: (state, action: PayloadAction<BlockchainProps | {}>) => {
      state.blockchainData = action.payload || {};
    },
    setDashboardData: (state, action: PayloadAction<DashboardProps | {}>) => {
      state.dashboardData = action.payload || {};
    },
    setBillingData: (state, action: PayloadAction<Array<BillingProps>>) => {
      state.billingData = action.payload || []
    },
    setActivityList: (state, action: PayloadAction<Array<ActivityProps>>) => {
      state.activityList = action.payload || [];
    },
    setWalletList: (state, action: PayloadAction<Array<WalletProps>>) => {
      state.walletList = action.payload || [];
    },
  },
});

export const {
  setCollectionList,
  setItemList,
  setBoughtList,
  setItemData,
  setTraitList,
  setBlockchainData,
  setDashboardData,
  setActivityList,
  setWalletList,
  setBillingData,
} = accountSlice.actions;

export default accountSlice.reducer;
