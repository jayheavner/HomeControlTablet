import request from './../axios';

export default {
  get(id) {
    return request.get(`artists/${id}`);
  },

  getTopTracks(id, country) {
    return request.get(`artists/${id}/top-tracks`, {
      params: {
        country
      }
    });
  },

  getAlbums(id, include_groups, offset = 0, limit = 50, market) {
    return request.get(`artists/${id}/albums`, {
      params: {
        include_groups,
        limit,
        offset,
        market
      }
    });
  }
};
