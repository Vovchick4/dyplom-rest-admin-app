import { createAction } from '@reduxjs/toolkit';

export const signUpRequest = createAction('auth/signUp/request');
export const signUpSuccess = createAction('auth/signUp/success');
export const signUpError = createAction('auth/signUp/error');

export const loginRequest = createAction('auth/login/request');
export const loginSuccess = createAction('auth/login/success');
export const loginError = createAction('auth/login/error');

export const logoutRequest = createAction('auth/logout/request');
export const logoutSuccess = createAction('auth/logout/success');
export const logoutError = createAction('auth/logout/error');

export const getUserRequest = createAction('auth/getUser/request');
export const getUserSuccess = createAction('auth/getUser/success');
export const getUserError = createAction('auth/getUser/error');

export const resetPasswordRequest = createAction('auth/resetPassword/request');
export const resetPasswordSuccess = createAction('auth/resetPassword/success');
export const resetPasswordError = createAction('auth/resetPassword/error');
