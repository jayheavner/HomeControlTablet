<template>
  <section>
    <button
      class="button is-large is-fullwidth"
      :class="classObject"
      @click="togglePower()"
    >
      {{ light.state }}
    </button>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { on, off } from '@/api/ha/light';
import { turnOn, turnOff } from '@/ha-brokers/service';

export default {
  name: 'LightPower',
  props: {
    id: { type: String, default: '' }
  },
  computed: {
    ...mapGetters({
      lights: 'Light/getLights'
    }),
    light() {
      let light = this.lights.find(l => l.entity_id === this.id);
      return light;
    },
    power() {
      return this.light.state === 'on' ? true : false;
    },
    classObject() {
      return this.power ? 'is-info' : 'is-light';
    }
  },
  methods: {
    async togglePower() {
      if (!this.power) {
        var c = await on(this.id);
        debugger;
      } else {
        var c = await off(this.id);
        debugger;
      }
    }
  }
};
</script>

<style scoped lang="sass"></style>
