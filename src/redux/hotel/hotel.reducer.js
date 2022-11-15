import { createReducer } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { hotelActions as actions } from './';

const dataInitialState = null;
const data = createReducer(dataInitialState, {
  [actions.getHotelSuccess]: (_, { payload }) => payload,
  [actions.updateHotelSuccess]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [actions.getHotelRequest]: () => true,
  [actions.getHotelSuccess]: () => false,
  [actions.getHotelError]: () => false,
  [actions.updateHotelRequest]: () => true,
  [actions.updateHotelSuccess]: () => false,
  [actions.updateHotelError]: () => false,
});

const error = createReducer(null, {
  [actions.getHotelRequest]: () => null,
  [actions.getHotelError]: (_, { payload }) => payload,
  [actions.updateHotelRequest]: () => null,
  [actions.updateHotelError]: (_, { payload }) => payload,
});

export default persistCombineReducers(
  { key: 'hotel', storage, whitelist: ['data'] },
  {
    data,
    loading,
    error,
  }
);
