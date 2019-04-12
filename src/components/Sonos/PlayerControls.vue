<template>
  <div v-if="playback" class="player-controls">
    <button
      class="player-controls__button icon-previous"
      title="Previous"
      @click="prev"
    />
    <template v-if="!context.paused">
      <button
        class="player-controls__button player-controls__button--pause icon-pause-circle"
        @click="pause"
      />
    </template>
    <template v-else>
      <button
        class="player-controls__button player-controls__button--play icon-play-circle"
        @click="play"
      />
    </template>

    <button
      class="player-controls__button icon-next"
      title="Next"
      @click="next"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api';

export default {
  name: 'PlayerControls',

  computed: {
    ...mapGetters('player', {
      playback: 'getPlayback',
      context: 'getPlaybackContext'
    })
  },

  methods: {
    next() {
      api.sonos.player.nextTrack();
    },

    prev() {
      api.sonos.player.previousTrack();
    },

    pause() {
      api.sonos.player.pause();
    },

    play() {
      api.sonos.player.play();
    }
  }
};
</script>

<style scoped lang="sass">

.player-controls
  display: flex
  justify-content: center

  &__button
    background: none
    border: 0
    margin: auto 10px
    color: $c-gray
    font-size: 15px
    cursor: pointer
    outline: none

    &:hover
      color: $c-white

    &--active
      color: $c-green

    &--play,
    &--pause
      font-size: 35px

      &:hover
        color: $c-white
        transform: scale(1.1)
</style>
