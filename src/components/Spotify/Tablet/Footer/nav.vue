<template>
  <div>
    <nav class="level">
      <router-link :to="{ name: 'home' }" class="level-item">
        <icon name="home" />
        Home
      </router-link>

      <router-link :to="{ name: 'spotify-speakers' }" class="level-item">
        <icon name="music" />
        Rooms
      </router-link>

      <router-link :to="{ name: 'spotify-search' }" class="level-item">
        <icon name="search" />
        Search
      </router-link>

      <router-link :to="{ name: 'spotify-browse' }" class="level-item">
        <icon name="compass" />
        Browse
      </router-link>

      <router-link :to="{ name: 'spotify-library' }" class="level-item">
        <icon name="archive" />
        Library
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {}
};
</script>

<style scoped lang="sass">

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

.level-item
  font-size: 1.3em
</style>
