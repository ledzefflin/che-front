import qs from '@/common/config/qs';
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
} from '@/common/config/axios-extensions';
import axios from '@/common/config/axios';

export const setup = () => {
  const baseUrl = '';
  const http = axios.create({
    baseURL: baseUrl,
    headers: { 'Cache-Control': 'no-cache' },
    adapter: throttleAdapterEnhancer(
      cacheAdapterEnhancer(axios.defaults.adapter, {
        enabledByDefault: true,
        cacheFlag: 'useCache',
      })
    ),
  });

  http.defaults.paramSerializer = (params) => {
    return qs.stringify(params, {
      arrayFormat: 'repeat',
    });
  };

  http.interceptors.request.use(); // 요청 interceptors
  http.interceptors.response.use(); // 응답 interceptors
};


export default {
  setup
};
