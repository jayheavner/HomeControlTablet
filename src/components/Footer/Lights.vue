<template>
  <nav class="navbar opaque-dark is-fixed-bottom">
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link
          v-for="(zone, index) in zones"
          :key="index"
          class="navbar-item"
          :to="{ name: 'light', params: { id: zone.entity_id } }"
        >
          {{ zone.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LightSidebar',
  // components: {},
  // props: {},
  // data() {
  //   return {
  //     selectedLightZone: null
  //   };
  // },
  created() {
    console.log(`light zones ? ${JSON.stringify(this.zones, null, 2)}`);
  },
  // mounted: function() {
  //   this.selectedLightZone = this.$route.params.id;
  //   if (this.loaded) {
  //     debugger;
  //   } else {
  //     debugger;
  //   }
  //   console.log(`Selected Light Zone > ${this.selectedLightZone}`);
  //   console.log(
  //     `STORE Selected Light Zone > ${JSON.stringify(
  //       this.selectedZone,
  //       null,
  //       2
  //     )}`
  //   );
  // },
  computed: {
    ...mapGetters({
      zones: 'Light/getZones'
      // selectedZone: 'Light/getSelectedZone',
      // loaded: 'homeassistant/getIsConnected'
    })
  }
  // watch: {
  //   zones: {
  //     handler(zones) {
  //       debugger;
  //       this.selectZone(this.selectedLightZone);
  //     }
  //   }
  // },

  // methods: {
  //   ...mapActions({
  //     changeZone: 'Light/changeZone'
  //   }),
  //   isActive(z) {
  //     return z.entity_id === this.selectedZone.entity_id;
  //   },
  //   selectZone(zone) {
  //     this.changeZone(zone.entity_id).then(
  //       response => {
  //         console.log(`Changing light zone to ${zone.name}`);
  //       },
  //       err => {}
  //     );
  //   }
  // }
};
</script>

<style scoped lang="sass">

.navbar-start
  width: 100%
  justify-content: space-around

a
  color: white
  text-decoration: none

  &.router-link-exact-active
    background-color: white
    color: $c-shark

.fa-icon
  height: 20px
  width: 20px
  padding-right: 5px

.navbar-item
  font-size: 1.3em
</style>
