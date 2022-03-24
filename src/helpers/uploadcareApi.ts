import type { FileInfo } from '@uploadcare/react-widget';

declare global {
  interface Window {
    uploadcare: any;
  }
}

const uploadcareApi = (
  file: File,
  callback: (fileInfo: FileInfo) => void
): void => {
  const upload: any = window.uploadcare.fileFrom('object', file);
  upload.done((fileInfo: FileInfo) => {
    callback(fileInfo);
  });
};

export default uploadcareApi;
