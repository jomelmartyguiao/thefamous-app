import api from 'helpers/api';
// import { toast } from 'react-toastify';
// import _ from 'lodash';
import dispatch from 'helpers/dispatch';
import { setCollectionData, setCollectionList, setItemList, setItemData, setFeaturedList } from '../reducers';
import { createKey, removeKey } from 'helpers/apiCancellation';
import toastMessage from 'helpers/toastMessage';

interface ConfirmTxnProps {
  collectionCode: string, 
  itemCode: string,
  txid?: string,
  reference: string,
  network: string,
  callback: (res: any) => void
}

interface BuyProps {
  address: string,
  amount: string,
  reference: string,
}

export const getCollections = async (callback: () => void = () => {}) => {
  const cancellationKey = createKey('collection');
  const res = await api.get('collection', {
    cancelToken: cancellationKey.token,
  });
  removeKey('collection');

  if (res) {
    dispatch(setCollectionList(res));
    callback();
  }
};

export const getCollectionData = async (
  collectionCode: string,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('collection-data');
  const res = await api.get(`/collection/${collectionCode}`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('collection-data');

  if (res) {
    dispatch(setCollectionData(res));
    callback();
  }
};

export const getItems = async (code: string, callback: () => void = () => {}) => {
  const cancellationKey = createKey('items');
  const res = await api.get(`/collection/${code}/item`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('items');

  if (res) {
    dispatch(setItemList(res));
    callback();
  }
};

export const getItemsFilter = async (
  code: string, 
  filter: string,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('items');
  const res = await api.get(`/collection/${code}/item?${filter.replace(/\s/g, '')}`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('items');

  if (res) {
    dispatch(setItemList(res));
    callback();
  }
};

export const getItemData = async (
  collectionCode: string, 
  itemCode: string, 
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('item-data');
  const res = await api.get(`/collection/${collectionCode}/item/${itemCode}`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('item-data');

  if (res) {
    dispatch(setItemData(res));
    callback();
  }
};

export const buyItem = async (
  collectionCode: string, 
  itemCode: string,
  cb1: (res: BuyProps) => void = () => {}) => {
  const cancellationKey = createKey('buy-item');
  const res = await api.post(`/collection/${collectionCode}/item/${itemCode}/buy`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('buy-item');

  if (res) {
    cb1({ amount: res?.data?.amount, reference: res?.data?.reference, address: res?.data?.address });
  }
};

export const buyUsingMyAlgo = async (
  collectionCode: string, 
  itemCode: string,
  network: string,
  callback: (res: any) => void
) => {
  const cancellationKey = createKey('buy-using-myalgo');
  const res = await api.post(`/collection/${collectionCode}/item/${itemCode}/buy`, {
    cancelToken: cancellationKey.token,
    payload: { network }
  });
  removeKey('buy-using-myalgo');

  if (res) {
    callback(res);
  }
};

export const confirmTxn = async ({
  collectionCode, 
  itemCode,
  txid,
  reference,
  network,
  callback
}: ConfirmTxnProps) => {
  const cancellationKey = createKey('confirm-txn');
  const res = await api.post(`/collection/${collectionCode}/item/${itemCode}/buy-confirm`, {
    cancelToken: cancellationKey.token,
    payload: { txid, reference, network }
  });
  removeKey('confirm-txn');

  if (res) {
    toastMessage(res);
    callback(res);
  }
};

export const getFeaturedItems = async (
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('featured-items');
  const res = await api.get(`/item`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('featured-items');

  if (res) {
    dispatch(setFeaturedList(res));
    callback();
  }
};

export const heartItem = async (
  collectionCode: string, 
  itemCode: string,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('heart-item');
  const res = await api.post(`/collection/${collectionCode}/item/${itemCode}/heart`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('heart-item');

  if (res) {
    callback()
  }
};

export const claimItem = async (
  collectionCode: string, 
  itemCode: string,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('claim-item');
  const res = await api.post(`/collection/${collectionCode}/item/${itemCode}/claim`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('claim-item');

  if (res) {
    toastMessage(res)
    callback()
  }
};
