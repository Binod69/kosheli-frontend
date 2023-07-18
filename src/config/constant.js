export const BASE_URL =
  import.meta.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_APP_API_URL
    : '';
