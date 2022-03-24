import loadScript from 'helpers/loadScript';
import { toast } from 'react-toastify';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

let scriptLoadingStarted = false;

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';

const isGoogleReady = () => !!window.gapi;

const isGoogleAuthReady = () => !!window.gapi.auth;

const isGooglePickerReady = () => !!window.google.picker;

const scope = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
];

const googledriveUpload = (
  url: string,
  filename: string,
  onSuccess: (files: any) => void = () => {},
  onError: () => void = () => {}
) => {
  const onApiLoad = () => {
    window.gapi.load('auth');
    window.gapi.load('picker');
  };

  if (isGoogleReady()) {
    return onApiLoad();
  }

  if (!scriptLoadingStarted) {
    scriptLoadingStarted = true;
    loadScript(GOOGLE_SDK_URL, onApiLoad);
  }

  const doAuth = (callback: any) => {
    const args = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope,
      immediate: false,
    };
    window.gapi.auth.authorize(args, callback);
  };

  const createUploader = (accessToken: string) => {
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
              onSuccess(val);
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (isGoogleReady() && isGoogleAuthReady() && isGooglePickerReady()) {
    const token = window.gapi.auth.getToken();
    const oauthToken = token && token.access_token;

    if (oauthToken) {
      return createUploader(oauthToken);
    }

    return doAuth((response: any) => {
      if (response.access_token) {
        return createUploader(response.access_token);
      }
      return console.log(response);
    });
  }
};

export default googledriveUpload;
