<template>
  <div v-scroll @vScroll="loadMore($event, albums.next, getAlbums)">
    <media-container>
      <media-object
        v-for="album in albums.items"
        :id="album.id"
        :key="album.id"
        :uri="album.uri"
        :cover-img="album.images"
        :name="album.name"
        :artists="album.artists"
        :type="album.type"
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
  name: 'SearchAlbumView',

  components: {
    MediaObject,
    MediaContainer
  },

  mixins: [loadMore],

  computed: {
    ...mapState('spotifySearch', ['albums'])
  },

  methods: {
    ...mapActions({
      getAlbums: 'spotifySearch/getAlbums'
    })
  }
};
</script>
