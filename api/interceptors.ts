import {AxiosInstance} from "axios";
import * as SecureStore from "expo-secure-store";

export function addLogErrorsInterceptor(axios: AxiosInstance) {
  const interceptor = {
    onFulfilled: (response: any) => {
      return response;
    },
    onRejected: async (error: any) => {
      if (!Boolean(error.response)) {
        return Promise.reject(error);
      }
      if (401 === error?.response?.status) {
        await SecureStore.deleteItemAsync("token");
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    },
  };
  return axios.interceptors.response.use(
    interceptor.onFulfilled,
    interceptor.onRejected
  );
}
type TError = {
  message: string;
  error: string;
  statusCode: number;
};
