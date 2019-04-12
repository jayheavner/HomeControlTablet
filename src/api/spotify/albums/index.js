import request from './../axios';

export default {
  get(id, market = 'US') {
    if (Array.isArray(id)) {
      return request.get('albums', {
        id,
        market
      });
    } else {
      return request.get(`albums/${id}`);
    }
  },

  getTracks(id, offset = 0, limit = 50, market) {
    return request.get(`albums/${id}/tracks`, {
      params: {
        limit,
        offset,
        market
      }
    });
  }
};
