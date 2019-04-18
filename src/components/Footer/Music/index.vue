<template>
  <div>
    <!-- <player display="mini" /> -->
    <navigation />
    <player />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navigation from './nav';
import Player from '@/components/Spotify/Player';

export default {
  name: 'SpotifyFooter',

  components: {
    Navigation,
    Player
  },
  mounted() {
    this.setType('micro');
  },
  methods: {
    ...mapActions({
      setType: 'player/setDisplayType'
    })
  }
};
</script>

<style scoped lang="sass"></style>
