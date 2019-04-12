import api from '@/api';

const state = {
  zones: {},
  error: ''
};

const getters = {
  getZoneNames: state => {
    if (state.zones.map === undefined) return {};
    else {
      return state.zones
        .map(name => name['coordinator'])
        .map(name => name['roomName']);
    }
  }
};

const mutations = {
  SET_ZONES(state, zones) {
    state.zones = zones;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  async initialize({ commit }) {
    try {
      const zones = await api.sonos.zones.get();
      commit('SET_ZONES', zones.data);
    } catch (error) {
      commit('SET_ERROR', error);
    }
  },
  update({ commit }, zones) {
    commit('SET_ZONES', zones);
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
