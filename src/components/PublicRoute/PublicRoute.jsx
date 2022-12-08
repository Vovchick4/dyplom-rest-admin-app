import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import urls from '../../config/urls';
import { getIsAuthenticated } from '../../redux/features/auth-slice';

export default function PublicRoute({ children, ...routeProps }) {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {isAuthenticated && routeProps.restricted ? (
        <Redirect to={urls.home} />
      ) : (
        children
      )}
    </Route>
  );
}
