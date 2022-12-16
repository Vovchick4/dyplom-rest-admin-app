import { Suspense, useEffect } from 'react';
import { Switch, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useEventTags } from '../../hooks';
import routes from '../../config/routes';
import urls from '../../config/urls';
import { PrivateRoute, PublicRoute, Loader } from '../';
import { echo } from '../../config/echo';
import { getIsAuthenticated } from '../../redux/features/auth-slice';
import { orderApi } from '../../redux/services/order.service';
import { authSlice } from '../../redux/features';
import { useGetUserQuery } from '../../redux/services/auth.service';
import { getLocaleSelector } from '../../redux/features/localization-slice';
import {
  useGetRestaurantByIdQuery,
  useEditRestaurantMutation,
} from '../../redux/services/restaurant.service';
import { getRestSelector } from '../../redux/features/rest-slice';

const { getUserSelector } = authSlice;

export default function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const { dispatchsEvent, dispatchRestIdEvent } = useEventTags();

  const user = useSelector(getUserSelector);
  const isAuth = useSelector(getIsAuthenticated);
  const rest = useSelector(getRestSelector);
  const locale = useSelector(getLocaleSelector);

  //GetUser
  useGetUserQuery(null, { skip: !isAuth });

  //GetRestlById
  const { data: dataRest } = useGetRestaurantByIdQuery(
    rest?.id ? rest.id : user?.restaurant_id,
    {
      skip: !user || user.role !== 'super-admin',
    }
  );

  //UodateMutationAPiRest
  const [updateRestMutation] = useEditRestaurantMutation();

  // Set initial settings state
  useEffect(() => {
    if (!dataRest || !user || user.role !== 'super-admin') return;

    const hasSettings = dataRest.settings !== null;
    if (!hasSettings) {
      setInitialSettings();
      return;
    }

    let hasAllKeys = true;
    const settingsKeys = [
      'review',
      'email',
      'supplier',
      'onSite',
      'clickAndCollect',
      'cashPayment',
      'onlinePayment',
      'paypal',
      'waiter',
      'appleGooglePay',
      'cashier',
      'billRequest',
      'callWaiter',
    ];
    for (const key of settingsKeys) {
      if (!Object.keys(dataRest.settings).includes(key)) {
        hasAllKeys = false;
        break;
      }
    }

    if (!hasAllKeys) {
      setInitialSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRest, dispatch]);

  function setInitialSettings() {
    updateRestMutation({
      restId: dataRest.id,
      params: {
        name: dataRest.name,
        address: dataRest.address,
        settings: {
          review: true,
          email: true,
          supplier: true,
          onSite: true,
          clickAndCollect: true,
          cashPayment: true,
          onlinePayment: true,
          paypal: true,
          waiter: true,
          appleGooglePay: true,
          cashier: true,
          billRequest: true,
          callWaiter: true,
          theme: 'green',
        },
      },
    });
  }

  useEffect(() => {
    if (rest?.id === undefined) return;

    dispatchRestIdEvent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest]);

  // Refetch Apis for Locales
  useEffect(() => {
    const persistedLanguage = locale;
    if (!persistedLanguage) return;

    i18n.changeLanguage(persistedLanguage);

    dispatchsEvent(['Locales']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    if (!user) return;

    const restId =
      user.role === 'super-admin' && dataRest
        ? dataRest.id
        : user.restaurant_id;

    echo.channel(`restaurants.${restId}`).listen('OrderCreated', (e) => {
      toast('New order arrived');
      dispatch(
        orderApi.endpoints.getOrders.initiate(null, { forceRefetch: true })
      );
    });

    return () => {
      echo.channel(`restaurants.${restId}`).stopListening('OrderCreated');
    };
  }, [dispatch, user, dataRest]);

  return (
    <Suspense fallback={<Loader centered />}>
      <Switch>
        {routes.map(({ component: Component, ...route }) =>
          route.private ? (
            <PrivateRoute key={route.path} {...route}>
              <Component />
            </PrivateRoute>
          ) : (
            <PublicRoute key={route.path} {...route}>
              <Component />
            </PublicRoute>
          )
        )}

        <Redirect to={urls.notFound} />
      </Switch>
    </Suspense>
  );
}
