<template>
  <div :class="elClass">
    <router-link tag="div" class="media-object__cover" :to="createUrl()">
      <div
        v-if="coverImg[0]"
        :style="coverImage"
        class="media-object__cover-inner"
        :alt="name + '-cover'"
      />
      <div v-else class="media-object__cover-inner">
        <icon class="media-object__music-icon" name="music" />
      </div>
      <div
        class="media-object__cover-hover"
        :class="{ round: type === 'artist' }"
      >
        <button class="media-object__play icon-play-circle" @click="onPlay" />
        <button class="media-object__sound-on icon-sound-on" />
        <button
          class="media-object__pause icon-pause-circle"
          @click="onPause"
        />
      </div>
    </router-link>

    <div class="media-object__info">
      <div>
        <router-link class="media-object__name" :to="createUrl()">
          {{ name }}
        </router-link>
      </div>

      <template v-if="artists">
        <router-link
          v-for="(artist, index) in artists"
          :key="artist.id"
          :to="{ name: 'artist', params: { id: artist.id } }"
          class="media-object__artist"
        >
          {{ artist.name }}
          <template v-if="index !== artists.length - 1">
            ,&nbsp;
          </template>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';

export default {
  name: 'MediaObject',

  /* eslint-disable vue/require-default-prop */
  /* eslint-disable vue/require-prop-types */
  props: {
    id: { required: true },
    uri: { required: true },
    coverImg: { required: true },
    name: {
      type: String,
      required: true
    },
    type: { required: true },
    artists: { required: false }
  },

  computed: {
    ...mapGetters('player', { playbackContext: 'getPlaybackContext' }),
    coverImage() {
      if (this.type === 'artist')
        return `border-radius: 50%; background-repeat: no-repeat; background-position: center, center; background-size: cover; background-image: url(${
          this.coverImg[1].url
        });`;
      else
        return `background-repeat: no-repeat; background-position: center, center; background-size: cover; background-image: url(${
          this.coverImg[1].url
        });`;
    },

    elClass() {
      return [
        'media-object',
        {
          'media-object--playing':
            this.playbackContext &&
            !this.playbackContext.paused &&
            this.playbackContext.context.uri &&
            this.playbackContext.context.uri.indexOf(this.id) >= 0,

          'media-object--active':
            this.playbackContext &&
            this.playbackContext.context.uri &&
            this.playbackContext.context.uri.indexOf(this.id) >= 0,
          'media-object--no-image': !this.coverImg[0]
        }
      ];
    }
  },

  methods: {
    createUrl() {
      const chunks = this.uri.split(':');
      let url = null;

      switch (this.type) {
        case 'album':
          url = { name: 'album', params: { id: this.id } };
          break;

        case 'artist':
          url = { name: 'artist', params: { id: this.id } };
          break;

        case 'playlist':
          url = {
            name: 'playlist',
            params: {
              user_id: chunks[2],
              playlist_id: chunks[chunks.length - 1]
            }
          };
          break;

        case 'track':
          url = { name: 'music' };
          break;
      }

      return url;
    },

    onPlay(e) {
      e.stopPropagation();
      debugger;
      if (
        this.playbackContext &&
        this.playbackContext.context.uri &&
        this.playbackContext.context.uri.indexOf(this.id) >= 0
      ) {
        api.spotify.player.play();
      } else {
        api.spotify.player.play(this.uri);
      }
    },

    onPause(e) {
      e.stopPropagation();
      api.spotify.player.pause();
    }
  }
};
</script>

<style scoped lang="sass">

.media-object
  // margin: 25px

  &:hover
    .media-object__play
      display: block

  &--active
    .media-object__name
      color: $c-green

  &--playing
    .media-object__sound-on
      display: block

    &:hover
      .media-object__pause
        display: block

      .media-object__play,
      .media-object__sound-on
        display: none

  &__pause,
  &__sound-on
    display: none

  &__play,
  &__pause
    font-size: 50px

  &__sound-on
    position: relative
    width: 60px
    height: 60px
    background: rgba(0, 0, 0, .6)
    border-radius: 50%
    font-size: 40px

    &:before
      +absolute-center

  &__play
    display: none

  &__cover
    position: relative
    min-width: 130px
    padding-top: 100%

    &:hover
      .media-object__cover-hover
        background: rgba(0, 0, 0, .6)

  &__cover-inner
    position: absolute
    top: 0
    width: 100%
    height: 100%
    background: $c-gray

  &__cover-hover
    display: block
    position: absolute
    top: 0
    width: 100%
    height: 100%

    &.round
      border-radius: 50%

    button
      +absolute-center
      background: none
      border: none
      color: $c-white
      outline: none

  &__info
    text-align: center
    margin-top: 16px
    font-size: 16px
    line-height: 20px

  &__name
    color: $c-white
    cursor: pointer

    &:hover
      text-decoration: underline

  &__artist
    color: $c-gray
    text-decoration: none

    &:hover
      color: $c-white
      text-decoration: underline

  &__avatar
    position: relative
    min-width: 130px
    min-height: 130px
    width: 100%
    height: 100%
    background: $c-sirocco

  &__music-icon
    +absolute-center
    width: 40%
    height: 40%
</style>
