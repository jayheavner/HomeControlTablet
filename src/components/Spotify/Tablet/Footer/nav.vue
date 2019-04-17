<template>
  <nav class="navbar opaque-dark is-fixed-bottom">
    <div class="navbar-menu">
      <div class="navbar-start is-expanded">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          <icon name="home" />
          Home
        </router-link>

        <router-link :to="{ name: 'spotify-speakers' }" class="navbar-item">
          <icon name="music" />
          Rooms
        </router-link>

        <router-link :to="{ name: 'spotify-search' }" class="navbar-item">
          <icon name="search" />
          Search
        </router-link>

        <router-link :to="{ name: 'spotify-browse' }" class="navbar-item">
          <icon name="compass" />
          Browse
        </router-link>

        <router-link :to="{ name: 'spotify-library' }" class="navbar-item">
          <icon name="archive" />
          Library
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  components: {},
  methods: {}
};
</script>

<style scoped lang="sass">

.navbar-start
  width: 100%
  justify-content: space-around

a
  color: white
  text-decoration: none

  &.router-link-exact-active
    background-color: white
    color: $c-shark

.fa-icon
  height: 20px
  width: 20px
  padding-right: 5px

.navbar-item
  font-size: 1.3em
</style>
