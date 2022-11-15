import { createSelector } from '@reduxjs/toolkit';

export const getOrders = (state) => state.orders.orders;
export const getLoading = (state) => state.orders.loading;
export const getNewOrdersCount = createSelector(
  getOrders,
  (orders) => orders.filter(({ status }) => status === 'new').length
);
export const getOnSiteOrders = createSelector(getOrders, (orders) =>
  orders.filter(({ is_takeaway }) => is_takeaway === 0)
);
export const getTakeawayOrders = createSelector(getOrders, (orders) =>
  orders.filter(({ is_takeaway }) => is_takeaway === 1)
);
