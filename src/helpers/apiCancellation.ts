import { CancelTokenSource } from 'axios';
import dispatch from 'helpers/dispatch';
import api from 'helpers/api';
import store from 'Store';
import {
  addCancellationKey,
  removeCancellationKey,
} from 'modules/common/reducers';

export const createKey = (key: string): CancelTokenSource => {
  const cancellationKey = api.createCancelToken();
  dispatch(addCancellationKey({ key, cancellation: cancellationKey }));
  return cancellationKey;
};

export const removeKey = (key: string): void => {
  dispatch(removeCancellationKey(key));
};

type CancellationKeys = {
  key: string;
  cancellation: CancelTokenSource;
};

export const cancelRequest = (key: string) => {
  const state = store.getState();
  const cancellationKeys = state.common
    .cancellationKeys as Array<CancellationKeys>;
  const data = cancellationKeys.find((item) => item.key === key);

  if (data) {
    data.cancellation.cancel(`${key} request was cancelled by the user.`);
  }
};
