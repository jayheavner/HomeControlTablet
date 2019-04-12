<template>
  <div class="callback">
    Callback
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SpotifyCallback',
  mounted() {
    debugger;
    this.setAccessToken(this.$route.query.access_token).then(token => {
      this.$router.push({ name: 'music' });
    });
    this.setRefreshToken(this.$route.query.refresh_token);
    this.setExpiry(this.$route.query.expires_in);
    // var data = {
    //   access_token: this.$route.query.access_token,
    //   refresh_token: this.$route.query.refresh_token,
    //   expires_in: this.$route.query.expires_in,
    //   scope: this.$route.query.scope
    // };
    // this.$auth.handleAuthentication(data).then(token => {
    //   this.$router.push({ name: "music" });
    // });
  },
  methods: {
    ...mapActions({
      setAccessToken: 'spotifyAuth/setAccessToken',
      setRefreshToken: 'spotifyAuth/setRefreshToken',
      setExpiry: 'spotifyAuth/setExpiryTime'
    })
  }
};
</script>