<template>
  <!-- <div id="app">
    <router-view/>
  </div> -->
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const default_layout = 'sidebar';
export default {
  components: {},
  computed: {
    layout() {
      var l = (this.$route.meta.layout || default_layout) + '-layout';
      console.log('Selected layout => ' + l);
      return l;
    }
  },
  created() {
    // nothing defined here (when this.$route.path is other than "/")
    console.log('App.vue (created()) =>' + this.$route.fullPath);
    console.dir(this.$route);
  },
  updated() {
    // something defined here whatever the this.$route.path
    console.log('App.vue (updated()) =>' + this.$route.fullPath);
    console.dir(this.$route);
  }
};
</script>

<style lang="sass">
@import styles/app

// .app
//   display: flex
//   flex-flow: column
//   position: absolute
//   width: 100%
//   min-width: 630px
//   height: 100%
//   background: $c-mine-shaft
</style>
