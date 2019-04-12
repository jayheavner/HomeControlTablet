import api from '@/api';

const state = {
  track: {}
};

const getters = {
  getAlbumImages: state => state.track.album.images,
  getAlbumImage300: state => {
    debugger;
    return state.track.album.images.find(image => image.height === 300).url;
  }
};

const mutations = {
  SET_TRACK(state, track) {
    state.track = track;
  }
};

const actions = {
  async setTrack({ commit }, trackId) {
    try {
      const trackInfo = await api.spotify.track.get(trackId);
      commit('SET_TRACK', trackInfo.data);
      return trackInfo.data;
    } catch (e) {
      console.log(e);
    }
  }
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
