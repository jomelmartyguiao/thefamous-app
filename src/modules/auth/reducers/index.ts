import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../constants';
import type {
    MessageProps,
} from '../types';

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageProps>) => {
      state.messageInfo = action.payload;
    },
  },
});

export const {
    setMessage,
} = auth.actions;

export default auth.reducer;
