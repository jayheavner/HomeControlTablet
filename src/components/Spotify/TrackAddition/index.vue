<template>
  <div class="track-addition">
    <button
      v-if="!isSaved"
      class="track-addition__button"
      title="Save to your library"
      @click="saveTrack"
    >
      <icon name="plus" />
    </button>
    <button
      v-if="isSaved"
      class="track-addition__button track-addition__button--remove"
      title="Remove from your library"
      @click="removeTrack"
    >
      <icon class="track-addition__check-icon" name="check" />
      <icon class="track-addition__times-icon" name="times" />
    </button>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TrackAddition',

  components: {},

  props: {
    trackId: {
      type: String,
      required: true
    },
    isSaved: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters('library', {
      savedTrack: 'getSavedTrack',
      removedTrack: 'getRemovedTrack'
    })
  },

  watch: {
    savedTrack(val) {
      if (val === this.trackId) {
        this.$emit('updateTrackstatus', val);
      }
    },

    removedTrack(val) {
      if (val === this.trackId) {
        this.$emit('updateTrackstatus', val);
      }
    }
  },

  methods: {
    ...mapActions('library', {
      saveLastTrack: 'saveTrack',
      removeLastTrack: 'removeTrack'
    }),

    async saveTrack() {
      try {
        await api.spotify.library.saveTracks([this.trackId]);
        this.saveLastTrack(this.trackId);
      } catch (e) {
        console.log(e);
      }
    },

    async removeTrack() {
      try {
        await api.spotify.library.removeTracks([this.trackId]);
        this.removeLastTrack(this.trackId);
        this.$emit('savedTrackRemove', this.trackId);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="sass">

.track-addition
  display: inline-block
  line-height: 0

  &__times-icon
    display: none

  &__button
    background: none
    border: 0
    color: $c-gray
    outline: none

    &:hover
      color: $c-white

    &--remove
      &:hover
        .track-addition__check-icon
          display: none

        .track-addition__times-icon
          display: block

  .fa-icon
    width: 16px
    height: 16px
</style>
