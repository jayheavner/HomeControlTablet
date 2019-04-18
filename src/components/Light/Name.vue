<template>
  <div class="has-text-light is-size-4">
    {{ name }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LightName',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      lights: 'Light/getLights'
    }),
    name() {
      let light = this.lights.find(l => l.entity_id === this.id);
      if (light !== undefined && light.name !== undefined) return light.name;
      else return '';
    }
  }
};
</script>

<style scoped lang="sass"></style>
