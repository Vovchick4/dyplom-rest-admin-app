import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../redux/auth';
import urls from '../../config/urls';

export default function PublicRoute({ children, ...routeProps }) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

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
