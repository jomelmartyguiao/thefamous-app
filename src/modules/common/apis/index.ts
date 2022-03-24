import api from 'helpers/api';
import dispatch from 'helpers/dispatch';
import { createKey, removeKey } from 'helpers/apiCancellation';
import { setProfile, setNotificationList } from 'modules/common/reducers';
import type { ProfileProps } from 'modules/common/types';
// import toastMessage from 'helpers/toastMessage';

export const getProfile = async (callback: () => void = () => {}) => {
  const cancellationKey = createKey('profile');
  const res = await api.get('my/profile', {
    cancelToken: cancellationKey.token,
  });
  removeKey('profile');

  if (res as ProfileProps) {
    dispatch(setProfile(res));
    callback();
  }
};

export const getNotifications = async (callback: () => void = () => {}) => {
  const cancellationKey = createKey('notifs');
  const res = await api.get('my/notification', {
    cancelToken: cancellationKey.token,
  });
  removeKey('notifs');

  if (res) {
    dispatch(setNotificationList(res));
    callback();
  }
};
