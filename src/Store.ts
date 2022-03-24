import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import common from 'modules/common/reducers';
import account from 'modules/account/reducers';
import noAuth from 'modules/explore/reducers';
import trade from 'modules/trade/reducers';
// import docPaperless from 'modules/doc-paperless/reducers';
// import docCopyright from 'modules/doc-copyrights/reducers';

const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    // serializableCheck: {
    //   // ignoredActions: ['common/addCancellationKey'],
    // },
  }),
  reducer: {
    common,
    account,
    noAuth,
    trade
    // docPaperless,
    // docCopyright,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
