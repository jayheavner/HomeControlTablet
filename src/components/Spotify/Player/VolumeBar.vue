<template>
  <div class="volume-bar">
    <button :class="classesButton" @click="onButtonClick" />
    <vue-slider
      v-model="volume"
      class="volume-bar__slider"
      :tooltip="false"
      :dot-size="15"
      :process-style="{ background: '#1db954' }"
      :bg-style="{ background: '#737575', width: '80px' }"
      @drag-start="onDragStart"
      @callback="onSliderChange"
      @drag-end="onDragEnd"
    />
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';

export default {
  name: 'VolumeBar',

  data() {
    return {
      volume: 0,
      tmpVolume: 0,
      dragStartVolume: 0
    };
  },

  computed: {
    ...mapGetters('player', {
      playback: 'getPlayback'
    }),

    classesButton() {
      return [
        'volume-bar__button',
        {
          'icon-sound-on': this.volume,
          'icon-sound-off': !this.volume
        }
      ];
    }
  },

  watch: {
    playback(obj) {
      this.volume = obj.device.volume_percent;
    }
  },

  mounted() {
    this.volume = this.playback.device.volume_percent;
  },

  methods: {
    setVolume(val) {
      try {
        api.spotify.player.volume(val);
      } catch (e) {
        console.log(e);
      }
    },

    onButtonClick() {
      if (this.volume > 0) {
        this.tmpVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.tmpVolume;
      }

      this.setVolume(this.volume);
    },

    onDragStart({ currentValue }) {
      this.dragStartVolume = currentValue;
    },

    onDragEnd({ currentValue }) {
      this.setVolume(currentValue);
    },

    onSliderChange(currentValue) {
      const diff = Math.abs(this.dragStartVolume - currentValue);

      if (diff >= 10) {
        this.dragStartVolume = currentValue;
        this.setVolume(currentValue);
      }
    }
  }
};
</script>

<style lang="sass">
.volume-bar
  display: flex

  &__button
    background: none
    border: 0
    margin-right: 5px
    color: $c-gray
    cursor: pointer
    outline: none
    height: 20px

    &:hover
      color: $c-white
</style>
