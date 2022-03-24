import { FC } from 'react';
// Suspense,
import { Switch, Route } from 'react-router-dom';
import PageNotFound from 'modules/common/components/PageNotFound';
// import Spinner from 'modules/common/components/Spinner';

type ComponentProps = {
  component: FC;
  key: string;
  exact: boolean;
  path: string;
  props?: object;
};
interface Props {
  routes: Array<ComponentProps>;
  spinnerHeight?: number | string;
}

const CompiledRoutes = ({ routes, spinnerHeight = '100vh' }: Props) => (
  <Switch>
    {routes.map((item) => {
      const Component = item.component;
      return (
        <Route key={item.key} exact={item.exact} path={item.path}>
          {/* <Suspense fallback={<Spinner height={spinnerHeight} />}> */}
            <Component {...(item?.props || {})} />
          {/* </Suspense> */}
        </Route>
      );
    })}
    <Route path="*">
      <PageNotFound />
    </Route>
  </Switch>
);

export default CompiledRoutes;
