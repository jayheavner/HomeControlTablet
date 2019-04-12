<template>
  <div v-scroll class="playlist-view" @vScroll="loadMore">
    <div class="playlist-view__content">
      <entity-info
        v-if="playlist"
        :cover-img="playlist.images"
        :type="playlist.type"
        :name="playlist.name"
        :description="playlist.description"
        :author="playlist.owner.display_name"
        :followers="playlist.followers.total"
        :uri="playlist.uri"
        :playlist-id="playlistID"
        :owner-id="playlist.owner.id"
      />
      <tracks-table :tracks="tracks.items" :context-uri="playlist.uri" />
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters, mapActions } from 'vuex';
import EntityInfo from '@/components/Spotify/EntityInfo';
import TracksTable from '@/components/Spotify/TracksTable';

export default {
  name: 'PlaylistView',

  components: {
    EntityInfo,
    TracksTable
  },

  data() {
    return {
      playlistID: null,
      tracks: null,
      more: null
    };
  },

  computed: {
    ...mapGetters('playlist', {
      playlist: 'getPlaylist'
    })
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
      notFoundPage: 'app/notFoundPage',
      fetchPlaylist: 'playlist/fetchPlaylist'
    }),

    initData() {
      this.tracks = {
        limit: 50,
        offset: 0,
        total: 1,
        items: []
      };
    },

    async getPlaylistTracks(playlistId) {
      try {
        if (this.tracks.total > this.tracks.offset) {
          const response = await api.spotify.playlists.getTracks(
            playlistId,
            this.tracks.offset,
            this.tracks.limit,
            { market: 'US' }
          );

          this.tracks.offset = response.data.offset + this.tracks.limit;
          this.tracks.total = response.data.total;
          this.tracks.items.push(...response.data.items);
          this.more = false;
        }
      } catch (e) {
        this.notFoundPage(true);
      }
    },

    async loadMore(ev) {
      if (this.more) {
        return false;
      }

      if (ev.detail.scrollbarV.percent > 70) {
        this.more = true;
        this.getPlaylistTracks(this.playlistID);
      }
    },

    init() {
      const playlist_id = this.$route.params.playlist_id;

      this.playlistID = playlist_id;

      this.initData();
      this.getPlaylistTracks(this.playlistID);
      this.fetchPlaylist({ playlistID: this.playlistID });
    }
  }
};
</script>

<style scoped lang="sass"></style>
