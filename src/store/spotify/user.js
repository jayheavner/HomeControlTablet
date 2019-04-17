//import api from '@/api';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi();
const token = localStorage.getItem('access_token');
spotify.setAccessToken(token);

const state = {
  profile: '',
  playlists: ''
};

const getters = {
  getProfile: state => state.profile,
  getPlaylists: state => state.playlists
};

const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },

  SET_PLAYLISTS(state, playlists) {
    if (state.playlists) {
      state.playlists.limit = playlists.limit;
      state.playlists.offset = playlists.offset;
      state.playlists.next = playlists.next;
      state.playlists.total = playlists.total;
      state.playlists.items.push(...playlists.items);
    } else {
      state.playlists = playlists;
    }
  },

  CLEAR_PLAYLISTS(state) {
    state.playlists = '';
  }
};

const actions = {
  async getUserProfile({ commit }) {
    try {
      const response = await spotify.getMe();
      //const response = await api.spotify.users.getUserProfile();
      commit('SET_PROFILE', response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async getCurrentUserPlaylists({ getters, commit }, limit = 50) {
    debugger;
    let offset = 0;

    if (getters.getPlaylists) {
      offset = getters.getPlaylists.limit + getters.getPlaylists.offset;
    }

    if (!(getters.getPlaylists.total < offset)) {
      try {
        // const response = await api.spotify.playlists.getCurrentUserPlaylists(limit, offset);
        const response = await spotify.getUserPlaylists();
        commit('SET_PLAYLISTS', response.data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  // clearUserPlaylists({ commit }) {
  //   commit('CLEAR_PLAYLISTS');
  // }
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
