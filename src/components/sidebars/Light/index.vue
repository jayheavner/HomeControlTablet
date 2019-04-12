<template>
  <section v-if="!loaded">
    <span>loading...</span>
  </section>
  <section v-else>
    <div class="columns">
      "
      <div class="column is-offset-1 has-text-light has-padding-top-25">
        <div class="is-size-2">
          lights
        </div>
        <div class="is-size-4 has-margin-left-25">
          {{ selectedZone.name }}
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        v-for="zone in zones"
        v-show="!isActive(zone)"
        :key="zone.entity_id"
        class="column"
      >
        <button
          class="button is-dark is-inverted is-outlined is-large is-fullwidth"
          @click="selectZone(zone)"
        >
          <span>{{ zone.name }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LightSidebar',
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted: function() {},
  computed: {
    ...mapGetters({
      zones: 'Light/getZones',
      selectedZone: 'Light/getSelectedZone',
      loaded: 'homeassistant/getIsConnected'
    })
  },
  methods: {
    ...mapActions({
      changeZone: 'Light/changeZone'
    }),
    isActive(z) {
      return z.entity_id === this.selectedZone.entity_id;
    },
    selectZone(zone) {
      this.changeZone(zone.entity_id).then(
        response => {
          console.log(`Changing light zone to ${zone.name}`);
        },
        err => {}
      );
    }
  }
};
</script>
