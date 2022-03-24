import { toast } from 'react-toastify';

declare global {
  interface Window {
    Dropbox: any;
  }
}

const dropboxUpload = (
  url: string,
  filename: string,
  onSuccess: () => void = () => {},
  onError: () => void = () => {}
) => {
  const options = {
    success: () => {
      onSuccess();
      toast.success('Successfully sent to dropbox!');
    },
    onError,
  };

  window.Dropbox.save(url, filename, options);
};

export default dropboxUpload;
