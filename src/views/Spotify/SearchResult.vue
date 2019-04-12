<template>
  <div v-scroll>
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

      <template v-if="isPlaylistsExists">
        <entity-header
          title="Playlists"
          small
          @click.native="goTo('search-playlist')"
        />

        <media-container>
          <media-object
            v-for="(playlist, index) in playlists.items"
            v-if="index < maxResults"
            :id="playlist.id"
            :key="playlist.id"
            :uri="playlist.uri"
            :cover-img="playlist.images"
            :name="playlist.name"
            :type="playlist.type"
          />
        </media-container>
      </template>

      <template v-if="isAlbumsExists">
        <entity-header
          title="Albums"
          small
          @click.native="goTo('search-album')"
        />
        <media-container>
          <media-object
            v-for="(album, index) in albums.items"
            v-if="index < maxResults"
            :id="album.id"
            :key="album.id"
            :uri="album.uri"
            :cover-img="album.images"
            :name="album.name"
            :artists="album.artists"
            :type="album.type"
          />
        </media-container>
      </template>

      <template v-if="isArtistsExists">
        <entity-header
          title="Artists"
          small
          @click.native="goTo('search-artist')"
        />
        <media-container>
          <media-object
            v-for="(artist, index) in artists.items"
            v-if="index < maxResults"
            :id="artist.id"
            :key="artist.id"
            :uri="artist.uri"
            :name="artist.name"
            :type="artist.type"
            :cover-img="artist.images"
          />
        </media-container>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import router from '@/router';

import EntityHeader from '@/components/Spotify/EntityHeader';
import MediaObject from '@/components/Spotify/MediaObject';
import MediaContainer from '@/components/Spotify/MediaContainer';
import TopPick from '@/components/Spotify/TopPick';
import TracksList from '@/components/Spotify/TracksList';

export default {
  name: 'SearchResultView',

  components: {
    TracksList,
    MediaObject,
    EntityHeader,
    TopPick,
    MediaContainer
  },

  data() {
    return {
      maxResults: 12
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
