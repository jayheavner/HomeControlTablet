import axios from './../axios';

export default {
  get(offset = 0, limit = 25) {
    return axios.get('me/playlists', {
      params: {
        limit,
        offset
      }
    });
  },

  getOne(playlist_id, fields) {
    return axios.get(`playlists/${playlist_id}`, {
      params: {
        fields
      }
    });
  },

  getTracks(playlist_id, offset, limit, fields) {
    return axios.get(`playlists/${playlist_id}/tracks`, {
      params: {
        fields,
        limit,
        offset
      }
    });
  },

  getUser(user_id, offset, limit) {
    return axios.get(`users/${user_id}/playlists`, {
      params: {
        limit,
        offset
      }
    });
  },

  create(user_id, name, description) {
    return axios.post(`users/${user_id}/playlists`, {
      name,
      description
    });
  },

  update(user_id, playlist_id, name, description) {
    return axios.put(`users/${user_id}/playlists/${playlist_id}`, {
      name,
      description
    });
  },

  //@todo something doesn't works it return 400 O_o
  updateCover(user_id, playlist_id, base64) {
    return axios({
      method: 'put',
      url: `users/${user_id}/playlists/${playlist_id}/images`,
      headers: {
        'content-type': 'image/jpeg'
      },
      data: { ...base64 }
    });
  }
};
