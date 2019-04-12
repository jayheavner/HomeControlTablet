<template>
  <div class="callback">
    Callback
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SpotifyLogout',
  methods: {
    ...mapActions({
      logout: 'spotifyAuth/logout'
    })
  },
  mounted() {
    debugger;
    this.logout().then(data => {
      debugger;
      this.$router.push({ name: 'home' });
    });
  }
};
</script>
