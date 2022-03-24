import axios, {
  AxiosInstance,
  CancelToken,
  CancelTokenSource,
  AxiosResponse,
} from 'axios';
import _ from 'lodash';
import { toast } from 'react-toastify';
import getToken from 'helpers/getToken';
import dispatch from 'helpers/dispatch';
import { resetAuth } from 'modules/common/reducers';

const getData = (data: object) => {
  // _.pick(data, ['data.data', 'status']);
  return _.get(data, 'data.data', {});
};

const getErrorMessage = (data: object, statusCode: number): string => {
  if (statusCode === 401) {
    localStorage.clear();
    dispatch(resetAuth(false));
  }

  if (statusCode === 422) {
    const errors = _.get(data, 'errors');
    const str = typeof errors === 'string' ? errors : _.get(errors, '0.message', '');
    return str;
  }

  return _.get(data, 'message', "Something's wrong. Please reload.");
};

type GetConfigProps = {
  params?: object;
  cancelToken: CancelToken;
};

type PostConfigProps = {
  payload?: object;
  cancelToken: CancelToken;
};

type PutConfigProps = {
  payload?: object;
  cancelToken: CancelToken;
};

type DeleteConfigProps = {
  cancelToken: CancelToken;
};

class Api {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_ENDPOINT,
      validateStatus: () => true,
    });
  }

  public createCancelToken = (): CancelTokenSource => {
    const tokenCancel = axios.CancelToken;
    const source = tokenCancel.source();
    return source;
  };

  public async get(url: string, config: GetConfigProps, meta: boolean = false) {
    try {
      await this.checkToken();
      const response = await this.api.get(url, config);
      return this.getResponse(response, 'get', meta);
    } catch (error) {
      return;
    }
  }

  public async post(
    url: string,
    { payload = {}, cancelToken }: PostConfigProps
  ) {
    try {
      await this.checkToken();
      const response = await this.api.post(url, payload, { cancelToken });
      return this.getResponse(response, 'post');
    } catch (error) {
      return;
    }
  }

  public async put(url: string, { payload = {}, cancelToken }: PutConfigProps) {
    try {
      await this.checkToken();
      const response = await this.api.put(url, payload, { cancelToken });
      return this.getResponse(response, 'put');
    } catch (error) {
      return;
    }
  }

  public async delete(url: string, { cancelToken }: DeleteConfigProps) {
    try {
      await this.checkToken();
      const response = await this.api.delete(url, { cancelToken });
      return this.getResponse(response, 'post');
    } catch (error) {
      return;
    }
  }

  private getResponse(
    response: AxiosResponse,
    method: 'get' | 'post' | 'put' | 'delete' = 'get',
    meta: boolean = false
  ) {
    if (response.status !== 200 && response.status !== 202) {
      const str = getErrorMessage(response.data, response.status);
      toast.error(str);
      return;
    }
    if (method === 'get') {
      if (meta) {
        return _.pick(_.get(response, 'data', {}), ['meta', 'data']);
      }
      return getData(response);
    }
    return response.data;
  }

  private checkToken() {
    const token = getToken();
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
}

export default new Api();
