import { useEffect } from 'react';
import { cancelRequest } from 'helpers/apiCancellation';

const useCancelRequest = (key: string): void => {
  useEffect(() => {
    return () => {
      cancelRequest(key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCancelRequest;
