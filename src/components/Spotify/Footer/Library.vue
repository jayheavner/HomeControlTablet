<template>
  <div class="level navbar-library">
    <h2 class="navbar-library__title">
      Library
    </h2>
    <ul class="navbar-library__list">
      <router-link
        tag="li"
        class="navbar-library__item"
        to="/library/tracks"
        exact
      >
        Songs
      </router-link>
      <router-link
        tag="li"
        class="navbar-library__item"
        to="/library/albums"
        exact
      >
        Albums
      </router-link>
      <router-link
        tag="li"
        class="navbar-library__item"
        to="/library/artists"
        exact
      >
        Artists
      </router-link>
      <router-link
        tag="li"
        class="navbar-library__item"
        to="/library/playlists"
        exact
      >
        Playlists
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavbarLibrary',

  methods: {
    onNextClick() {
      this.$router.forward();
    },

    onPrevClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="sass">

.navbar-library
  padding:
    left: 10px
    right: 10px
  color: $c-gray
  font-size: 14px

  &__title
    padding-left: 23px
    font:
      size: 1.22rem
      weight: normal
    text-transform: uppercase
    letter-spacing: 1px

  &__list
    li
      display: inline

  &__item
    position: relative
    margin-bottom: 10px
    padding:
      left: 23px
      right: 20px
    cursor: pointer

    &:hover
      color: $c-white

    &--active
      color: $c-white

      &:before
        position: absolute
        left: 0
        height: 100%
        border-left: 4px solid $c-green
        content: ''

  &__playing-icon
    position: absolute
    right: 3px
    top: 0
    color: $c-white
    outline: none
</style>
