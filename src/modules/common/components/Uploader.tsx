import { MutableRefObject, useRef, useState } from 'react';
import { Widget, WidgetAPI, FileInfo } from '@uploadcare/react-widget';
import useAppDispatch from 'helpers/useAppDispatch';
import { addLoadingKey, removeLoadingKey } from '../reducers';

import spinnerGif from 'images/thefamous-loader.gif';

interface Props {
  className?: string;
  imgClassname?: string;
  children: any;
  tabs?: Array<
    | 'preview'
    | 'file'
    | 'url'
    | 'camera'
    | 'facebook'
    | 'dropbox'
    | 'gdrive'
    | 'gphotos'
    | 'instagram'
    | 'vk'
    | 'evernote'
    | 'box'
    | 'onedrive'
    | 'flickr'
    | 'huddle'
  >;
  onSuccess: (fileInfo: FileInfo) => void;
  checkProgress?: (
    percentage: number,
    status: 'uploading' | 'uploaded' | 'ready'
  ) => void;
  imagesOnly?: boolean;
  crop?: string;
  disabled?: boolean;
  loadingKey?: string;
  inputAcceptTypes?: string;
}

const Uploader = ({
  className,
  imgClassname,
  children,
  tabs = ['file', 'camera'],
  onSuccess,
  checkProgress = () => {},
  imagesOnly = false,
  crop,
  disabled = false,
  loadingKey = 'uploadcare',
  inputAcceptTypes,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const widgetRef = useRef() as MutableRefObject<WidgetAPI>;
  const publicKey: string = process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY || '';

  const dispatch = useAppDispatch();

  const onClick = () => {
    widgetRef.current.openDialog('');
  };

  const onProgress = ({ state, progress }: any) => {
    checkProgress(Math.ceil(progress * 100), state);
  };

  const onDialogClose = (file: any) => {
    if (file) {
      setIsLoading(true);
      dispatch(addLoadingKey(loadingKey));
    }

    file.progress(onProgress).done((fileInfo: FileInfo) => {
      setIsLoading(false);
      onSuccess(fileInfo);
      dispatch(removeLoadingKey(loadingKey));
    });
  };

  return (
    <>
      {disabled || isLoading ? 
        <img src={spinnerGif} alt="spinner" width="20px" className={imgClassname} />
      :
      <div
        // disabled={disabled || isLoading}
        onClick={onClick}
        className={className}>
        {children}
      </div>}
      <Widget
        clearable
        imagesOnly={imagesOnly}
        ref={widgetRef}
        publicKey={publicKey}
        preloader={null}
        crop={crop}
        tabs={tabs.join(' ')}
        onDialogClose={onDialogClose}
        inputAcceptTypes={inputAcceptTypes}
      />
    </>
  );
};

export default Uploader;
