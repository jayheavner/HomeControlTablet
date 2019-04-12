<template>
  <section v-if="!!tracks.length" class="track">
    <div class="columns track__header">
      <div class="column is-offset-2 track--name">
        Title
      </div>

      <div class="column track--artist">
        Artist
      </div>

      <div class="column track--album is-hidden-touch">
        Album
      </div>

      <div class="column track--added-at is-hidden-touch">
        <icon name="calendar-alt" />
      </div>

      <div class="column track--duration is-hidden-touch">
        <icon name="clock" />
      </div>
    </div>
    <div
      v-for="(item, index) in tracks"
      :key="index"
      :class="isActiveTrack(item.track)"
      :data-id="item.track.id"
      class="columns"
    >
      <div class="column is-1 track--playback">
        <track-playback
          :track-uri="item.track.uri"
          :tracks-uris="tracksUris"
          :context-uri="contextUri"
          :offset="index"
        />
      </div>

      <div class="column is-1 track--addition">
        <track-addition
          :track-id="item.track.id"
          :is-saved="savedTracks[index]"
          @updateTrackstatus="onTrackUpdate"
          @savedTrackRemove="onSavedTrackRemove"
        />
      </div>

      <div class="column">
        {{ item.track.name }}
        <span v-if="item.track.explicit" class="track__explicit-label">
          Explicit
        </span>
      </div>

      <div class="column">
        <div>
          <router-link
            v-for="(artist, index) in item.track.artists"
            :key="index"
            class="track__link"
            :to="{ name: 'artist', params: { id: artist.id } }"
          >
            {{ artist.name }}
            <template v-if="index !== item.track.artists.length - 1">
              ,&nbsp;
            </template>
          </router-link>
        </div>
      </div>

      <div class="column is-hidden-touch">
        <router-link
          class="track__link"
          :to="{ name: 'album', params: { id: item.track.album.id } }"
        >
          {{ item.track.album.name }}
        </router-link>
      </div>

      <div class="column track--added-at is-hidden-touch">
        {{ item.added_at | moment('MM-DD-YYYY') }}
      </div>

      <div class="column track--duration is-hidden-touch">
        {{ item.track.duration_ms | msToMinutes }}
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';
import TrackAddition from '@/components/Spotify/TrackAddition';
import TrackPlayback from '@/components/Spotify/TrackPlayback';

export default {
  name: 'TracksTable',

  components: {
    TrackAddition,
    TrackPlayback
  },

  props: {
    tracks: {
      required: true,
      default: []
    },
    type: {
      type: String,
      default: '',
      required: false
    },
    contextUri: {
      type: String,
      default: '',
      required: false
    }
  },

  data() {
    return {
      tracksUris: '',
      tracksIds: '',
      savedTracks: []
    };
  },

  computed: {
    ...mapGetters({
      user: 'user/getProfile',
      playback: 'player/getPlayback',
      context: 'player/getPlaybackContext'
    })
  },

  watch: {
    tracks() {
      this.fetchTrackUris();
      this.fetchTrackIds();
      this.checkSavedTracks();
    }
  },

  methods: {
    sortBy(sortKey, event) {
      //@todo Add columns sorting
    },

    fetchTrackUris() {
      this.tracksUris = this.tracks.map(el => {
        return el.track.uri;
      });
    },

    fetchTrackIds() {
      this.tracksIds = this.tracks.map(el => {
        return el.track.id;
      });
    },

    async checkSavedTracks() {
      try {
        const saved = {
          offset: 0,
          limit: 50,
          total: this.tracks.length || 0,
          items: []
        };

        while (saved.total > saved.offset) {
          const response = await api.spotify.library.checkUserSavedTracks(
            this.tracksIds
              .slice(saved.offset, saved.offset + saved.limit)
              .toString()
          );
          saved.offset = saved.offset + saved.limit;
          saved.items.push(...response.data);
        }

        this.savedTracks = saved.items;
      } catch (e) {
        console.log(e);
      }
    },

    isActiveTrack(current) {
      const isActiveTrack =
        this.playback.item && this.playback.item.id === current.id;

      return {
        track__active: isActiveTrack,
        track__paused: isActiveTrack && this.context && this.context.paused
      };
    },

    onTrackUpdate() {
      this.checkSavedTracks();
    },

    onSavedTrackRemove(id) {
      if (this.type === 'library') {
        document.querySelectorAll(`[data-id='${id}']`)[0].remove();
      }
      //@todo remove song from playback context
    }
  }
};
</script>

<style lang="sass">

.track
  color: $c-white

  &__header
    color: $c-gray
    text-transform: uppercase
    font-size: 0.8rem

  &__link
    color: $c-white

    &:hover
      text-decoration: underline

  &:hover
    &:not(:first-of-type)
      background: $c-mine-shaft
      color: $c-white

    .track__explicit-label
      color: $c-white
      border-color: $c-white

    .track-addition__button
      color: $c-white
      background: none
      border: 0

    .track-playback
      display: block

  &__active
    background: $c-mine-shaft
    color: $c-green

    .track__link
      color: $c-green

    .track-playback
      display: block !important


    &--playback
      max-width: 40px

    &--addition
      max-width: 40px

    &--added-at
      max-width: 100px

    &--duration
      max-width: 60px

  &__explicit-label
    margin-left: 5px
    padding: 3px
    border: 1px solid $c-gray
    border-radius: 3px
    color: $c-gray
    font-size: 9px
    line-height: 1
    letter-spacing: 1.5px
    text-transform: uppercase

  .track-playback
    display: none
</style>
