import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  CollectionProps,
  ItemProps
} from 'modules/account/types';

interface PublicState {
  collectionList: Array<CollectionProps>;
  collectionData: CollectionProps | {};
  itemList: Array<ItemProps>;
  boughtList: Array<ItemProps>;
  itemData: ItemProps | {};
  featuredList: Array<ItemProps>;
}

const initialState: PublicState = {
  collectionList: [],
  collectionData: {},
  itemList: [],
  boughtList: [],
  itemData: {},
  featuredList: []
};

export const publicSlice = createSlice({
  name: 'noAuth',
  initialState,
  reducers: {
    setCollectionList: (state, action: PayloadAction<Array<CollectionProps>>) => {
      state.collectionList = action.payload || [];
    },
    setCollectionData: (state, action: PayloadAction<CollectionProps | {}>) => {
      state.collectionData = action.payload || {};
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
    setFeaturedList: (state, action: PayloadAction<Array<ItemProps>>) => {
      state.featuredList = action.payload || [];
    },
  },
});

export const {
  setCollectionList,
  setItemList,
  setCollectionData,
  setItemData,
  setFeaturedList,
} = publicSlice.actions;

export default publicSlice.reducer;
