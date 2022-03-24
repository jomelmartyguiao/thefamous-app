import _ from 'lodash';

const getMime = (arr: Array<string>): string => {
  try {
    const text = (arr[0] || '').match(/:(.*?);/);
    const mime = _.get(text, '1', '');
    return mime;
  } catch (error) {
    return '';
  }
};

const dataURLToFile = (dataurl: string, filename: string) => {
  let arr = dataurl.split(','),
    mime = getMime(arr),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export default dataURLToFile;
