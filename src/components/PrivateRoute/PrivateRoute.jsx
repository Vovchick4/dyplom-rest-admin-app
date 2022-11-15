import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../redux/auth';
import urls from '../../config/urls';

export default function PrivateRoute({ children, ...routeProps }) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  return (
    <Route {...routeProps}>
      {isAuthenticated ? children : <Redirect to={urls.login} />}
    </Route>
  );
}
