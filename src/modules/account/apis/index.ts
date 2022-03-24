import api from 'helpers/api';
// import { toast } from 'react-toastify';
// import _ from 'lodash';
import dispatch from 'helpers/dispatch';
import { 
  setCollectionList, 
  setItemList, 
  setBoughtList, 
  setItemData, 
  setTraitList, 
  setBlockchainData, 
  setDashboardData, 
  setActivityList,
  setWalletList,
  setBillingData, } from '../reducers';
import { createKey, removeKey } from 'helpers/apiCancellation';
import toastMessage from 'helpers/toastMessage';

export const verifyEmail = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('account-set');
  const res = await api.put('account/set', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('account-set');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const verifyCode = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('account-verify');
  const res = await api.post('account/verify', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('account-verify');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const createCollection = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('my-collection');
  const res = await api.post('my/collection', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('my-collection');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const getMyCollections = async (callback: () => void = () => {}) => {
  const cancellationKey = createKey('collection');
  const res = await api.get('my/collection', {
    cancelToken: cancellationKey.token,
  });
  removeKey('collection');

  if (res) {
    dispatch(setCollectionList(res));
    callback();
  }
};

export const createItem = async (
  code: string,
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('create-item');
  const res = await api.post(`my/collection/${code}/item`, {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('create-item');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const getItems = async (code: string, callback: () => void = () => {}) => {
  const cancellationKey = createKey('items');
  const res = await api.get(`my/collection/${code}/item`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('items');

  if (res) {
    dispatch(setItemList(res));
    callback();
  }
};

export const getBoughtItems = async (callback: () => void = () => {}) => {
  const cancellationKey = createKey('bought');
  const res = await api.get(`my/item`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('bought');

  if (res) {
    dispatch(setBoughtList(res));
    callback();
  }
};

export const getCollectionItemData = async (
    collectionCode: string, 
    itemCode: string,
    callback: () => void = () => {}) => {
  const cancellationKey = createKey('item-data');
  const res = await api.get(`/my/collection/${collectionCode}/item/${itemCode}`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('item-data');

  if (res) {
    dispatch(setItemData(res));
    callback();
  }
};

export const getBoughtItemData = async (
  itemCode: string,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('bought-data');
  const res = await api.get(`/my/item/${itemCode}`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('bought-data');

  if (res) {
    dispatch(setItemData(res));
    callback();
  }
};

export const getCollectionTraits = async (
  collectionCode: string,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('bought-data');
  const res = await api.get(`/collection/${collectionCode}/trait`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('bought-data');

  if (res) {
    dispatch(setTraitList(res));
    callback();
  }
};

export const getPassport = async (
  code: string,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('passport');
  const res = await api.get(`/passport/public?code=${code}`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('passport');

  if (res) {
    dispatch(setBlockchainData(res));
    callback();
  }
};

export const getDashboardData = async (
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('dashboard');
  const res = await api.get(`/my/dashboard`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('dashboard');

  if (res) {
    dispatch(setDashboardData(res));
    callback();
  }
};

export const getActivityList = async (
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('activity');
  const res = await api.get(`/my/activity`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('activity');

  if (res) {
    dispatch(setActivityList(res));
    callback();
  }
};

export const updateProfile = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('update-profile');
  const res = await api.put('my/profile', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('update-profile');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const updateEmail = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('update-email');
  const res = await api.put('my/account/email', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('update-email');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const updateUsername = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('update-username');
  const res = await api.put('my/account/username', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('update-username');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const updatePassword = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('update-password');
  const res = await api.put('my/account/password', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('update-password');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const connectWallet = async (
  payload: object,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('my-wallet');
  const res = await api.post(`/my/wallet`, {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('my-wallet');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const getWallets = async (
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('my-wallet');
  const res = await api.get(`/my/wallet`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('my-wallet');

  if (res) {
    dispatch(setWalletList(res));
    callback();
  }
};

interface Props {
  data: { secret: string, url: string }
}
export const enableTwoFactor = async (
  payload: object,
  callback: (res: Props) => void = () => {}
) => {
  const cancellationKey = createKey('enable-two-factor');
  const res = await api.put('my/two-factor/enable', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('enable-two-factor');

  if (res) {
    toastMessage(res);
    callback(res);
  }
};

export const verifyTwoFactor = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('verify-two-factor');
  const res = await api.put('my/two-factor/verify', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('verify-two-factor');

  if (res) {
    localStorage.setItem("two-factor", res?.data)
    toastMessage(res);
    callback();
  }
};

export const disableTwoFactor = async (
  payload: object,
  callback: (res: Props) => void = () => {}
) => {
  const cancellationKey = createKey('enable-two-factor');
  const res = await api.put('my/two-factor/disable', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('enable-two-factor');

  if (res) {
    toastMessage(res);
    callback(res);
  }
};

export const getBilling = async (callback: () => void = () => {}) => {
  const cancellationKey = createKey('billing-wallet');
  const res = await api.get('my/billing/wallet', {cancelToken: cancellationKey.token});
  removeKey('billing-wallet');

  if (res) {
    dispatch(setBillingData(res))
    callback();
  }
};

export const sellNFT = async (
  code: string,
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('sell');
  const res = await api.post(`my/item/${code}/sell`, {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('sell');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const claimItem = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('claim');
  const res = await api.post(`my/item/claim`, {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('claim');

  if (res) {
    toastMessage(res);
    callback();
  }
};

interface Props {
  balance: string
  address: string
}

export const getDepositWallet = async (
  network: string,
  callback: (res: Props) => void = () => {}) => {
  const cancellationKey = createKey('deposit-wallet');
  const res = await api.get(`my/wallet/deposit?type=${network}`, {cancelToken: cancellationKey.token});
  removeKey('deposit-wallet');

  if (res) {
    callback(res);
  }
};