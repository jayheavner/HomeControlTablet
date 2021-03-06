<template>
  <div class="search-view">
    <navbar />
    <div v-if="!query" class="search-view__info">
      Find your favorite songs, artists, albums and playlists.
    </div>

    <nav-view v-if="query" :links="navLinks" />

    <div v-if="isNoResultVisible" class="search-view__info">
      No result found for <strong>"{{ query }}"</strong>
      <div>
        Please make sure your words are spelled correctly or use less of
        different keywords.
      </div>
    </div>

    <loading-spinner v-if="isLoadingData" />

    <div class="search-view__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Navbar from '@/components/Spotify/Navbar';
import NavView from '@/components/Spotify/NavView';
import LoadingSpinner from '@/components/Spotify/LoadingSpinner';

export default {
  name: 'SearchView',

  components: {
    Navbar,
    NavView,
    LoadingSpinner
  },

  computed: {
    ...mapState('spotifySearch', [
      'query',
      'result',
      'isLoading',
      'error',
      'albumsIsLoading',
      'artistsIsLoading',
      'playlistsIsLoading',
      'tracksIsLoading'
    ]),

    isLoadingData() {
      return (
        this.isLoading ||
        this.tracksIsLoading ||
        this.albumsIsLoading ||
        this.artistsIsLoading ||
        this.playlistsIsLoading
      );
    },

    isTracksExists() {
      return this.result && this.result.tracks && this.result.tracks.total > 0;
    },

    isPlaylistsExists() {
      return (
        this.result && this.result.playlists && this.result.playlists.total > 0
      );
    },

    isAlbumsExists() {
      return this.result && this.result.albums && this.result.albums.total > 0;
    },

    isArtistsExists() {
      return (
        this.result && this.result.artists && this.result.artists.total > 0
      );
    },

    isResult() {
      return (
        this.isTracksExists ||
        this.isAlbumsExists ||
        this.isPlaylistsExists ||
        this.isArtistsExists
      );
    },

    isNoResultVisible() {
      return !this.isResult && this.query && !this.isLoading;
    },

    navLinks() {
      return [
        {
          to: { name: 'search-result', params: { query: this.query } },
          name: 'Top results'
        },
        {
          to: { name: 'search-track', params: { query: this.query } },
          name: 'Tracks',
          isVisible: this.isTracksExists
        },
        {
          to: { name: 'search-playlist', params: { query: this.query } },
          name: 'Playlists',
          isVisible: this.isPlaylistsExists
        },
        {
          to: { name: 'search-album', params: { query: this.query } },
          name: 'Albums',
          isVisible: this.isAlbumsExists
        },
        {
          to: { name: 'search-artist', params: { query: this.query } },
          name: 'Artists',
          isVisible: this.isArtistsExists
        }
      ];
    }
  },

  methods: {
    ...mapActions({
      notFoundPage: 'app/notFoundPage'
    })
  }
};
</script>

<style scoped lang="sass">

.search-view
  position: relative
  height: 100%

  &__info
    +absolute-center
    text-align: center
    line-height: 24px

  &__content
    height: calc(100vh - 227px)
</style>
