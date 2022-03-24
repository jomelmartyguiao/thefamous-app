// import { ReactNode, Suspense } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
// lazy, 
// import useAppSelector from 'helpers/useAppSelector';

import PublicRoutes from 'PublicRoutes';
import PageNotFound from 'modules/common/components/PageNotFound';

// interface Props {
//   children: JSX.Element | ReactNode;
// }

// const Wrapper = ({ children }: Props) => (
//   <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
// );

const Routes = () => {
  // const isLogin = useAppSelector('common.isLogin');
  return (
    <Switch>
      <Route path="/" component={PublicRoutes} />
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default withRouter(Routes);
