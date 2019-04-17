<template>
  <div v-if="context" class="player-playback">
    <div class="player-playback__time">{{ progress | msToMinutes }}</div>
    <div class="player-playback__progress-bar">
      <vue-slider
        v-model="progress"
        :bg-style="{ background: '#737575' }"
        :max="songDuration"
        :tooltip="false"
        :dot-size="15"
        :process-style="{ background: '#1db954' }"
        @drag-start="onDragStart"
        @callback="onProgressChange"
        @drag-end="onDragEnd"
      />
    </div>
    <div class=" player-playback__time">{{ songDuration | msToMinutes }}</div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerPlayerPlayback',

  data() {
    return {
      progress: 0,
      progressInterval: null,
      isDragStart: false,
      songDuration: 0
    };
  },

  computed: {
    ...mapGetters('player', {
      playback: 'getPlayback',
      context: 'getPlaybackContext',
      isPlaying: 'isPlaying'
    })
  },

  watch: {
    playback() {
      this.songDuration = this.playback.item.duration_ms;
    },

    context() {
      this.progress = this.context.position;
    },

    isPlaying() {
      this.updateProgress();
    }
  },

  created() {
    console.log(`Spotify currently playing > ${this.isPlaying}`);
    this.updateProgress();
    this.songDuration = this.playback.item.duration_ms;
  },

  methods: {
    updateProgress() {
      clearInterval(this.progressInterval);
      this.progress = this.context.position;

      if (!this.context.paused) {
        this.progressInterval = setInterval(() => {
          if (this.playback && this.progress + 1000 <= this.songDuration) {
            this.progress = this.progress + 1000;
          }
        }, 1000);
      }
    },

    onDragStart({ currentValue }) {
      this.isDragStart = true;
    },

    onDragEnd({ currentValue }) {
      this.isDragStart = false;
      api.spotify.player.seekToPosition(currentValue);
    },

    onProgressChange(currentValue) {
      if (!this.isDragStart) {
        this.isDragStart = false;
        api.spotify.player.seekToPosition(currentValue);
      }
    }
  }
};
</script>

<style lang="sass">

.player-playback
  display: flex
  width: 100%

  &__time
    min-width: 40px

  &__progress-bar
    width: 100%
</style>
