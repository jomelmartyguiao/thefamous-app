import api from 'helpers/api';
// import { toast } from 'react-toastify';
// import _ from 'lodash';
import dispatch from 'helpers/dispatch';
import { setTradeList, setTradeData, setTradeDashboard } from '../reducers';
import { createKey, removeKey } from 'helpers/apiCancellation';
import toastMessage from 'helpers/toastMessage';


export const getTradeItems = async (callback: () => void = () => {}) => {
  const cancellationKey = createKey('trade-item');
  const res = await api.get('trade/item', {
    cancelToken: cancellationKey.token,
  });
  removeKey('trade-item');

  if (res) {
    dispatch(setTradeList(res));
    callback();
  }
};

export const getItem = async (
  code: string,
  callback: () => void = () => {}) => {
  const cancellationKey = createKey('trade-details');
  const res = await api.get(`trade/item/${code}`, {
    cancelToken: cancellationKey.token,
  });
  removeKey('trade-details');

  if (res) {
    dispatch(setTradeData(res));
    callback();
  }
};

export const buyTradedItem = async (
  code: string,
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('buy-item');
  const res = await api.post(`/trade/item/${code}/buy`, {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('buy-item');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const getTradeDashboard = async (callback: () => void = () => {}) => {
  const cancellationKey = createKey('trade-dashboard');
  const res = await api.get('trade/dashboard', {
    cancelToken: cancellationKey.token,
  });
  removeKey('trade-dashboard');

  if (res) {
    dispatch(setTradeDashboard(res));
    callback();
  }
};

export const offerItem = async (
  code: string,
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('offer-item');
  const res = await api.post(`/trade/item/${code}/offer`, {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('offer-item');

  if (res) {
    toastMessage(res);
    callback();
  }
};

export const bidItem = async (
  code: string,
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('bid-item');
  const res = await api.post(`/trade/item/${code}/bid`, {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('bid-item');

  if (res) {
    toastMessage(res);
    callback();
  }
};