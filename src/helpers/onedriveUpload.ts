import { toast } from 'react-toastify';

const onedriveUpload = (
  url: string,
  filename: string,
  onSuccess: (files: any) => void = () => {},
  onError: () => void = () => {}
) => {
  const odOptions = {
    clientId: process.env.REACT_APP_ONEDRIVE_CLIENT_ID,
    action: 'save',
    sourceInputElementId: '',
    sourceUri: url,
    fileName: filename,
    openInNewWindow: false,
    success: function (files: any) {
      onSuccess(files);
      toast.success('Successfully uploaded!');
    },
    progress: function (percent: any) {
      console.log(percent);
    },
    // cancel: onCancel,
    error: function (error: any) {
      toast.error('Something is wrong. Please try again.');
      onError();
    },
  };

  // eslint-disable-next-line
  window.OneDrive.save(odOptions);
};

export default onedriveUpload;
