import api from '@/api';
import { SpeakerModel } from '@/models';
import { buildList, upsertArray } from '@/utils';

const state = {
  isLoading: false,
  error: null,
  speakers: {},
  sources: []
};

const getters = {
  getSpeakers: state => state.speakers,
  getSources: state => state.sources
};

const mutations = {
  START_LOAD(state) {
    state.isLoading = true;
  },

  LOAD_SUCCESS(state, speakers) {
    state.isLoading = false;
    state.speakers = speakers;
  },

  LOAD_ERROR(state, error) {
    state.isLoading = false;
    state.error = error;
  },
  SET_SPEAKERS(state, speakers) {
    state.speakers = speakers;
  },
  SET_SOURCES(state, sources) {
    state.sources = sources;
  }
};

const actions = {
  startLoad({ commit }) {
    commit('START_LOAD');
  },

  loadComplete({ commit }, data) {
    commit('LOAD_SUCCESS', data);
  },

  loadError({ commit }, error) {
    commit('LOAD_ERROR', error);
  },

  async initialize({ dispatch }) {
    console.log(
      '%c hit init',
      'color: white; background: red; font-size: 24px;'
    );
    dispatch('startLoad');
    const allRequest = await api.ha.getStates();
    const groupRequest = await api.ha.getState('group.home_audio_speakers');

    let speakers = [];
    const all = allRequest.data;
    const group = groupRequest.data.attributes.entity_id;
    for (const entity of group) {
      const speaker = new SpeakerModel(all.find(a => a.entity_id === entity));
      speakers.push(speaker);
    }
    console.dir(speakers);
    dispatch('loadComplete', speakers);
    // commit('SET_SPEAKERS', speakers);
  },
  updateSpeaker(
    {
      commit,
      state: { speakers }
    },
    speaker
  ) {
    // the [...] syntax makes a copy of the array
    speakers = upsertArray(
      [...speakers],
      {
        entity_id: speaker.entity_id
      },
      speaker
    );
    commit('SET_SPEAKERS', speakers);
  },
  setSources({ commit, state }, sources) {
    if (state.sources.length == 0) commit('SET_SOURCES', sources);
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
