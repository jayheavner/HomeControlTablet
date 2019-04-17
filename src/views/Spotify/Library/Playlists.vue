<template>
  <div v-scroll class="playlists-view" @vScroll="loadMore">
    <div class="playlists-view__content">
      <!-- @todo add play button -->
      <entity-header title="Playlists" />
      <playlists-table :playlists="playlists.items" type="library" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import EntityHeader from '@/components/Spotify/EntityHeader';
import PlaylistsTable from '@/components/Spotify/PlaylistsTable';

export default {
  name: 'Playlists',

  components: {
    EntityHeader,
    PlaylistsTable
  },

  data() {
    return {
      playlists: {
        limit: 25,
        offset: 0,
        total: 1,
        items: []
      },
      isMore: null
    };
  },

  computed: {
    // ...mapState('library', ['playlists']),
    ...mapState('library', { t: 'playlists' })
  },

  created() {
    this.getPlaylists();
  },

  methods: {
    async getPlaylists() {
      try {
        const t = this.t;
        if (this.playlists.total > this.playlists.offset) {
          const response = await api.spotify.playlists.get(
            this.playlists.offset,
            this.playlists.limit
          );

          this.playlists.offset = response.data.offset + this.playlists.limit;
          this.playlists.total = response.data.total;
          this.playlists.items.push(...response.data.items);
          this.isMore = false;
        }
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
        this.getPlaylists();
      }
    }
  }
};
</script>

<style scoped lang="sass"></style>
