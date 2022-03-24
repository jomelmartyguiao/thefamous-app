import { ReactNode, useState } from 'react';
import html2canvas from 'html2canvas';
import dataURLtoFile from 'helpers/dataURLtoFile';
import uploadcareApi from 'helpers/uploadcareApi';
import { FileInfo } from '@uploadcare/react-widget';

import spinnerGif from 'images/thefamous-loader.gif';

interface Props {
  className?: string;
  children: ReactNode | JSX.Element | string | number;
  disabled?: boolean;
  onSuccess: (file: FileInfo) => void;
}

const uploadBlob = async () => {
  try {
    const root = document.getElementsByTagName('html')[0];
    root.setAttribute('class', 'overflow-hidden');
    const el = document.getElementById('type-signature') as HTMLInputElement;
    const canvas = await html2canvas(el);
    const signatureBase64 = canvas.toDataURL('image/jpeg');
    const fileToUpload = dataURLtoFile(signatureBase64, 'image.jpeg');
    return fileToUpload;
  } catch (error) {
    console.log(error, 'uploadBlob');
  }
};

const onStore = async (file: File) => {
  const cdnInfo = await new Promise((resolve) => {
    uploadcareApi(file, (fileInfo) => {
      resolve(fileInfo);
    });
  });
  return cdnInfo;
};

const UploadCanvas = ({ disabled, className, children, onSuccess }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    const file = (await uploadBlob()) as File;
    const fileInfo = (await onStore(file)) as FileInfo;
    setIsLoading(false);
    onSuccess(fileInfo);
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${className} disabled:bg-gray-400`}
    >
      {isLoading ?
      <>
        <img src={spinnerGif} alt="spinner" width="20px" className="mx-auto" />
      </>
      : <>{children}</>}
    </button>
  );
};

export default UploadCanvas;
