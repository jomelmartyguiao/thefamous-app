import _ from 'lodash';

const getToken = () => {
  try {
    const token = localStorage.getItem('token');
    return !_.isNil(token) ? token : false;
  } catch (err) {
    return false;
  }
};

export default getToken;
