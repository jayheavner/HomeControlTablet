<template>
  <div :class="elClass">
    <div class="entity-info__cover">
      <img
        v-if="coverImg[0]"
        class="entity-info__cover-img"
        :src="coverImg[0].url"
        alt="cover"
      />
      <icon class="entity-info__cover-icon" name="music" />
    </div>

    <div class="entity-info__info">
      <div class="entity-info__type">
        {{ type }}
      </div>
      <h2 class="entity-info__name">
        {{ name }}
      </h2>
      <p
        v-if="description"
        class="entity-info__desc"
        v-html="$options.filters.convertURLs(description)"
      />

      <div v-if="artists" class="entity-info__artists">
        By
        <router-link
          v-for="(artist, index) in artists"
          :key="index"
          class="entity-info__link"
          :to="{ name: 'artist', params: { id: artist.id } }"
        >
          {{ artist.name }}
          <template v-if="index !== artists.length - 1">
            ,&nbsp;
          </template>
        </router-link>
      </div>

      <div
        v-if="author && author !== 'Jay Heavner'"
        class="entity-info__author"
      >
        Author: {{ author }}
      </div>
      <entity-action
        v-if="type === 'playlist'"
        :type="type"
        :playlist-id="playlistID"
        :uri="uri"
        :owner-id="ownerID"
      />
    </div>

    <div v-if="followers" class="entity-info__followers">
      <div>Followers</div>
      {{ followers }}
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/no-v-html */

import { mapGetters } from 'vuex';
import EntityAction from './EntityAction';

export default {
  name: 'EntityInfo',

  components: {
    EntityAction
  },

  props: {
    uri: {
      type: String,
      required: true
    },
    playlistID: {
      type: String,
      required: false
    },
    coverImg: {
      type: Array,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: false
    },
    artists: {
      type: Array,
      required: false
    },
    followers: {
      type: [Number, String],
      required: false
    },
    ownerID: {
      type: String,
      required: false
    }
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      user: 'user/getProfile'
    }),

    elClass() {
      return [
        'entity-info',
        {
          'entity-info--editable':
            this.ownerID === this.user.id && this.type === 'playlist'
        }
      ];
    }
  }
};
</script>

<style scoped lang="sass">

.entity-info
  display: flex
  position: relative
  padding: 15px
  font-size: 12px

  &--editable
    .entity-info__cover

  &__cover
    position: relative
    width: 40%
    min-width: 150px
    max-width: 200px
    max-height: 200px
    background: $c-mine-shaft
    box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, .4)

  &__cover-img
    position: relative
    z-index: 2
    width: 100%
    height: 100%

  &__cover-icon
    +absolute-center
    width: 40%
    height: 40%

  &__info
    color: $c-lighter
    display: flex
    flex-direction: column
    justify-content: flex-end
    width: 60%
    padding: 15px 15px 0

  &__type
    font-size: 11px
    text-transform: uppercase

  &__name
    margin: 10px 0
    font-size: 30px

  &__desc
    color: $c-gray

  &__artists
    color: $c-gray

  &__followers
    display: block !important
    position: absolute
    right: 15px
    bottom: 15px
    color: $c-gray
    line-height: 15px
    text:
      align: right
      transform: uppercase

  &__link,
  a
    color: $c-white
</style>
