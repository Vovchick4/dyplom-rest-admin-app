import { createAction } from '@reduxjs/toolkit';

export const fetchAllRequest = createAction('orders/fetchAllRequest');
export const fetchAllSuccess = createAction('orders/fetchAllSuccess');
export const fetchAllError = createAction('orders/fetchAllError');

export const editRequest = createAction('orders/editRequest');
export const editSuccess = createAction('orders/editSuccess');
export const editError = createAction('orders/editError');

export const removeRequest = createAction('orders/removeRequest');
export const removeSuccess = createAction('orders/removeSuccess');
export const removeError = createAction('orders/removeError');

export const add = createAction('orders/add');
