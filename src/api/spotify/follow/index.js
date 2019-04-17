import axios from './../axios';

export default {
  followArtist(type, ids) {
    return axios.put('me/following', {
      params: {
        type,
        ids
      }
    });
  },

  unfollowArtist(type, ids) {
    return axios.delete('me/following', {
      params: {
        type,
        ids
      }
    });
  },

  checkIfUserFollowPlaylist(owner_id, playlist_id, ids) {
    return axios.get(
      `users/${owner_id}/playlists/${playlist_id}/followers/contains`,
      {
        params: {
          ids
        }
      }
    );
  },

  followPlaylist(owner_id, playlist_id) {
    return axios({
      method: 'put',
      url: `users/${owner_id}/playlists/${playlist_id}/followers`,
      headers: {
        'content-type': 'application/json'
      }
    });
  },

  unfollowPlaylist(owner_id, playlist_id) {
    return axios.delete(`users/${owner_id}/playlists/${playlist_id}/followers`);
  },

  getFollowedArtists(limit, after) {
    return axios.get('me/following?type=artist', {
      params: {
        limit,
        after
      }
    });
  }
};
