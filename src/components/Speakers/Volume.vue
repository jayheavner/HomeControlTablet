<template>
  <vue-slider ref="slider" v-model="volume" v-bind="options" />
</template>

<script>
import { setVolume } from '@/ha-brokers/service';
import vueSlider from 'vue-slider-component';

export default {
  components: {
    vueSlider
  },
  props: {
    speaker: {
      type: Object,
      default() {
        return {};
      }
    },
    entityId: {
      type: String,
      default: ''
    },
    vol: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      value: 0,
      options: {
        lazy: true,
        height: 2,
        dotSize: 25,
        tooltip: false,
        bgStyle: {
          backgroundColor: 'rgba(255, 155, 155, 0.3)'
        },
        sliderStyle: {
          backgroundColor: 'white'
        }
      }
    };
  },
  computed: {
    volume: {
      get() {
        return Math.floor(this.value * 100);
      },
      set(volume) {
        this.value = volume / 100;
      }
    }
  },
  watch: {
    vol: {
      handler(volume) {
        this.value = volume;
      }
    },
    value: {
      handler(volume) {
        var v = Math.floor(this.vol * 100) / 100;
        if (!(this.vol == volume || v == volume)) {
          setVolume(this.speaker, volume);
        }
      }
    }
  },
  mounted() {
    this.value = this.vol;
  }
};
</script>
