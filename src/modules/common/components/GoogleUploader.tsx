import { ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import loadScript from 'helpers/loadScript';

let scriptLoadingStarted = false;

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';

const isGoogleReady = () => !!window.gapi;

const isGoogleAuthReady = () => !!window.gapi.auth;

const isGooglePickerReady = () => !!window.google.picker;

interface Props {
  className: string;
  style?: object;
  disabled?: boolean;
  onAuthFailed?: (res: any) => void;
  scope?: Array<string>;
  authImmediate?: boolean;
  callback: (res: any) => void;
  buttonComponent?: 'button';
  url: string;
  filename: string;
  children: ReactNode;
}

const GoogleUploader = ({
  children,
  className,
  style,
  disabled = false,
  onAuthFailed = () => {},
  scope = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly',
  ],
  authImmediate = true,
  url,
  filename,
  callback,
  buttonComponent: Button = 'button',
}: Props) => {
  const onApiLoad = () => {
    window.gapi.load('auth');
    window.gapi.load('picker');
  };

  const doAuth = (callback: (res: any) => void) => {
    const args = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope,
      immediate: authImmediate,
    };
    window.gapi.auth.authorize(args, callback);
  };

  useEffect(() => {
    if (isGoogleReady()) {
      return onApiLoad();
    }
    if (!scriptLoadingStarted) {
      scriptLoadingStarted = true;
      loadScript(GOOGLE_SDK_URL, onApiLoad);
    }
  }, []);

  const createUploader = (accessToken: any) => {
    try {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const form = new FormData();
          form.append(
            'metadata',
            new Blob([JSON.stringify({ name: filename })], {
              type: 'application/json',
            })
          );
          form.append('file', blob);
          fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            {
              method: 'POST',
              headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
              body: form,
            }
          )
            .then((res) => res.json())
            .then((val) => {
              toast.success('Successfully sent to google drive!');
              callback(val);
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = () => {
    if (
      isGoogleReady() &&
      isGoogleAuthReady() &&
      isGooglePickerReady() &&
      !disabled
    ) {
      const token = window.gapi.auth.getToken();
      const oauthToken = token && token.access_token;

      if (oauthToken) {
        return createUploader(oauthToken);
      }
      
      return doAuth((response: any) => {
        if (response.access_token) {
          return createUploader(response.access_token);
        }
        return onAuthFailed(response);
      });
    }
  };

  return (
    <Button onClick={onClick} className={className} style={style}>
      {children}
    </Button>
  );
};

export default GoogleUploader;
