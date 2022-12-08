import { Suspense, useEffect } from 'react';
import axios from 'axios';
import { Switch, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import routes from '../../config/routes';
import urls from '../../config/urls';
import { PrivateRoute, PublicRoute, Loader } from '../';
// import { authOperations, authSelectors } from '../../redux/auth';
import { hotelOperations, hotelSelectors } from '../../redux/hotel';
import { echo } from '../../config/echo';
import { orderApi } from '../../redux/services/order.service';
import { authSlice } from '../../redux/features';
import { useGetUserQuery } from '../../redux/services/auth.service';
const { getUserSelector } = authSlice;

export default function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const user = useSelector(getUserSelector);
  const hotel = useSelector(hotelSelectors.getHotel);

  //GetUser
  useGetUserQuery();
  // useEffect(() => {
  //   dispatch(authOperations.getUser());
  // }, [dispatch]);

  useEffect(() => {
    if (!user || user.role !== 'super-admin') {
      return;
    }

    const hotelId = user.restaurant_id;
    dispatch(hotelOperations.getHotelById(hotelId));
  }, [dispatch, i18n.language, user]);

  useEffect(() => {
    if (!hotel) return;

    axios.defaults.headers.restaurant = hotel.id;
  }, [hotel]);

  // Set initial settings state
  useEffect(() => {
    if (!hotel || !user || user.role !== 'super-admin') return;

    const hasSettings = hotel.settings !== null;
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
      if (!Object.keys(hotel.settings).includes(key)) {
        hasAllKeys = false;
        break;
      }
    }

    if (!hasAllKeys) {
      setInitialSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel, dispatch]);

  function setInitialSettings() {
    dispatch(
      hotelOperations.updateHotel(hotel.id, {
        name: hotel.name,
        address: hotel.address,
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
      })
    );
  }

  useEffect(() => {
    const persistedLanguage = localStorage.getItem('language');
    if (!persistedLanguage) return;

    i18n.changeLanguage(persistedLanguage);
  }, [i18n]);

  useEffect(() => {
    if (!user) return;

    const hotelId =
      user.role === 'super-admin' && hotel ? hotel.id : user.restaurant_id;

    echo.channel(`restaurants.${hotelId}`).listen('OrderCreated', (e) => {
      toast('New order arrived');
      dispatch(
        orderApi.endpoints.getOrders.initiate(null, { forceRefetch: true })
      );
    });

    return () => {
      echo.channel(`restaurants.${hotelId}`).stopListening('OrderCreated');
    };
  }, [dispatch, user, hotel]);

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
