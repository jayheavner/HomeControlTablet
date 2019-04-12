<template>
  <div class="container">
    <div v-if="!!playlists.length" class="playlists-table">
      <div class="playlists-table__row playlists-table__row--header">
        <div class="playlists-table__cell playlists-table__cell--image">
          Image
        </div>

        <div class="playlists-table__cell playlists-table__cell--name">
          Title
        </div>

        <div class="playlists-table__cell playlists-table__cell--tracks">
          Tracks
        </div>
      </div>

      <div
        v-for="(item, index) in playlists"
        :key="index"
        :data-id="item.id"
        class="playlists-table__row"
      >
        <router-link
          tag="div"
          class="playlists-table__cell"
          :to="{ name: 'playlist', params: { playlist_id: item.id } }"
        >
          <div class="playlists-table__cell playlists-table__cell--image">
            <img :src="getImage(item.images)" />
          </div>

          <div class="playlists-table__cell playlists-table__cell--name">
            {{ item.name }}
          </div>

          <div class="playlists-table__cell playlists-table__cell--tracks">
            {{ item.tracks.total }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistsTable',

  components: {},

  props: {
    playlists: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      playlistsUris: '',
      playlistsIds: ''
    };
  },

  methods: {
    getImage(images) {
      try {
        return images[1].url;
      } catch ({ error }) {
        if (images[0] !== undefined) return images[0].url;
      }
    }
  }
};
</script>

<style lang="sass">

.playlists-table
  display: flex
  flex-flow: column
  padding: 0 15px 20px
  width: 800px

  &__link
    color: $c-white

    &:hover
      text-decoration: underline

  &__row
    position: relative
    display: flex
    min-height: 40px
    padding: 5px
    color: $c-white
    font-size: 13px
    line-height: 15px
    border-bottom: 1px solid $c-mine-shaft

    &:hover
      &:not(:first-of-type)
        background: $c-mine-shaft
        color: $c-white
        cursor: pointer


    &--header
      color: $c-gray
      text-transform: uppercase

  &__cell
    display: flex
    flex: 1
    align-items: center
    position: relative
    margin-right: 10px

    img
      height: 100px
      width: 100px
</style>
