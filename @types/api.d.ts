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

type ApiResponse<T> = (ApiResponseFailure | ApiResponseSuccess<T>) &
  Omit<import('axios').AxiosResponse, 'data'>;

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig };

type ApiRequestConfig = Omit<import('axios').AxiosRequestConfig, 'headers'> & {
  headers?: PlainObject;
};

type BaseResponse = CommonError;

interface Product {
  count: number;
  created: string;
  description?: string;
  id: number;
  image: string;
  name: string;
  price: number;
  updated: string;
}

interface Order {
  address: string;
  completed: string;
  created: string;
  fio: string;
  id: number;
  phoneNumber: string;
  products: Product[];
}
