import { SpeakerModel } from '@/models';

import { buildList, upsertArray } from '@/utils';

const state = {
  speakers: {},
  sources: []
};

const getters = {
  getSpeakers: state => state.speakers,
  getSources: state => state.sources
};

const mutations = {
  SET_SPEAKERS(state, speakers) {
    state.speakers = speakers;
  },
  SET_SOURCES(state, sources) {
    state.sources = sources;
  }
};

const actions = {
  initialize({ commit }, msg) {
    const speakers = buildList(SpeakerModel, msg, 'group.home_audio_speakers');
    commit('SET_SPEAKERS', speakers);
  },
  updateSpeaker({ commit, getters }, speaker) {
    // the [...] syntax makes a copy of the array
    let speakers = upsertArray(
      [...getters.getSpeakers],
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
