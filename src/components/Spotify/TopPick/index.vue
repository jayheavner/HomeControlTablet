<template>
  <div>
    <template v-if="topPick.type">
      <media-container>
        <media-object
          :id="topPick.id"
          :key="topPick.id"
          :uri="topPick.uri"
          :name="topPick.name"
          :type="topPick.type"
          :cover-img="topPick.images"
        />
      </media-container>
    </template>

    <template v-if="topPick.track">
      <media-container>
        <media-object
          :id="topPick.track.id"
          :key="topPick.track.id"
          :uri="topPick.track.uri"
          :name="topPick.track.name"
          :artists="topPick.track.artists"
          :type="topPick.track.type"
          :cover-img="topPick.track.album.images"
        />
      </media-container>
    </template>

    <template v-if="topPick.album">
      <media-container>
        <media-object
          :id="topPick.album.id"
          :key="topPick.album.id"
          :uri="topPick.album.uri"
          :name="topPick.album.name"
          :artists="topPick.album.artists"
          :type="topPick.album.type"
          :cover-img="topPick.album.images"
        />
      </media-container>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import router from '@/router';

import MediaObject from '@/components/Spotify/MediaObject';
import MediaContainer from '@/components/Spotify/MediaContainer';

export default {
  name: 'SearchResultView',

  components: {
    MediaObject,
    MediaContainer
  },

  computed: {
    ...mapState('spotifySearch', ['topPick'])
  }
};
</script>
