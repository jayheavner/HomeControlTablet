import { cleanSource, upsertArray } from '@/utils';

const minConnectionId = 5;
const state = {
  isConnected: false,
  connectionId: 5,
  connections: []
};

const getters = {
  getIsConnected: state => state.isConnected,
  getConnections: state => state.connections,
  getConnectionId: state => state.connectionId
};

const mutations = {
  SET_IS_CONNECTED(state, result) {
    state.isConnected = result;
  },
  SET_CONNECTION_ID(state, id) {
    state.connectionId = id;
  },
  SET_CONNECTION(state, result) {
    state.connections.push(result);
  }
};

const actions = {
  isConnected({ commit }, result) {
    commit('SET_IS_CONNECTED', result);
  },
  isCurrentConnection({ commit }, id) {
    let connections = cleanSource(state.connections);
    return connections.find(c => c.id == id);
  },
  async getNextConnection({ commit }) {
    commit('SET_CONNECTION_ID', state.connectionId + 1);
    return Promise.resolve(state.connectionId);
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
