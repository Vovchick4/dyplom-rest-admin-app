import { lazy } from 'react';

import urls from './urls';

const routes = [
  {
    path: urls.notFound,
    exact: true,
    component: lazy(() => import('../pages/NotFound')),
    private: false,
    restricted: false,
  },
  {
    path: urls.home,
    exact: true,
    component: lazy(() => import('../pages/Home')),
    private: true,
    restricted: false,
  },
  {
    path: urls.login,
    exact: true,
    component: lazy(() => import('../pages/Login')),
    private: false,
    restricted: true,
  },
  {
    path: urls.signup,
    exact: true,
    component: lazy(() => import('../pages/SignUp')),
    private: false,
    restricted: true,
  },
  {
    path: urls.plates,
    exact: true,
    component: lazy(() => import('../pages/Plates')),
    private: true,
    restricted: false,
  },
  {
    path: urls.menu,
    exact: true,
    component: lazy(() => import('../pages/Menu')),
    private: true,
    restricted: false,
  },
  {
    path: urls.kitchen,
    exact: true,
    component: lazy(() => import('../pages/Kitchen')),
    private: true,
    restricted: false,
  },
  {
    path: urls.cashier,
    exact: true,
    component: lazy(() => import('../pages/Account')),
    private: true,
    restricted: false,
  },
  {
    path: urls.account,
    exact: true,
    component: lazy(() => import('../pages/Account')),
    private: true,
    restricted: false,
  },
  {
    path: urls.waiter,
    exact: true,
    component: lazy(() => import('../pages/Waiter')),
    private: true,
    restricted: false,
  },
  {
    path: urls.edit,
    exact: true,
    component: lazy(() => import('../pages/Edit')),
    private: true,
    restricted: false,
  },
  {
    path: urls.hotelList,
    exact: true,
    component: lazy(() => import('../pages/RestaurantList')),
    private: true,
    restricted: false,
  },
  {
    path: urls.profile,
    exact: true,
    component: lazy(() => import('../pages/Profile')),
    private: true,
    restricted: false,
  },
];

export default routes;
