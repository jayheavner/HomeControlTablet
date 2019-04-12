import { subscribe } from '@/mqtt';
import urlParse from 'url-parse';

const state = {
  transport: {},
  musicService: ''
};

const getters = {
  getSonosTransportData: state => state.transport,
  getMusicService: state => state.musicService,
  getTrackId: state => {
    const url = new urlParse(state.transport.state.currentTrack.trackUri);
    const path = url.pathname.split('%3a');
    return path[2];
  }
};

const mutations = {
  SET_TRANSPORT(state, data) {
    state.transport = data;
  },
  SET_SERVICE(state, service) {
    state.service = service;
  }
};

const actions = {
  initialize(context) {
    //todo - move logic and delete this store
    // I think this should be handled/merged into the Sonos Zone store. I need one instance of `the truth`
    subscribe('sonos/transport-state', data => {
      const transport = JSON.parse(data);
      context.commit('SET_TRANSPORT', transport);
      // so...fun times...we can have different services coming through and need to handle them
      // we'll look at the track URI
      const tag = transport.state.currentTrack.uri.split(':')[0];
      switch (tag) {
        case 'x-sonosapi-hls-static': // Amazon
          context.commit('SET_SERVICE', 'Amazon Music');
          break;
        case 'pndrradio': // Pandor
          context.commit('SET_SERVICE', 'Pandora');
          break;

        case 'x-sonos-spotify': // Spotify
          context.commit('SET_SERVICE', 'Spotify');
          context
            .dispatch('track/setTrack', context.getters['getTrackId'], {
              root: true
            })
            .then(t => {
              console.log(t);
            });
          break;
      }

      // if (uri.startsWith('pndrradio')) {
      //   // pandora
      //   debugger;
      // } else if (uri.startsWith('x-sonos-spotify')) {
      //   // spotify
      //   debugger;
      // } else if (uri)
    });
  },
  update({ commit }, data) {
    commit('SET_PLAYBACK', data);
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
