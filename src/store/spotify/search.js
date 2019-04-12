import api from '@/api';
import Fuse from 'fuse.js';

const state = {
  query: '',
  result: '',
  isLoading: false,
  error: null,

  topPick: '',

  albums: '',
  albumsIsLoading: false,
  albumsError: null,

  artists: '',
  artistsIsLoading: false,
  artistsError: null,

  playlists: '',
  playlistsIsLoading: false,
  playlistsError: null,

  tracks: '',
  tracksIsLoading: false,
  tracksError: null
};

const getters = {};

const mutations = {
  SET_SEARCH_QUERY(state, data) {
    state.query = data;
  },

  REQUEST_SEARCH(state) {
    state.isLoading = true;
  },

  REQUEST_SEARCH_SUCCESS(state, data) {
    state.result = data;
    state.topPick = data.topPick;
    state.albums = data.albums;
    state.artists = data.artists;
    state.playlists = data.playlists;
    state.tracks = data.tracks;
    state.isLoading = false;
  },

  REQUEST_SEARCH_ERROR(state, error) {
    state.isLoading = false;
    state.error = error;
  },

  /* ALBUMS */
  REQUEST_GET_ALBUMS(state) {
    state.albumsIsLoading = true;
  },

  REQUEST_GET_ALBUMS_SUCCESS(state, data) {
    state.albumsIsLoading = false;
    state.albums = {
      ...data.albums,
      items: [...state.albums.items, ...data.albums.items]
    };
  },

  REQUEST_GET_ALBUMS_ERROR(state, error) {
    state.albumsIsLoading = false;
    state.albumsError = error;
  },

  /* ARTISTS */
  REQUEST_GET_ARTISTS(state) {
    state.artistsIsLoading = true;
  },

  REQUEST_GET_ARTISTS_SUCCESS(state, data) {
    state.artistsIsLoading = false;
    state.artists = {
      ...data.artists,
      items: [...state.artists.items, ...data.artists.items]
    };
  },

  REQUEST_GET_ARTISTS_ERROR(state, error) {
    state.artistsIsLoading = false;
    state.artistsError = error;
  },

  /* PLAYLISTS */
  REQUEST_GET_PLAYLISTS(state) {
    state.playlistsIsLoading = true;
  },

  REQUEST_GET_PLAYLISTS_SUCCESS(state, data) {
    state.playlistsIsLoading = false;
    state.playlists = {
      ...data.playlists,
      items: [...state.playlists.items, ...data.playlists.items]
    };
  },

  REQUEST_GET_PLAYLISTS_ERROR(state, error) {
    state.playlistsIsLoading = false;
    state.playlistsError = error;
  },

  /* TRACKS */
  REQUEST_GET_TRACKS(state) {
    state.tracksIsLoading = true;
  },

  REQUEST_GET_TRACKS_SUCCESS(state, data) {
    state.tracksIsLoading = false;
    state.tracks = {
      ...data.tracks,
      items: [...state.tracks.items, ...data.tracks.items]
    };
  },

  REQUEST_GET_TRACKS_ERROR(state, error) {
    state.tracksIsLoading = false;
    state.tracksError = error;
  }
};

const actions = {
  setSearchQuery({ commit }, query) {
    commit('SET_SEARCH_QUERY', query);
  },

  requestSearch({ commit }) {
    commit('REQUEST_SEARCH');
  },
  requestSearchSuccess({ commit }, data) {
    console.log('SEARCH RESULTS');
    console.dir(data);
    commit('REQUEST_SEARCH_SUCCESS', data);
  },
  requestSearchError({ commit }, error) {
    commit('REQUEST_SEARCH_ERROR', error);
  },

  async search({ commit, dispatch, rootState, rootGetters }, query) {
    dispatch('requestSearch');
    dispatch('setSearchQuery', query);

    var options = {
      shouldSort: true,
      includeScore: true,
      tokenize: true,
      // matchAllTokens: true,
      threshold: 0.2,
      location: 0,
      distance: 50,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ['name']
    };
    let artists = savedItemsSearch(
      rootGetters['library/artists'],
      options,
      query
    );

    options.keys = [
      { name: 'album.artists.name', weight: 0.6 },
      { name: 'album.name', weight: 0.2 },
      { name: 'album.tracks.items.name', weight: 0.1 }
    ];
    console.dir(rootGetters['library/albums']);
    let albums = savedItemsSearch(
      rootGetters['library/albums'],
      options,
      query
    );

    options.keys = [
      { name: 'track.name', weight: 0.6 },
      { name: 'track.artists.name', weight: 0.3 },
      { name: 'track.album.name', weight: 0.1 }
    ];

    // options.keys = ['track.name'];
    let tracks = savedItemsSearch(
      rootGetters['library/tracks'],
      options,
      query
    );

    const combined = [...artists, ...albums, ...tracks];
    const sorted = combined.sort((a, b) => {
      if (a.score === b.score) {
        let atype = -1;
        if (a.item.track) atype = 0;
        else if (a.item.album) atype = 1;
        let btype = -1;
        if (b.item.track) btype = 0;
        else if (b.item.album) btype = 1;
        return atype - btype;
      }
      return a.score - b.score;
    });
    const topPick = sorted[0];
    debugger;
    try {
      const response = await api.spotify.search.search(query);

      dispatch('requestSearchSuccess', {
        ...topPick,
        topPick: topPick.item,
        ...response.data
      });
    } catch (e) {
      dispatch('requestSearchError', e);
    }
  },

  /* ALBUMS */
  requestGetAlbums({ commit }) {
    commit('REQUEST_GET_ALBUMS');
  },

  requestGetAlbumsSuccess({ commit }, data) {
    commit('REQUEST_GET_ALBUMS_SUCCESS', data);
  },

  requestGetAlbumsError({ commit }, error) {
    commit('REQUEST_GET_ALBUMS_ERROR', error);
  },

  async getAlbums({ commit, dispatch, state: { albums, query } }) {
    dispatch('requestGetAlbums');

    try {
      if (albums.next) {
        const offset = albums.offset + albums.limit;
        const response = await api.spotify.search.search(
          query,
          'album',
          offset
        );

        dispatch('requestGetAlbumsSuccess', response.data);
      }
    } catch (e) {
      dispatch('requestGetAlbumsError', e);
    }
  },

  /* ARTISTS */
  requestGetArtists({ commit }) {
    commit('REQUEST_GET_ARTISTS');
  },

  requestGetArtistsSuccess({ commit }, data) {
    commit('REQUEST_GET_ARTISTS_SUCCESS', data);
  },

  requestGetArtistsError({ commit }, error) {
    commit('REQUEST_GET_ARTISTS_ERROR', error);
  },

  async getArtists({ commit, dispatch, state: { artists, query } }) {
    dispatch('requestGetArtists');

    try {
      if (artists.next) {
        const offset = artists.offset + artists.limit;
        const response = await api.spotify.search.search(
          query,
          'artist',
          offset
        );

        dispatch('requestGetArtistsSuccess', response.data);
      }
    } catch (e) {
      dispatch('requestGetArtistsError', e);
    }
  },

  /* PLAYLISTS */
  requestGetPlaylists({ commit }) {
    commit('REQUEST_GET_PLAYLISTS');
  },

  requestGetPlaylistsSuccess({ commit }, data) {
    commit('REQUEST_GET_PLAYLISTS_SUCCESS', data);
  },

  requestGetPlaylistsError({ commit }, error) {
    commit('REQUEST_GET_PLAYLISTS_ERROR', error);
  },

  async getPlaylists({ commit, dispatch, state: { playlists, query } }) {
    dispatch('requestGetPlaylists');

    try {
      if (playlists.next) {
        const offset = playlists.offset + playlists.limit;
        const response = await api.spotify.search.search(
          query,
          'playlist',
          offset
        );

        dispatch('requestGetPlaylistsSuccess', response.data);
      }
    } catch (e) {
      dispatch('requestGetPlaylistsError', e);
    }
  },

  /* TRACKS */
  requestGetTracks({ commit }) {
    commit('REQUEST_GET_TRACKS');
  },

  requestGetTracksSuccess({ commit }, data) {
    commit('REQUEST_GET_TRACKS_SUCCESS', data);
  },

  requestGetTracksError({ commit }, error) {
    commit('REQUEST_GET_TRACKS_ERROR', error);
  },

  async getTracks({ commit, dispatch, state: { tracks, query } }) {
    dispatch('requestGetTracks');

    try {
      if (tracks.next) {
        const offset = tracks.offset + tracks.limit;
        const response = await api.spotify.search.search(
          query,
          'track',
          offset
        );

        dispatch('requestGetTracksSuccess', response.data);
      }
    } catch (e) {
      dispatch('requestGetTracksError', e);
    }
  }
};

const savedItemsSearch = (array, options, query) => {
  var fuse = new Fuse(array, options); // "list" is the item array
  return fuse.search(query);
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
