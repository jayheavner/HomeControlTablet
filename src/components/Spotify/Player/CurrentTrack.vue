<template>
  <div v-if="playback" class="current-track">
    <div  v-if="displayType === 'full'" class="image is-200x200">
      <router-link :to="createUrlForCover(playback.context)">
        <img
          class="current-track__img"
          :src="playback.item.album.images[1].url"
        />
      </router-link>
    </div>

    <div class="current-track__info">
      <router-link
        class="current-track__name"
        :to="{ name: 'album', params: { id: playback.item.album.id } }"
      >
        {{ playback.item.name }}
      </router-link>

      <track-addition
        :track-id="currentTrackID"
        :is-saved="isSavedTrack"
        @updateTrackstatus="onTrackUpdate"
      />

      <div class="current-track__artists">

        <router-link
          v-for="(artist, index) in playback.item.artists"
          :key="index"
          :to="{ name: 'artist', params: { id: artist.id } }"
          class="current-track__link"
        >
          {{ artist.name }}
          <template v-if="index !== playback.item.artists.length - 1">
            ,&nbsp;
          </template>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapState } from 'vuex';
import TrackAddition from '@/components/Spotify/TrackAddition';

export default {
  name: 'CurrentTrack',

  components: {
    TrackAddition
  },

  data() {
    return {
      currentTrackID: '',
      isSavedTrack: false
    };
  },

  computed: {
    ...mapState('player', { playback: 'playback' }),
    ...mapState('player', { displayType: 'type' })
  },

  watch: {
    playback() {
      if (this.currentTrackID !== this.playback.item.id) {
        this.currentTrackID = this.playback.item.id;
      }

      this.checkSavedTrack(this.currentTrackID);
    }
  },

  created() {
    this.currentTrackID = this.playback.item.id;
    this.checkSavedTrack(this.currentTrackID);
  },

  methods: {
    async checkSavedTrack(id) {
      try {
        const response = await api.spotify.library.checkUserSavedTracks(id);
        this.isSavedTrack = response.data[0];
      } catch (e) {
        console.log(e);
      }
    },

    createUrlForCover(context) {
      if (context) {
        const chunks = context.uri.split(':');
        let route = { name: context.type };

        switch (context.type) {
          case 'playlist':
            Object.assign(route, {
              params: {
                user_id: chunks[2],
                playlist_id: chunks[chunks.length - 1]
              }
            });
            break;

          case 'album':
          case 'artist':
            Object.assign(route, { params: { id: chunks[chunks.length - 1] } });
            break;
        }

        return route;
      } else {
        return {};
      }
    },

    onTrackUpdate(id) {
      this.checkSavedTrack(id);
    }
  }
};
</script>

<style lang="sass">

.current-track
  display: flex
  align-items: center

  // &__cover
  //   width: 300px
  //   min-width: 300px
  //   height: 300px
  //   margin: 0 15px

  &__img
    width: 100%

  &__info
    position: relative
    overflow: hidden
    padding-right: 30px
    white-space: nowrap
    text-overflow: ellipsis

    .track-addition
      position: absolute
      right: 0
      top: 2px

  &__name
    padding-left: 10px
    color: $c-white
    font-size: 18px

    &:hover
      text-decoration: underline

  &__artists
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    padding: 5px 0 0 10px
    font-size: 14px

  &__link
    color: $c-gray

    &:hover
      color: $c-white
      text-decoration: underline
</style>
