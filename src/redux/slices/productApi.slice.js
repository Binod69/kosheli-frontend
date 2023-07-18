import apiEndPoints from '../../config/api.endpoint';
import { apiSlice } from './api.slice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: apiEndPoints.PRODUCTS,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsById: builder.query({
      query: (productId) => ({
        url: `${apiEndPoints.PRODUCTS}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsByIdQuery } = productApiSlice;
