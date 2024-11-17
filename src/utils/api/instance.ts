import type { AxiosResponse } from 'axios';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BACKEND_URL;

export const api = axios.create({
  baseURL,
  validateStatus(status) {
    return status >= 200 && status < 599;
  },
  withCredentials: true
});

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse<any, any> & { success: boolean } => {
    if (response.status >= 400 && response.status < 599) {
      return { ...response, success: false };
    }

    return { ...response, success: true };
  }
);
