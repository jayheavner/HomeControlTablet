<template>
  <div v-scroll @vScroll="loadMore($event, tracks.next, getTracks)">
    <tracks-list :tracks="tracks.items" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import { loadMore } from '@/mixins';
import TracksList from '@/components/Spotify/TracksList';

export default {
  name: 'SearchPlaylistView',

  components: {
    TracksList
  },

  mixins: [loadMore],

  computed: {
    ...mapState('spotifySearch', ['tracks'])
  },

  methods: {
    ...mapActions({
      getTracks: 'spotifySearch/getTracks'
    })
  }
};
</script>
