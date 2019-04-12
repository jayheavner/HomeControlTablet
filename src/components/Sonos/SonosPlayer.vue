<template>
  <div>
    <section v-if="loaded">
      <img :src="currentTrack.absoluteAlbumArtUri" />
      <div>{{ currentTrack.artist }}</div>
      <div>{{ currentTrack.title }}</div>
      <div>{{ playbackState }}</div>
      <p>
        {{ currentTrack }}
      </p>
    </section>
    <section v-else>
      Nothing playing
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    sonosTransportState: Object
  },
  computed: {
    ...mapState('sonosTransportState', ['transport']),
    loaded() {
      return this.transport !== undefined ? true : false;
    },
    currentTrack() {
      return this.transport.state.currentTrack;
    },
    playbackState() {
      return this.transport.state.playbackState;
    }
  },
  mounted() {
    var a = this.transport;
  }
};
</script>
