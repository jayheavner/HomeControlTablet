<template>
  <div class="container">
    <router-view name="header" class="navbar is-dark is-fixed-top" />
    <router-view />
    <router-view name="footer" class="navbar is-dark is-fixed-bottom" />
  </div>
</template>

<style scoped lang="sass"></style>
