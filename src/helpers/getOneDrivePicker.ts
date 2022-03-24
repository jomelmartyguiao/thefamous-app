import _ from 'lodash';
import { toast } from 'react-toastify';

declare global {
  interface Window {
    OneDrive: any;
  }
}

const getOneDrivePicker = (
  onSuccess: (object: any) => void,
  moreOptions: any = {}
) => {
  const options = {
    clientId: process.env.REACT_APP_ONEDRIVE_CLIENT_ID,
    action: 'download',
    multiSelect: false,
    success: function (files: any) {
      const odData = files?.value[0] || {};
      if (!_.isEmpty(odData)) {
        onSuccess(odData);
      }
    },
    error: function (error: any) {
      const onError = moreOptions?.onError || (() => {});
      onError(error);
      toast.error(error.message || '');
    },
    ...moreOptions,
  };

  window.OneDrive.open(options);
};

export default getOneDrivePicker;
