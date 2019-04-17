<template>
  <div v-scroll @vScroll="loadMore($event, artists.next, getArtists)">
    <media-container>
      <media-object
        v-for="item in artists.items"
        :id="item.id"
        :key="item.id"
        :uri="item.uri"
        :name="item.name"
        :type="item.type"
        :cover-img="item.images"
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
  name: 'SearchArtistView',

  components: {
    MediaObject,
    MediaContainer
  },

  mixins: [loadMore],

  computed: {
    ...mapState('spotifySearch', ['artists'])
  },

  methods: {
    ...mapActions({
      getArtists: 'spotifySearch/getArtists'
    })
  }
};
</script>
