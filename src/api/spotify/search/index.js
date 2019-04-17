import axios from './../axios';

export default {
  search(
    q,
    type = 'album,artist,playlist,track',
    offset,
    limit,
    market = 'US',
    include_external
  ) {
    return axios.get('/search', {
      params: {
        q,
        type,
        limit,
        offset,
        market,
        include_external
      }
    });
  }
};
