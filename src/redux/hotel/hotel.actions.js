import { createAction } from '@reduxjs/toolkit';

export const getHotelRequest = createAction('hotel/getHotelRequest');
export const getHotelSuccess = createAction('hotel/getHotelSuccess');
export const getHotelError = createAction('hotel/getHotelError');

export const updateHotelRequest = createAction('hotel/updateHotelRequest');
export const updateHotelSuccess = createAction('hotel/updateHotelSuccess');
export const updateHotelError = createAction('hotel/updateHotelError');
