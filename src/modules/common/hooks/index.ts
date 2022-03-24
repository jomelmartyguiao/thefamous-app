import { useEffect } from 'react';
import { CancelTokenSource } from 'axios';
import useAppDispatch from 'helpers/useAppDispatch';
import useAppSelector from 'helpers/useAppSelector';
import { resetAuth } from 'modules/common/reducers';

type CancellationKeys = {
  key: string;
  cancellation: CancelTokenSource;
};

export const useKeyIsLoading = (key: string): boolean => {
  const cancellationKeys = useAppSelector('common.cancellationKeys');
  const filteredKeys = (cancellationKeys as Array<CancellationKeys>).filter(
    (item) => item.key === key
  );
  return filteredKeys.length > 0;
};

export const useCheckIsLoading = (): boolean => {
  const cancellationKeys = useAppSelector(
    'common.cancellationKeys'
  ) as Array<CancellationKeys>;
  return cancellationKeys.length > 0;
};

export const useCheckIsLogin = (): void => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(resetAuth(!!token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
