import api from "helpers/api";
import { createKey, removeKey } from "helpers/apiCancellation";
import toastMessage from "helpers/toastMessage";


export const emailSubscribe = async (
  payload: object,
  callback: () => void = () => {}
) => { 
  console.log(payload)
  const cancellationKey = createKey('email-subscribe');
  const res = await api.post('lead', {
    payload,
    cancelToken: cancellationKey.token,
  });
  removeKey('email-subscribe');

  if (res) {
    toastMessage(res);
    callback();
  }
};