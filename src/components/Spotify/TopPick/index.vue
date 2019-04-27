<template>
  <div>
    <template v-if="topPick.type">
      <div class="columns">
        <media-object
          :id="topPick.id"
          :key="topPick.id"
          class="column is-3"
          :uri="topPick.uri"
          :name="topPick.name"
          :type="topPick.type"
          :cover-img="topPick.images"
        />
      </div>
    </template>

    <template v-if="topPick.track">
      <div class="columns">
        <media-object
          :id="topPick.track.id"
          :key="topPick.track.id"
          class="column is-3"
          :uri="topPick.track.uri"
          :name="topPick.track.name"
          :artists="topPick.track.artists"
          :type="topPick.track.type"
          :cover-img="topPick.track.album.images"
        />
      </div>
    </template>

    <template v-if="topPick.album">
      <div class="columns">
        <media-object
          :id="topPick.album.id"
          :key="topPick.album.id"
          class="column is-3"
          :uri="topPick.album.uri"
          :name="topPick.album.name"
          :artists="topPick.album.artists"
          :type="topPick.album.type"
          :cover-img="topPick.album.images"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MediaObject from '@/components/Spotify/MediaObject/Horizontal';

export default {
  name: 'SearchResultView',

  components: {
    MediaObject
  },

  computed: {
    ...mapState('spotifySearch', ['topPick'])
  }
};
</script>
