<template>
  <div v-if="visible" id="results" v-scroll>
    <div>
      <template v-if="isTracksExists">
        <entity-header title="Top Pick" />

        <top-pick />
      </template>

      <template v-if="isTracksExists">
        <entity-header
          title="Tracks"
          small
          @click.native="goTo('search-track')"
        />

        <tracks-list :tracks="getTracks" />
      </template>

      <template v-if="isAlbumsExists">
        <entity-header
          title="Albums"
          small
          @click.native="goTo('search-album')"
        />
        <div class="columns is-multiline">
          <media-object
            v-for="(album, index) in albums.items"
            v-if="index < maxResults"
            :id="album.id"
            :key="album.id"
            class="column is-4"
            :uri="album.uri"
            :cover-img="album.images"
            :name="album.name"
            :artists="album.artists"
            :type="album.type"
          />
        </div>
      </template>

      <template v-if="isArtistsExists">
        <entity-header
          title="Artists"
          small
          @click.native="goTo('search-artist')"
        />
        <div class="columns is-multiline">
          <media-object
            v-for="(artist, index) in artists.items"
            v-if="index < maxResults"
            :id="artist.id"
            :key="artist.id"
            class="column is-3"
            :uri="artist.uri"
            :name="artist.name"
            :type="artist.type"
            :cover-img="artist.images"
          />
        </div>
      </template>

      <template v-if="isPlaylistsExists">
        <entity-header
          title="Playlists"
          small
          @click.native="goTo('search-playlist')"
        />

        <div class="columns is-multiline">
          <media-object
            v-for="(playlist, index) in playlists.items"
            v-if="index < maxResults"
            :id="playlist.id"
            :key="playlist.id"
            class="column is-3"
            :uri="playlist.uri"
            :cover-img="playlist.images"
            :name="playlist.name"
            :type="playlist.type"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import router from '@/router';

import EntityHeader from '@/components/Spotify/EntityHeader';
import MediaObject from '@/components/Spotify/MediaObject';
import TopPick from '@/components/Spotify/TopPick';
import TracksList from '@/components/Spotify/TracksList';

export default {
  name: 'SearchResultView',

  components: {
    TracksList,
    MediaObject,
    EntityHeader,
    TopPick
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maxResults: 4
    };
  },
  computed: {
    ...mapState('spotifySearch', [
      'query',
      'result',
      'isLoading',
      'error',
      'topPick',
      'albums',
      'tracks',
      'artists',
      'playlists'
    ]),

    isTracksExists() {
      return this.tracks && this.tracks.total > 0;
    },

    isAlbumsExists() {
      return this.albums && this.albums.total > 0;
    },

    isArtistsExists() {
      return this.artists && this.artists.total > 0;
    },

    isPlaylistsExists() {
      return this.playlists && this.playlists.total > 0;
    },

    getTracks() {
      return this.tracks && this.tracks.items
        ? Object.keys(this.tracks.items)
            .slice(0, 5)
            .map(key => ({ ...this.tracks.items[key] }))
        : [];
    }
  },

  methods: {
    goTo(name) {
      router.push({ name, params: { query: this.query } });
    }
  }
};
</script>
<style lang="sass" scoped>
#results
  height: 350px

.columns
  margin:
    left: 0.75rem
    right: 0.75rem
</style>
