<template>
  <div>
    <section v-if="loading">
      hang tight
    </section>
    <section v-else>
      <img :src="albumArt" />
      <div>{{ track.artist }}</div>
      <div>{{ track.title }}</div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import api from '@/api';
// import parse from 'url-parse';
export default {
  props: {
    track: Object
  },
  data() {
    return {
      spotifyTrackInfo: {},
      loading: false
    };
  },
  computed: {
    ...mapState('track', { spotiftyTrack: 'track' }),
    ...mapState('sonosZone', { sonosZones: 'zones' }),
    ...mapState('sonosTransportState', { sonosTransport: 'transport' }),
    ...mapGetters({
      albumArt: 'track/getAlbumImage300'
    })
  },
  watch: {
    spotifyTrack: {
      handler() {
        debugger;
      }
    },
    sonosZones: {
      handler() {
        debugger;
      }
    },
    sonosTransport: {
      handler() {
        debugger;
      }
    }
  },
  // computed: {
  //   trackId () {
  //     const parsed = spotifyUri.parse(this.track.uri);
  //     const url = new parse(this.track.uri);
  //     const path = url.pathname.split('%3a');
  //     return path[2];
  //     console.log(id);
  //     console.log(`%c ${parsed}`, 'background: #222; color: #bada55');
  //     console.log(`%c ${url}`, 'background: #222; color: #bada55');

  //     return id;
  //   },
  // },
  created() {
    debugger;
    this.check();
    //this.getSpotifyTrackInfo();
  },
  methods: {
    async check() {
      const me = await api.spotify.player.get();
      if (me.data === '') {
        //nothing happening on Spotify
      }

      console.log(`me > ${me}`);
      const playing = await api.spotify.player.currentlyPlaying();
      console.log(`playing > ${playing}`);
      debugger;
    },
    async getSpotifyTrackInfo() {
      this.loading = true;
      const trackInfo = await api.spotify.track.get(this.trackId);
      const data = trackInfo.data;
      console.dir(`background: yellow; color: green ${data}`);
      this.loading = false;
      this.spotifyTrackInfo = data;
      return data;
    }
    // albumArt () {
    //   console.log('Trying to pull album art from spotify track object');
    //   const images = this.spotifyTrackInfo.album.images;
    //   const image = images.find(image => image.height === 300);
    //   return image.url;
    // }
  }
};
</script>
