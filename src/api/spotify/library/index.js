import axios from './../axios';

export default {
  getTracks(offset = 0, limit = 50, market) {
    return axios.get('me/tracks', {
      params: {
        limit,
        offset,
        market
      }
    });
  },

  getAlbums(offset = 0, limit = 50, market) {
    return axios.get('me/albums', {
      params: {
        limit,
        offset,
        market
      }
    });
  },

  checkUserSavedTracks(ids) {
    return axios.get('me/tracks/contains', {
      params: {
        ids
      }
    });
  },

  saveTracks(ids) {
    return axios.put('me/tracks', {
      ids
    });
  },

  removeTracks(ids) {
    return axios.delete('me/tracks', {
      data: {
        ids
      }
    });
  }
};
