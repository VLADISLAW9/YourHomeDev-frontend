interface CommonError {
  comment: string;
}

type ApiError = CommonError;

interface ApiResponseSuccess<T> {
  data: T;
  success: true;
}

interface ApiResponseFailure {
  data: ApiError;
  success: false;
}

type ApiResponse<T> = (ApiResponseSuccess<T> | ApiResponseFailure) &
  Omit<import('axios').AxiosResponse, 'data'>;

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig };

type ApiRequestConfig = Omit<import('axios').AxiosRequestConfig, 'headers'> & {
  headers?: PlainObject;
};

type BaseResponse = CommonError;

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  created: string;
  updated: string;
  count: number;
}

interface Order {
  id: number;
  phoneNumber: string;
  address: string;
  fio: string;
  created: string;
  completed: string;
  products: Product[];
}
