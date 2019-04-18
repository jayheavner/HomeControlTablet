<template>
  <nav class="navbar opaque-dark is-fixed-bottom">
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item">
        <icon name="regular/arrow-alt-circle-left" scale="2.2" />
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start is-expanded">
        <router-link :to="{ name: 'spotify-speakers' }" class="navbar-item">
          Rooms
        </router-link>

        <router-link :to="{ name: 'spotify-search' }" class="navbar-item">
          Search
        </router-link>

        <router-link :to="{ name: 'spotify-browse' }" class="navbar-item">
          Browse
        </router-link>

        <router-link :to="{ name: 'spotify-library' }" class="navbar-item">
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
  padding-right: 5px

.navbar-item
  font-size: 1.3em
</style>
