<template>
  <div>RefreshToken</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SpotifyRefreshToken',
  mounted() {
    debugger;
    this.setAccessToken(this.$route.query.access_token).then(token => {
      this.$router.push({ name: 'music' });
    });
    this.setExpiry(this.$route.query.expires_in);
  },
  methods: {
    ...mapActions({
      setAccessToken: 'spotifyAuth/setAccessToken',
      setExpiry: 'spotifyAuth/setExpiryTime'
    })
  }
};
</script>