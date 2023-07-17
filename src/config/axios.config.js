import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30000,
  timeoutErrorMessage: 'Server timed out...',
  headers: {
    'Content-Type': 'application/json',
  },
});

// console.log(import.meta.env.VITE_APP_API_URL);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'UNAUTHORIZED') {
      //TODO: LOGOUT
      throw error.response;
    } else if (error.code === 'FORBIDDEN') {
      throw error.response;
    } else if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('internal_server_error', error);
    } else {
      throw error.response;
    }
  }
);

export default axiosInstance;
