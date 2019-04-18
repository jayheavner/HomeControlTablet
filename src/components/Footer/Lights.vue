<template>
  <nav class="navbar opaque-dark is-fixed-bottom">
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item">
        <icon name="regular/arrow-alt-circle-left" scale="2.2" />
      </router-link>
    </div>
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
import { mapGetters } from 'vuex';

export default {
  name: 'LightSidebar',
  computed: {
    ...mapGetters({
      zones: 'Light/getZones'
    })
  },
  created() {
    console.log(`light zones ? ${JSON.stringify(this.zones, null, 2)}`);
  }
};
</script>

<style scoped lang="sass">

.navbar-brand
  margin-left: .75rem!important

.navbar-start
  width: 100%
  justify-content: space-around

a
  color: white
  text-decoration: none

  &.router-link-exact-active
    background-color: white
    color: $c-shark

// .fa-icon
//   height: 28px
//   width: 28px

.navbar-item
  font-size: 1.3em
</style>
