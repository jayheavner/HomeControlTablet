<template>
  <div>
    <section
      v-for="(zone, index) in zoneNames"
      :key="index"
    >
      <div>{{ zone }}</div>
    </section>
    <div class="tile is-ancestor">
      <section
        v-for="(zone, index) in zones"
        :key="zone.uuid"
      >
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">
              {{ zone.coordinator.roomName }}
            </p>
            <p class="subtitle">
              <sonos-track :track="zone.coordinator.state.currentTrack" />
            </p>
          </article>
        </div>

        <pre><code>{{ JSON.stringify(zone, null, 4) }}</code></pre>
      </section>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SonosTrack from './Track';
export default {
  name: 'SonosZones',
  components: {
    SonosTrack
  },
  computed: {
    ...mapState('sonosZone', { zones: 'zones' }),
    ...mapGetters({
      zoneNames: 'sonosZone/getZoneNames'
    }),
  },
};
</script>
