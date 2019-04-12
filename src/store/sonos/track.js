const state = {
  currentTrack: {},
  playback: Boolean
};

const getters = {
  isPlaying: state =>
    state.playback !== undefined && state.playback.is_playing ? true : false
};

const mutations = {
  SET_TRACK(state, track) {
    state.currentTrack = track;
  },
  SET_PLAYBACK(state, playback) {
    state.playback = playback === 'PLAYING' ? true : false;
  }
};

const actions = {
  update({ commit }, sonos) {
    this.initialize(commit, sonos);
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
