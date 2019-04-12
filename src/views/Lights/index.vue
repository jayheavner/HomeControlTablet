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
          class="column is-one-third has-text-centered"
        >
          <brightness :id="id" />

          <power :id="id" />
          <name :id="id" class="has-text-light" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { buildList } from '@/utils';
import { LightModel, ZoneModel } from '@/models';

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
      return '';
      const numLights = this.selectedZone.entities.length;
      if (numLights % 3 === 0) return 'is-one-third';
      else if (numLights % 4 === 0) return 'is-one-quarter';
      else return 'is-one-fifth';
      //else if (numLights % 5 === 0) return "is-one-fifth";
    }
  },
  mounted() {
    this.initializeLights();
  },
  methods: {
    ...mapActions({
      initLights: 'Light/initialize'
    }),
    async initializeLights() {
      // const all = await api.ha.getStates();
      // const zones = this.buildList(ZoneModel, await api.ha.getState('group.lights_view'), all);

      // const lights = this.buildList(LightModel, await api.ha.getState('group.house_lights'), all);

      // const lights = buildList(LightModel, all.data, 'group.house_lights');
      // const zones = buildList(ZoneModel, all.data, 'group.lights_view');

      await this.initLights();
      console.log(this.lights);
    },
    buildList(type, entities, allEntities) {
      let list = [];
      entities.data.attributes.entity_id.forEach(entity => {
        const result = allEntities.data.find(all => all.entity_id === entity);
        var o = new type(result);
        list.push(o);
      });
      return list;
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
