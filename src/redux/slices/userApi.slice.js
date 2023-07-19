import apiEndPoints from '../../config/api.endpoint';
import { apiSlice } from './api.slice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.USERS}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    registers: builder.mutation({
      query: (data) => ({
        url: apiEndPoints.USERS,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${apiEndPoints.USERS}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistersMutation, useLogoutMutation } =
  userApiSlice;
