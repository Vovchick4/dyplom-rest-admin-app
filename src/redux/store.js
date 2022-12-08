import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { ordersReducer } from './orders';
import { hotelReducer } from './hotel';

import { authSlice, localeSlice, restSlice } from "./features";
import { tableService, orderService, restaurantService, plateService, authService } from './services';
// SlicesReducers
const { authReducer } = authSlice;
const { localeReducer } = localeSlice;
const { restReducer } = restSlice;
// TableServices
const { tableServiceReducePath, tableServiceReducer, tableServiceMiddleware } = tableService
const { orderServiceReducePath, orderServiceReducer, orderServiceMiddleware } = orderService
const { restaurantServiceReducePath, restaurantServiceReducer, restaurantServiceMiddleware } = restaurantService
const { plateServiceReducePath, plateServiceReducer, plateServiceMiddleware } = plateService
const { authServiceReducePath, authServiceReducer, authServiceMiddleware } = authService

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  hotel: hotelReducer,
  locale: localeReducer,
  rest: restReducer,
  [authServiceReducePath]: authServiceReducer,
  [orderServiceReducePath]: orderServiceReducer,
  [plateServiceReducePath]: plateServiceReducer,
  [tableServiceReducePath]: tableServiceReducer,
  [restaurantServiceReducePath]: restaurantServiceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authServiceMiddleware, tableServiceMiddleware, orderServiceMiddleware, restaurantServiceMiddleware, plateServiceMiddleware),
});

export const persistor = persistStore(store);
