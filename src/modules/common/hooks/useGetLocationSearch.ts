import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import stringToObject from 'helpers/stringToObject';

const useGetLocationSearch = (callback: (obj: object) => void) => {
  const location = useLocation();
  useEffect(() => {
    const searchParams = stringToObject(location.search);
    callback(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useGetLocationSearch;
