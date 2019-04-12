<template>
  <nav class="navbar">
    <navbar-history />
    <navbar-search />
    <Library />
  </nav>
</template>

<script>
import NavbarHistory from './NavbarHistory';
import NavbarSearch from './NavbarSearch';
import Library from './Library';
export default {
  name: 'Navbar',

  components: {
    NavbarHistory,
    NavbarSearch,
    Library
  }
};
</script>

<style scoped lang="sass">

.navbar
  display: flex
  height: 60px
  background: $c-shark

  .navbar-history
    display: flex
    margin-left: 6px

  .navbar-search
    display: flex
    align-items: center
    margin-left: 10px

  .navbar-nav
    margin: auto 30px auto auto
</style>
