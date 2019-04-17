<template>
  <div :class="classObject">
    <div v-if="playback" class="columns">
      <current-track class="column is-4" />

      <div class="column is-4">
        <player-controls />
        <player-playback />
      </div>

      <div class="column is-3 level">
        <div class="level-right">
          <device-picker class="level-item" />
          <volume-bar class="level-item" />
          <icon name="expand-arrows-alt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import VolumeBar from './VolumeBar';
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import PlayerPlayback from './PlayerPlayback';
import DevicePicker from './DevicePicker';

export default {
  name: 'Player',

  components: {
    VolumeBar,
    CurrentTrack,
    PlayerControls,
    PlayerPlayback,
    DevicePicker
  },

  // props: {
  //   display: {
  //     type: String,
  //     default: 'full'
  //   }
  // },

  mounted() {},
  computed: {
    ...mapState('player', { displayType: 'type' }),
    ...mapGetters('player', {
      playback: 'getPlayback'
    }),
    classObject() {
      return `player-${this.displayType}`;
    }
  },
  methods: {}
};
</script>

<style scoped lang="sass">

// #app
//   display: flex
//   min-height: 100vh
//   flex-direction: column

.player-micro
  height: 82px;
  position: fixed
  bottom: 50px
  width: calc(100%)
  z-index: 2
  // background: $c-shark
    // position: absolute;
    // right: 0;
    // left: 0;
    // top: 348px;

  .columns
    align-items: center

.player,
  flex-shrink: 0
  position: fixed
  bottom: 0
  width: calc(100% - 20%)
  height: 170px
  z-index: 2
  background: $c-shark

  .columns
    align-items: center

    .device-picker
      margin: 2px 5px 0 auto

    .volume-bar
      margin: 0 15px 0 5px
</style>
