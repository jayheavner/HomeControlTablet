<template>
  <background class="home">
    <div class="columns is-centered is-vcentered" style="width:100%">
      <div class="column is-5 has-text-white">
        <clock class="is-size-4" display-date format-date="dddd, MMM Do" />
        <clock class="is-size-1" display-time />
      </div>
      <div class="column is-offset-1 is-4 has-text-white" @click="showWeather">
        <weather template="summary" icon-color="white" class="opaque-light" />
      </div>
    </div>
    <!-- <lock /> -->
  </background>
  <!-- <nav-buttons /> -->
</template>

<script>
import Background from '@/components/Home/Background';
import Clock from '@/components/Clock';
import Weather from '@/components/Home/Weather';
//import Lock from '@/components/Lock';
// import NavButtons from '@/components/Home/NavButtons.vue';

export default {
  components: {
    Background,
    Clock,
    Weather
    //Lock,
    // NavButtons
  },
  methods: {
    // showNavButtons() {
    //   this.$modal.show('modal-nav-buttons');
    // },
    showWeather() {
      debugger;
    }
  }
};
</script>

<style scoped lang="sass">

.home
  display: flex
  justify-content: center
</style>
