import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  ItemProps,
  TradeDashboardProps
} from 'modules/account/types';

interface PublicState {
  tradeList: Array<ItemProps>;
  tradeItemData: ItemProps | {};
  tradeDashboard: TradeDashboardProps | {};
}

const initialState: PublicState = {
  tradeList: [],
  tradeItemData: {},
  tradeDashboard: {}
};

export const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    setTradeList: (state, action: PayloadAction<Array<ItemProps>>) => {
      state.tradeList = action.payload || [];
    },
    setTradeData: (state, action: PayloadAction<ItemProps | {}>) => {
      state.tradeItemData = action.payload || {};
    },
    setTradeDashboard: (state, action: PayloadAction<TradeDashboardProps | {}>) => {
      state.tradeDashboard = action.payload || {};
    },
  },
});

export const {
  setTradeList,
  setTradeData,
  setTradeDashboard,
} = tradeSlice.actions;

export default tradeSlice.reducer;
