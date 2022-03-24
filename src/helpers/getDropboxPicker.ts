import _ from 'lodash';

declare global {
  interface Window {
    Dropbox: any;
  }
}

const getDropboxPicker = (
  onSuccess: (object: any) => void,
  moreOptions: any = {}
) => {
  const options = {
    linkType: 'direct',
    extensions: ['.pdf'],
    success: (res: any) => {
      const dpData = res[0] || {};
      if (!_.isEmpty(dpData)) {
        onSuccess(dpData);
      }
    },
    ...moreOptions,
  };

  // eslint-disable-next-line no-undef
  window.Dropbox.choose(options);
};

export default getDropboxPicker;
