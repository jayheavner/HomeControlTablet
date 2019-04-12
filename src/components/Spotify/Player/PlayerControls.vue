<template>
  <div v-show="playback" class="player-controls">
    <button v-show="displayType !== 'micro'" :class="classesShuffle" title="Shuffle" @click="shuffle" />
    <button
      class="player-controls__button icon-previous"
      title="Previous"
      @click="prev"
    />
    <template v-if="!playback.is_playing">
      <button
        class="player-controls__button player-controls__button--play icon-play-circle"
        @click="play"
      />
    </template>
    <template v-else>
      <button
        class="player-controls__button player-controls__button--pause icon-pause-circle"
        @click="pause"
      />
    </template>

    <button
      class="player-controls__button icon-next"
      title="Next"
      @click="next"
    />
    <button v-show="displayType !== 'micro'" :class="classesRepeat" title="Repeat" @click="repeat" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import api from '@/api';

export default {
  name: 'PlayerControls',

  computed: {
    ...mapState('player', { displayType: 'type' }),
    ...mapGetters('player', {
      playback: 'getPlayback',
      context: 'getPlaybackContext'
    }),
    classesShuffle() {
      return [
        'player-controls__button',
        'icon-shuffle',
        {
          'player-controls__button--active': this.context.shuffle
        }
      ];
    },

    classesRepeat() {
      return [
        'player-controls__button',
        {
          'icon-repeat': this.context.repeat_mode !== 2,
          'icon-repeat-one': this.context.repeat_mode === 2,
          'player-controls__button--active': this.context.repeat_mode > 0
        }
      ];
    }
  },
  methods: {
    next() {
      api.spotify.nextTrack();
    },

    prev() {
      api.spotify.previousTrack();
    },

    pause() {
      api.spotify.player.pause();
    },

    play() {
      api.spotify.player.play();
    },

    shuffle() {
      api.spotify.shuffle(this.context.shuffle);
    },

    repeat() {
      const states = ['off', 'context', 'track'];

      const repeatState = this.context.repeat_mode;
      let index = repeatState === 2 ? 0 : repeatState + 1;

      api.spotify.repeat(states[index]);
    }
  }
};
</script>

<style scoped lang="sass">

.player-controls
  display: flex
  justify-content: center

  &__button
    margin: auto 10px
    color: $c-gray
    font-size: 25px
    cursor: pointer
    outline: none
    border: 0
    background: none

    &:hover
      color: $c-white

    &--active
      color: $c-green

    &--play,
    &--pause
      font-size: 70px

      &:hover
        color: $c-white
        transform: scale(1.1)
</style>
