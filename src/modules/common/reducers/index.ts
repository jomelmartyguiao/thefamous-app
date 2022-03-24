import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  ProfileProps,
  CancellationKeys,
  GuestProps,
  CountProps,
  NotificationProps,
} from 'modules/common/types';

interface CommonState {
  isLogin: boolean;
  loadingKeys: Array<string>;
  cancellationKeys: Array<CancellationKeys>;
  profile: ProfileProps | {};
  guestList: Array<GuestProps>;
  count: CountProps | {};
  notificationList: Array<NotificationProps>;
}

const initialState: CommonState = {
  isLogin: false,
  loadingKeys: [],
  cancellationKeys: [],
  profile: {},
  guestList: [],
  count: {},
  notificationList: []
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    resetAuth: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    addCancellationKey: (state, action: PayloadAction<CancellationKeys>) => {
      state.cancellationKeys = [...state.cancellationKeys, action.payload];
    },
    removeCancellationKey: (state, action: PayloadAction<string>) => {
      state.cancellationKeys = state.cancellationKeys.filter(
        (item) => item.key !== action.payload
      );
    },
    setProfile: (state, action: PayloadAction<ProfileProps | {}>) => {
      state.profile = action.payload || {};
    },
    setGuestList: (state, action: PayloadAction<Array<GuestProps>>) => {
      state.guestList = action.payload;
    },
    setCount: (state, action: PayloadAction<CountProps | {}>) => {
      state.count = action.payload || {};
    },
    setNotificationList: (state, action: PayloadAction<Array<NotificationProps>>) => {
      state.notificationList = action.payload || [];
    },
    addLoadingKey: (state, action: PayloadAction<string>) => {
      state.loadingKeys = [
        ...state.loadingKeys,
        action.payload,
      ];
    },
    removeLoadingKey: (state, action: PayloadAction<string>) => {
      state.loadingKeys = state.loadingKeys.filter(item => item !== action.payload);
    }
  },
});

export const {
  resetAuth,
  addCancellationKey,
  removeCancellationKey,
  setProfile,
  setGuestList,
  addLoadingKey,
  removeLoadingKey,
  setCount,
  setNotificationList,
} = commonSlice.actions;

export default commonSlice.reducer;
