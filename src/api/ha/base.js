import axios from 'axios';
import { getDomain } from '@/utils';
import store from '@/store';

const req = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_HA_ADDY
      : 'http://192.168.3.6:8123',
  headers: {
    'x-ha-access': process.env.VUE_APP_HA_TOKEN
  }
});

req.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// private methods

export default {
  async getState(entity_id) {
    return req.get(`/api/states/${entity_id}`);
  },
  async getStates() {
    return req.get('/api/states');
  },
  async postService(entity_id, domain, service, data) {
    await req.post(`/api/services/${domain}/${service}`, data);
    return await this.getState(entity_id);
  }
};

req.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
req.interceptors.response.use(
  function(response) {
    if (response.data.attributes === undefined) return;
    debugger;
    const domain = getDomain(response.data.entity_id, true);
    store.dispatch(`${domain}/update`, response);

    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
