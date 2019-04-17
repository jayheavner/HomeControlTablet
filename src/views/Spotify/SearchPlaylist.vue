<template>
  <div v-scroll @vScroll="loadMore($event, playlists.next, getPlaylists)">
    <media-container>
      <media-object
        v-for="item in playlists.items"
        :id="item.id"
        :key="item.id"
        :uri="item.uri"
        :cover-img="item.images"
        :name="item.name"
        :type="item.type"
      />
    </media-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import { loadMore } from '@/mixins';
import MediaObject from '@/components/Spotify/MediaObject';
import MediaContainer from '@/components/Spotify/MediaContainer';

export default {
  name: 'SearchPlaylistView',

  components: {
    MediaObject,
    MediaContainer
  },

  mixins: [loadMore],

  computed: {
    ...mapState('spotifySearch', ['playlists'])
  },

  methods: {
    ...mapActions({
      getPlaylists: 'spotifySearch/getPlaylists'
    })
  }
};
</script>
