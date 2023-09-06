import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = import.meta.env.VITE_APP_API_URL;

const baseQuery = fetchBaseQuery({ baseUrl: apiBaseUrl });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});
