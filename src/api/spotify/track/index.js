import axios from './../axios';

const market = 'US';

export default {
  get(id) {
    return axios.get(`tracks/${id}`, { params: { market } });
  }
};
