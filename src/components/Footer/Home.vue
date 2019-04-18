<template>
  <nav class="navbar opaque-dark is-fixed-bottom is-transparent">
    <div class="navbar-menu">
      <div class="navbar-start is-expanded">
        <router-link :to="{ name: 'lights' }" class="navbar-item">
          <icon name="home" />
          Lights
        </router-link>

        <router-link :to="{ name: 'music' }" class="navbar-item">
          <icon name="music" />
          Music
        </router-link>

        <router-link :to="{ name: 'spotify-search' }" class="navbar-item">
          <icon name="search" />
          Travel
        </router-link>

        <router-link :to="{ name: 'spotify-browse' }" class="navbar-item">
          <icon name="compass" />
          Weather
        </router-link>

        <router-link :to="{ name: 'spotify-library' }" class="navbar-item">
          <icon name="archive" />
          Status
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
  &:hover
    color: white

.fa-icon
  padding-right: 5px

.navbar-item
  font-size: 1.3em
</style>
