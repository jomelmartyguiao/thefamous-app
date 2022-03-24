import api from 'helpers/api';
// import { toast } from 'react-toastify';
// import _ from 'lodash';
// import dispatch from 'helpers/dispatch';
import { createKey, removeKey } from 'helpers/apiCancellation';
import toastMessage from 'helpers/toastMessage';

export const login = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('login');
  const res = await api.post('auth/sign', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('login');

  if (res) {
    localStorage.setItem('token', res?.data?.token);
    localStorage.setItem('wallet_address', res?.data?.user?.wallet);
    callback()
  }
};

export const signup = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('sign-up');
  const res = await api.post('register', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('sign-up');

  if (res) {
    toastMessage(res)
    localStorage.setItem('token', res?.data?.token);
    callback()
  }
};

export const connectWallet = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('connect-wallet');
  const res = await api.put('my/profile/wallet', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('connect-wallet');

  if (res) {
    toastMessage(res)
    // localStorage.setItem('wallet_address', res?.data?.user?.wallet);
    callback()
  }
};

export const connectManyWallet = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('connect-many-wallet');
  const res = await api.post('my/wallet', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('connect-many-wallet');

  if (res) {
    toastMessage(res)
    // localStorage.setItem('wallet_address', res?.data?.user?.wallet);
    callback()
  }
};
interface Props {
  data: { key: string, two_factor_auth: string, token: string, user: { wallet: string } }
}
export const loginEmail = async (
  payload: object,
  callback: (res: Props) => void = () => {}
) => {
  const cancellationKey = createKey('login-email');
  const res = await api.post('auth', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('login-email');

  if (res) {
    localStorage.setItem('two-factor', res?.data?.two_factor_auth);
    callback(res)
  }
};

export const loginMyAlgo = async (
  payload: object,
  callback: (res: any) => void
) => {
  const cancellationKey = createKey('login-algo');
  const res = await api.post('auth/sign/algo', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('login-algo');

  if (res) {
    localStorage.setItem('token', res?.data?.token);
    localStorage.setItem('wallet_address', res?.data?.user?.wallet);
    callback(res)
  }
};

export const logout = async (
  payload: object,
  callback: (res: any) => void = () => {}
) => {
  const cancellationKey = createKey('logout');
  const res = await api.post('auth/logout', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('logout');

  if (res) {
    localStorage.clear();
    callback(res)
  }
}; 

export const getAuthMessage = async (
  callback: (res: any) => void = () => {}
) => {
  const cancellationKey = createKey('auth-message');
  const res = await api.get('auth/message', {
    cancelToken: cancellationKey.token,
  });
  removeKey('auth-message');

  if (res) {
    return(res?.auth_message)
  }
}; 

export const verifyCode = async (
  payload: object,
  callback: () => void = () => {}
) => {
  const cancellationKey = createKey('verify-code');
  const res = await api.post('auth/two-factor', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('verify-code');

  if (res) {
    console.log("WALLET: ", res)
    localStorage.setItem('token', res?.data?.token);
    localStorage.setItem('wallet_address', res?.data?.user?.wallet);
    toastMessage(res)
    callback()
  }
}; 