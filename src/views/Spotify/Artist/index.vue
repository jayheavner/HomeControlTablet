<template>
  <div v-scroll class="artist-view" @vScroll="loadMore">
    <div class="artist-view__content">
      <entity-info
        v-if="artist"
        :cover-img="artist.images"
        :type="artist.type"
        :name="artist.name"
        :uri="artist.uri"
        :followers="artist.followers.total"
      />

      <entity-header title="Popular" :small="true" />
      <tracks-list :tracks="tracks" :show-artists="false" :show-album="false" />

      <template v-if="albums">
        <entity-header v-if="albums" title="Albums" :small="true" />
        <media-container>
          <media-object
            v-for="(item, index) in albums.items"
            :id="item.id"
            :key="index"
            :uri="item.uri"
            :cover-img="item.images"
            :name="item.name"
            :artists="item.artists"
            :type="item.type"
          />
        </media-container>
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapActions } from 'vuex';
import EntityHeader from '@/components/Spotify/EntityHeader';
import EntityInfo from '@/components/Spotify/EntityInfo';
import MediaObject from '@/components/Spotify/MediaObject';
import MediaContainer from '@/components/Spotify/MediaContainer';
import TracksList from '@/components/Spotify/TracksList';

export default {
  name: 'ArtistView',

  components: {
    EntityHeader,
    EntityInfo,
    MediaObject,
    MediaContainer,
    TracksList
  },

  data() {
    return {
      artistId: null,
      artist: null,
      tracks: null,
      albums: null,
      isMore: null
    };
  },

  watch: {
    $route() {
      this.init();
    }
  },

  created() {
    this.init();
  },

  methods: {
    ...mapActions({
      notFoundPage: 'app/notFoundPage'
    }),

    initData() {
      this.artist = null;
      this.tracks = null;
      this.albums = {
        limit: 25,
        offset: 0,
        total: 1,
        items: []
      };
    },

    init() {
      this.artistId = this.$route.params.id;
      this.initData();
      this.get();
      this.getAlbums();
      this.getTopTracks();
    },

    async get() {
      try {
        const response = await api.spotify.artists.get(this.artistId);
        debugger;
        this.artist = response.data;
      } catch (e) {
        this.notFoundPage(true);
      }
    },

    async getAlbums() {
      try {
        if (this.albums.total > this.albums.offset) {
          const response = await api.spotify.artists.getAlbums(
            this.artistId,
            'album,single',
            this.albums.offset,
            this.albums.limit
          );

          this.albums.offset = response.data.offset + this.albums.limit;
          this.albums.total = response.data.total;
          this.albums.items.push(...response.data.items);
          this.isMore = false;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getTopTracks() {
      try {
        const response = await api.spotify.artists.getTopTracks(
          this.artistId,
          'US'
        );
        this.tracks = response.data.tracks;
      } catch (e) {
        console.log(e);
      }
    },

    async loadMore(ev) {
      if (this.isMore) {
        return false;
      }

      if (ev.detail.scrollbarV.percent > 70) {
        this.isMore = true;
        this.getAlbums(this.artistId);
      }
    }
  }
};
</script>

<style scoped lang="sass"></style>
