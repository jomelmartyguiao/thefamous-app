import { useLocation } from 'react-router-dom';
import stringToObject from 'helpers/stringToObject';

const useGetUrlParams = () => {
  const location = useLocation();
  return stringToObject(location.search);
};

export default useGetUrlParams;
