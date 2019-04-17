// The original code relied heavily on the Spotify Web Playback SDK. THis SDK is javascript only and seems
// very cool but is not available for either Safari or Chrome on IOS. It's still in beta so maybe that will
// change but for now we have to use the actual API.
import Vue from 'vue';
import api from '@/api';

let timer;
let timerRunning = false;

const state = {
  isLoading: undefined,
  devices: '',
  deviceID: '',
  playback: '',
  playbackContext: '',
  type: 'full'
};

const getters = {
  getDeviceID: state => state.deviceID,
  getPlayback: state => state.playback,
  getPlaybackContext: state => state.playbackContext,
  isPlaying: state =>
    state.playback !== undefined && state.playback.is_playing ? true : false,
  activeDevice: state => state.devices.find(d => d.is_active),
  defaultDevice: state =>
    state.devices.find(
      d =>
        d.name.localeCompare('house echo', 'en', { sensitivity: 'base' }) === 0
    )
};

const mutations = {
  LOADING(state, loading) {
    state.isLoading = loading;
  },

  SET_DEVICES(state, devices) {
    state.devices = devices.data.devices;
  },
  SET_DEVICE_ID(state, deviceID) {
    state.deviceID = deviceID;
  },
  SET_PLAYBACK(state, playback) {
    state.playback = playback.data;
  },
  SET_PLAYBACK_CONTEXT(state, playback) {
    state.playbackContext = playback;
  },
  SET_DISPLAY_TYPE(state, type) {
    state.type = type || 'full';
  }
};

const actions = {
  startLoad({ commit }) {
    commit('LOADING', true);
  },

  finishLoad({ commit }) {
    commit('LOADING', false);
  },

  async setPlayback({ commit }) {
    try {
      const response = await api.spotify.player.currentlyPlaying('market=US');
      commit('SET_PLAYBACK', await api.spotify.player.get('market=US'));
      console.log(
        '%cgetting spotify currently playing',
        'color:white; background: blue; font-size: 1.2em;'
      );
      console.dir(response);
    } catch (e) {
      console.log(e);
    }
  },

  async initialize({ commit, dispatch, state }) {
    dispatch('startLoad');
    commit('SET_DEVICES', await api.spotify.player.getDevices());
    commit('SET_PLAYBACK', await api.spotify.player.get('market=US'));
    //debugger;
    timer = state.timer = setTimeout(
      timerHit,
      state.playback.item.duration_ms - state.playback.progress_ms
    );
    dispatch('finishLoad');
  },
  setDisplayType({ commit }, type) {
    commit('SET_DISPLAY_TYPE', type);
  }
};

function timerHit() {
  //debugger;
  dispatch('initialize');
}
const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

Vue.mixin({
  computed: {
    $session: function() {
      return this.$store.state.session.session;
    }
  },
  mounted: function() {
    if (
      !this.$store.state.player.isLoading &&
      this.$store.state.player.playback === ''
    ) {
      this.$store.dispatch('player/initialize');
    }
  }
});

export default module;
