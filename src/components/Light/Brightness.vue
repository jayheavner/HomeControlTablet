<template>
  <section v-if="show">
    <div
      class="columns is-mobile is-centered has-text-centered has-margin-bottom-12"
    >
      <div class="column is-3 has-text-centered">
        <vue-slider ref="slider" v-model="value" v-bind="options" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import vueSlider from 'vue-slider-component';
import { setBrightness } from '@/ha-brokers/service';

export default {
  components: {
    vueSlider
  },
  props: {
    id: String
  },
  data() {
    return {
      value: 0,
      options: {
        direction: 'vertical',
        data: null,
        eventType: 'auto',
        width: 20,
        height: 150,
        dotSize: 0,
        dotHeight: 15,
        dotWidth: 25,
        min: 0,
        max: 255,
        interval: 1,
        show: true,
        speed: 0.5,
        disabled: false,
        piecewise: false,
        usdKeyboard: false,
        enableCross: true,
        piecewiseLabel: false,
        tooltip: 'false',
        tooltipDir: 'left',
        reverse: false,
        clickable: true,
        realTime: false,
        lazy: true,
        formatter: function(value) {
          return Math.round(value / 2.55);
        },
        bgStyle: {
          backgroundColor: '#aaa',
          boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)',
          '-webkit-appearance': 'none',
          '-webkit-border-radius': '0px'
        },
        sliderStyle: {
          backgroundColor: '#3498db',
          '-webkit-appearance': 'none',
          '-webkit-border-radius': '0px'
        },
        tooltipStyle: {
          backgroundColor: '#3498db',
          borderColor: '#3498db'
        },
        processStyle: {
          backgroundImage: '-webkit-linear-gradient(top, #4c77dd, #92e4dd)',
          '-webkit-appearance': 'none',
          '-webkit-border-radius': '0px'
        },
        piecewiseActiveStyle: {
          backgroundColor: 'blue'
        },
        labelStyle: {
          backgroundColor: 'cyan'
        },
        labelActiveStyle: {
          backgroundColor: '#f3f3f3'
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      lights: 'Light/getLights'
    }),
    light() {
      return this.lights.find(l => l.entity_id === this.id);
    },
    show() {
      return this.light.isDimmable && this.light.state === 'on';
    },
    brightness() {
      if (this.light.isDimmable && this.light.brightness !== undefined)
        return this.light.brightness;
      else return 0;
    }
  },
  watch: {
    value: {
      handler(brightness) {
        if (this.brightness != brightness)
          setBrightness(this.light, brightness);
      }
    }
  },
  mounted() {
    this.value = this.brightness;
  },
  methods: {}
};
</script>

<style scoped lang="sass"></style>
