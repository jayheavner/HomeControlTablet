<template>
  <div v-scroll class="container">
    <section v-if="!loaded">
      <span>loading...</span>
    </section>
    <section v-else>
      <div class="columns is-multiline has-margin-top-50">
        <div
          v-for="(id, index) in selectedZone.entities"
          :key="index"
          :class="computeColumns"
          class="column has-text-centered"
        >
          <power :id="id" />
          <brightness :id="id" />
          <name :id="id" class="has-text-light" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Brightness from '@/components/Light/Brightness';
import Power from '@/components/Light/Power';
import Name from '@/components/Light/Name';

import api from '@/api';

export default {
  name: 'LightView',
  components: {
    Brightness,
    Power,
    Name
  },
  data() {
    return {
      errored: false
    };
  },
  computed: {
    ...mapGetters({
      lights: 'Light/getLights',
      zones: 'Light/getZones',
      selectedZone: 'Light/getSelectedZone',
      loaded: 'homeassistant/getIsConnected'
    }),
    computeColumns() {
      const numLights = this.selectedZone.entities.length;
      if (numLights < 6 || numLights % 3 === 0) return 'is-one-third';
      else if (numLights % 4 === 0) return 'is-one-quarter';
      else return 'is-one-fifth';
    }
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.initializeLights(this.$route.params.id);
      }
    },
    loaded: {
      handler(value) {
        debugger;
      }
    }
  },
  mounted() {
    console.log(`loading lights for ${this.$route.params.id}`);
    this.initializeLights(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      initLights: 'Light/initialize'
    }),
    async initializeLights(zone) {
      await this.initLights(zone);
      console.log(this.lights);
    },
    getState(light) {
      return light.power ? 'is-info' : 'is-light';
    },
    isActive(zone) {
      return zone.name == this.selected ? 'is-active' : '';
    },
    selectZone(zone) {
      this.zone = zone;
      this.selected = zone.name;
    },
    toggleLight: function(light) {
      if (light.power) {
        light.brightness = 0;
        api.postTurnOffLight(light.entity_id);
      } else {
        api.postTurnOnLight(light.entity_id);
      }

      //this.getState((light.power = !light.power));
    },
    navClicked: function() {},
    calcStep: light => {
      if (light.is_dimmable) return 5;
      else {
        return 50;
      }
    }
  }
};
</script>

<style scoped lang="sass">

.columns
  margin:
    left: 0
    right: 0
</style>
