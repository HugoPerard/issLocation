import Axios, { AxiosResponse } from 'axios';

Axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.headers['x-total-count']) {
    return {
      content: response.data,
      totalItems: response?.headers['x-total-count'],
    };
  }
  return response.data;
});
