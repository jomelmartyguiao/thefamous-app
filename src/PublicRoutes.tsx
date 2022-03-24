import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import CompiledRoutes from 'modules/common/components/CompiledRoutes';
import PageNotFound from 'modules/common/components/PageNotFound';
import routes from 'modules/public-routes';
import Content from 'modules/common/components/Content';
// import type { ProfileProps } from 'modules/common/types';
// import useAppSelector from 'helpers/useAppSelector';
import { getProfile, getNotifications } from 'modules/common/apis';

const PublicRoutes = () => {
  // const profile: ProfileProps = useAppSelector('common.profile');
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token){
      getProfile();
      getNotifications();
    }
  }, [token]);

  return(
    <Switch>
      <Route path="/">
        <Content>
          <CompiledRoutes routes={routes} spinnerHeight="20rem" />
        </Content>
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>  
  );
}

export default PublicRoutes;
