import { apiSlice } from './api.slice';
import apiEndPoints from '../../config/api.endpoint';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: apiEndPoints.ORDERS,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${apiEndPoints.ORDERS}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  orderApiSlice;
