import { TypedUseSelectorHook, useSelector, shallowEqual } from 'react-redux';
import _ from 'lodash';
import type { RootState } from 'Store';

const useSelectorApi = (path: string, defaultValue: any = undefined): any => {
  const data = (useSelector as TypedUseSelectorHook<RootState>)(
    (state) => _.get(state, path, defaultValue),
    shallowEqual
  );

  return data;
};

export default useSelectorApi;
