import _ from 'lodash';

const getFilteredData = (
  payload: object,
  requiredKeys: Array<string> | undefined
): object => {
  if (requiredKeys && requiredKeys.length > 0) {
    return _.pick(payload, requiredKeys);
  }
  return payload;
};

const checkRequiredPayload = (
  payload: object,
  requiredKeys?: Array<string>
): boolean => {
  let disabled: boolean = false;
  const filteredPayload = getFilteredData(payload, requiredKeys);
  const keys = _.keys(filteredPayload);

  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const value = _.get(payload, key, '');

    if (value === '') {
      disabled = true;
      break;
    }
  }

  return disabled;
};

export default checkRequiredPayload;
