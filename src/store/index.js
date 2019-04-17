import Vue from 'vue';
import Vuex from 'vuex';
import vuexPersistedstate from 'vuex-persistedstate';

import homeassistant from './modules/home-assistant';
// import lights from './modules/lights';
import music from './modules/music';
import speakers from './modules/speakers';
import Media_player from './ha_base_types/media_player';
import Sensor from './ha_base_types/sensor';
import Binary_sensor from './ha_base_types/binary_sensor';
import Zwave from './ha_base_types/zwave';
import Light from './ha_base_types/light';
import Switch from './ha_base_types/switch';
import Camera from './ha_base_types/camera';
import Sun from './ha_base_types/sun';

//spotify
import player from './spotify/player';
import track from './spotify/track';
import spotifyAuth from './spotify/auth';
import spotifySearch from './spotify/search';
import library from './spotify/library';
import playlist from './spotify/playlist';
import user from './spotify/user';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const authState = vuexPersistedstate({
  key: 'spotify.auth',
  paths: [
    'spotifyAuth.accessToken',
    'spotifyAuth.refreshToken',
    'spotifyAuth.expiryTime'
  ]
  // reducer: state => ({
  //   spotifyAuth: {
  //     refreshToken: state.spotifyAuth.refreshToken
  //   }
  // }),
});

const libraryState = vuexPersistedstate({
  key: 'spotify.library',
  paths: [
    'library.artists',
    'library.albums',
    'library.tracks',
    'library.playlists',
    'library.playlistTracks',
    'library.libraryNextLoad'
  ]
});

export default new Vuex.Store({
  modules: {
    homeassistant,
    music,
    speakers,
    Media_player,
    Sensor,
    Binary_sensor,
    Zwave,
    Light,
    Switch,
    Camera,
    Sun,
    player,
    track,
    playlist,
    user,
    spotifyAuth,
    spotifySearch,
    library
  },
  plugins: [authState, libraryState],
  strict: debug
});

