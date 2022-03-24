import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import stringToObject from 'helpers/stringToObject';

const useGetSearchLocation = (): any => {
  const location = useLocation();
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const searchParams: any = stringToObject(location.search);
    setState(searchParams);
  }, [location.search]);

  return state;
};

export default useGetSearchLocation;
