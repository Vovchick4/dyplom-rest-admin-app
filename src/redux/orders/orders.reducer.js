import { createReducer, combineReducers } from '@reduxjs/toolkit';

import { ordersActions as actions } from './';

export const orders = createReducer([], {
  [actions.fetchAllSuccess]: (_, { payload }) => payload,
  [actions.add]: (state, { payload }) => [payload, ...state],
  [actions.removeSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [actions.editSuccess]: (state, { payload }) =>
    state.map((order) => (order.id === payload.id ? payload : order)),
});

export const loading = createReducer(false, {
  [actions.fetchAllRequest]: () => true,
  [actions.fetchAllSuccess]: () => false,
  [actions.fetchAllError]: () => false,

  [actions.editRequest]: () => true,
  [actions.editSuccess]: () => false,
  [actions.editError]: () => false,

  [actions.removeRequest]: () => true,
  [actions.removeSuccess]: () => false,
  [actions.removeError]: () => false,
});

export default combineReducers({ orders, loading });
