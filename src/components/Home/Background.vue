<template>
  <section
    class="weather-image"
    :style="{ backgroundImage: `url('${background}')` }"
  >
    <slot />
  </section>
</template>

<script type="text/javascript">
import api from '@/api';
import { subscribe } from '@/mqtt';

export default {
  data() {
    return {
      background: ''
    };
  },

  created() {
    subscribe('dark-sky/current', message => {
      this.background = require(`../../assets/img/weather/${
        JSON.parse(message.toString()).icon
      }.jpg`);
    });
  },

  mounted() {
    api.red.getDailyForecast().then(response => {
      this.background = require(`../../assets/img/weather/${
        response.data.icon
      }.jpg`);
    });
  }
};
</script>

<style scoped lang="sass">

.weather-image
  position: relative
  background-size: cover
  background-position: center
  overflow: hidden
  min-height: 100vh
</style>
