<template>
  <div v-scroll class="album-view">
    <div>
      <entity-info
        v-if="album"
        :cover-img="album.images"
        :type="album.type"
        :name="album.name"
        :description="album.description"
        :artists="album.artists"
        :uri="album.uri"
      />

      <tracks-list
        v-if="album && tracks"
        :tracks="tracks"
        :show-album="false"
        :show-artists="false"
        :context-uri="album.uri"
      />
    </div>
  </div>
</template>

<script>
import api from '@/api';
import EntityInfo from '@/components/Spotify/EntityInfo';
import TracksList from '@/components/Spotify/TracksList';

export default {
  name: 'BrowsePlaylist',

  components: {
    EntityInfo,
    TracksList
  },

  data() {
    return {
      albumId: null,
      album: null,
      tracks: null
    };
  },

  created() {
    this.albumId = this.$route.params.id;
    this.get();
    this.getTracks();
  },

  methods: {
    async get() {
      try {
        const response = await api.spotify.albums.get(this.albumId);
        this.album = response.data;
      } catch (e) {
        // this.notFoundPage(true);
      }
    },

    async getTracks() {
      try {
        const response = await api.spotify.albums.getTracks(this.albumId);
        this.tracks = response.data.items;
      } catch (e) {
        // this.notFoundPage(true);
      }
    }
  }
};
</script>

<style scoped lang="sass"></style>
