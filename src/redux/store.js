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

import { authReducer } from './auth';
import { ordersReducer } from './orders';
import { hotelReducer } from './hotel';

// TableServices
import { tableService } from './services';
const { tableServiceReducePath, tableServiceReducer, tableServiceMiddleware } = tableService

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  hotel: hotelReducer,
  [tableServiceReducePath]: tableServiceReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tableServiceMiddleware),
});

export const persistor = persistStore(store);
