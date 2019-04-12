import api from '@/api';

const state = {
  lastSavedTrack: '',
  lastRemovedTrack: '',

  albums: '',
  artists: '',
  tracks: '',
  playlists: '',
  playlistTracks: '',

  libraryIsLoading: false,
  libraryError: null,
  libraryNextLoad: ''
};

const getters = {
  artists: state => state.artists || localStorage.getItem('artists'),
  albums: state => state.albums || localStorage.getItem('albums'),
  tracks: state => state.tracks || localStorage.getItem('tracks'),

  getSavedTrack: state => state.lastSavedTrack,
  getRemovedTrack: state => state.lastRemovedTrack,
  getReloadLibrary: state => {
    return new Date().getTime() < state.libraryNextLoad;
  }
};

const mutations = {
  SET_SAVED_TRACK(state, track) {
    state.lastRemovedTrack = '';
    state.lastSavedTrack = track;
  },

  SET_REMOVED_TRACK(state, track) {
    state.lastSavedTrack = '';
    state.lastRemovedTrack = track;
  },

  /* General */
  REQUEST_INIT_LIBRARY(state) {
    state.libraryIsLoading = true;
  },

  REQUEST_BUILD_LIBRARY_SUCCESS(state, library) {
    state.libraryIsLoading = false;
    state.artists = library.artists;
    state.albums = library.albums;
    state.tracks = library.tracks;
    state.playlists = library.playlists;
    state.playlistTracks = library.playlistTracks;
  },

  REQUEST_LIBRARY_ERROR(state, error) {
    state.libraryIsLoading = false;
    state.libraryError = error;
  },

  SET_EXPIRY_TIME(state) {
    state.libraryNextLoad = new Date().getTime() + 60 * 60 * 24 * 1000;
  }
};

const actions = {
  saveTrack({ commit }, track) {
    commit('SET_SAVED_TRACK', track);
  },

  removeTrack({ commit }, track) {
    commit('SET_REMOVED_TRACK', track);
  },

  /* ALBUMS */
  startLibraryLoad({ commit }) {
    commit('SET_EXPIRY_TIME');
    commit('REQUEST_INIT_LIBRARY');
  },

  libraryComplete({ commit }, data) {
    commit('REQUEST_BUILD_LIBRARY_SUCCESS', data);
  },

  libraryError({ commit }, error) {
    commit('REQUEST_LIBRARY_ERROR', error);
  },

  async load({
    dispatch,
    state: {
      artists,
      albums,
      tracks,
      playlists,
      playlistTracks,
      libraryNextLoad
    }
  }) {
    if (new Date().getTime() < libraryNextLoad) return;

    dispatch('startLibraryLoad');

    try {
      if (artists === '')
        artists = await getNext(
          'https://api.spotify.com/v1/me/following?type=artist',
          []
        );

      if (albums === '')
        albums = await getNext(
          'https://api.spotify.com/v1/me/albums?offset=0&limit=50&market=US',
          []
        );

      if (tracks === '')
        tracks = await getNext(
          'https://api.spotify.com/v1/me/tracks?offset=0&limit=50&market=US',
          []
        );

      if (playlists === '')
        playlists = await getNext(
          'https://api.spotify.com/v1/me/playlists',
          []
        );

      // if (playlistTracks === '') {
      //   playlists = playlists.filter(p => !p.name.startsWith('Rediscover'));
      //   let playlistTracks = [];
      //   for (const playlist of playlists) {
      //     playlistTracks.push(
      //       ...(await getNext(
      //         `${
      //           playlist.tracks.href
      //         }?market=US&fields=next,items(track(id%2Cname%2Chref%2Calbum(name%2Chref)%2Cartists(name%2Chref)))`,
      //         []
      //       ))
      //     );
      //     const trackIds = playlistTracks.map(t => {
      //       return t.track.id;
      //     });
      //     playlist.tracks.ids = trackIds;
      //   }
      //   // dedupe
      //   playlistTracks = playlistTracks.filter(
      //     (track, index, self) =>
      //       index === self.findIndex(t => t.track.id === track.track.id)
      //   );
      // }

      //const artists = await getArtists();
      const library = {
        artists: artists,
        albums: albums,
        tracks: tracks,
        playlists: playlists,
        playlistTracks: playlistTracks
      };

      dispatch('libraryComplete', library);
    } catch (e) {
      console.log(e);
      debugger;
      dispatch('libraryError', e);
    }
  }
};

const getNext = async (url, data) => {
  console.log(`getNext() url > ${url}`);
  const response = await api.spotify.next.get(url);
  let d = response.data.artists || response.data;
  console.dir(d);
  console.log(`next > ${d.next}`);
  data.push(...d.items);
  if (d.next !== null) return getNext(d.next, data);
  else return data;
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
