const parseData = (args: string): object => {
  const str = `{"${decodeURI(args)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')}"}`;

  return JSON.parse(str);
};

const stringToObject = (data: string): object => {
  try {
    if (data) {
      if (data.indexOf('?') === 0) {
        const newData = data.replace('?', '');
        return parseData(newData);
      }
      return parseData(data);
    }
    return {};
  } catch (err) {
    return {};
  }
};

export default stringToObject;
