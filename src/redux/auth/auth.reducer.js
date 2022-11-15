import { createReducer } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authActions as actions } from './';

const userInitialState = null;
const user = createReducer(userInitialState, {
  [actions.loginSuccess]: (_, { payload }) => payload.data,
  [actions.loginError]: () => userInitialState,

  [actions.signUpSuccess]: (_, { payload }) => payload.data,
  [actions.signUpError]: () => userInitialState,

  [actions.getUserSuccess]: (_, { payload }) => payload.data,
  [actions.getUserError]: () => userInitialState,

  [actions.logoutSuccess]: () => userInitialState,
});

const tokenInitialState = null;
const token = createReducer(tokenInitialState, {
  [actions.loginSuccess]: (_, { payload }) => payload.token,
  [actions.loginError]: () => tokenInitialState,

  [actions.signUpSuccess]: (_, { payload }) => payload.token,
  [actions.signUpError]: () => tokenInitialState,

  [actions.getUserError]: () => tokenInitialState,

  [actions.logoutSuccess]: () => tokenInitialState,
});

const loading = createReducer(false, {
  [actions.loginRequest]: () => true,
  [actions.loginSuccess]: () => false,
  [actions.loginError]: () => false,

  [actions.signUpRequest]: () => true,
  [actions.signUpSuccess]: () => false,
  [actions.signUpError]: () => false,

  [actions.logoutRequest]: () => true,
  [actions.logoutSuccess]: () => false,
  [actions.logoutError]: () => false,

  [actions.getUserRequest]: () => true,
  [actions.getUserSuccess]: () => false,
  [actions.getUserError]: () => false,

  [actions.resetPasswordRequest]: () => true,
  [actions.resetPasswordSuccess]: () => false,
  [actions.resetPasswordError]: () => false,
});

export default persistCombineReducers(
  { key: 'auth', storage, blacklist: ['loading'] },
  { user, token, loading }
);
