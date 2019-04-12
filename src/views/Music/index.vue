<template>
  <div class="app-layout">
    <navbar />

    <div v-if="tracks" class="tracks-list">
      <div
        v-for="(item, index) in tracks"
        :key="index"
        class="tracks-list__row"
      >
        <div v-if="item.album" class="tracks-list__cell">
          <img
            class="tracks-list__img"
            :src="item.album.images[2].url"
            :alt="item.album.name"
          />
        </div>

        <div class="tracks-list__cell tracks-list__cell--name">
          {{ item.name }}
          <span v-if="item.artists && showArtists">
            &nbsp;-&nbsp;
            <router-link
              v-for="(artist, index) in item.artists"
              :key="artist.id"
              :to="{ name: 'artist', params: { id: artist.id } }"
              class="tracks-list__link"
            >
              {{ artist.name }}
              <template v-if="index !== item.artists.length - 1">
                ,&nbsp;
              </template>
            </router-link>
          </span>
        </div>

        <div
          v-if="item.explicit"
          class="tracks-list__cell tracks-list__cell--explicit"
        >
          <span class="tracks-list__explicit-label">
            Explicit
          </span>
        </div>
      </div>
    </div>

    <!-- <navbar/> -->
    <sonos-zones />
    <!-- <sonos-player :sonos-transport-state="sonosTransportState" /> -->
    <!-- <player-controls :sonos-transport-state="sonosTransportState" /> -->
    <div class="app-layout__wrap">
      <!-- <sidebar/> -->
      <sonosplayer :track="track" />
      <div class="app-layout__main">
        <router-view />
      </div>
    </div>
    <player />
  </div>
</template>

<script>
import Navbar from '@/components/Spotify/Navbar';
import { mapActions, mapGetters, mapState } from 'vuex';
// import SpotifyWebApi from "spotify-web-api-node";
import api from '@/api';
import { subscribe } from '@/mqtt';
//const mqtt = mqttService.getInstance();

// const spotify = new SpotifyWebApi();
// const token = localStorage.getItem("access_token");
// spotify.setAccessToken(token);

// import Navbar from "@/components/Spotify/Navbar";
// import Sidebar from "@/components/Spotify//Sidebar";
import SonosZones from '@/components/Sonos/Zone';
// import SonosPlayer from '@/components/Sonos/SonosPlayer';
// import PlayerControls from '@/components/Sonos/PlayerControls';
import Player from '@/components/Spotify/Player';

export default {
  name: 'MusicView',
  components: {
    Navbar,
    SonosZones,
    // SonosPlayer,
    // PlayerControls,
    // Navbar,
    // Sidebar,
    Player
  },
  data() {
    return {
      search: '',
      tracks: {}
    };
  },
  computed: {
    ...mapState('sonosZone', ['zones']),
    ...mapState('player', { devicesLoaded: 'isLoading' }),
    ...mapState('player', ['isLoading']),
    ...mapGetters({
      zoneNames: 'sonosZone/getZoneNames',
      defaultDevice: 'player/defaultDevice',
      acticeDevice: 'player/activeDevice'
    }),
    isLoad() {
      console.log(`isLoading computed > ${this.devicesLoaded}`);
      return this.devicesLoaded;
    }
  },
  methods: {
    ...mapActions({
      sonosCallbackInit: 'sonosTransportState/initialize',
      sonosZonesInit: 'sonosZone/initialize',
      init: 'player/initialize',
      setPlayback: 'player/setPlayback'
      // getAlbums: 'library/load'
    }),
    async searchSpotify() {
      const results = await api.spotify.search.search(this.search);
      if (results.data === '') {
        //nothing happening on Spotify
      }
      this.tracks = results.data;
    }
  },
  watch: {
    devicesLoaded: {
      handler(val) {
        console.log(`devicesLoaded watch hit with val = ${val}`);
      }
    },
    isLoad: {
      handler(val) {
        console.log('isLoad watch hit');
      }
    },
    search(val) {
      this.searchSpotify();
    }
  },
  mounted() {
    this.init();
    return;
    // eslint-disable-next-line no-unreachable
    console.log('WTF!!!!!');
    debugger;
    this.getAlbums();
    return;
    this.sonosCallbackInit();
    this.sonosZonesInit().then(z => {
      const zones = this.zones;
      console.dir(zones);
      console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
      const names = this.zoneNames;
      console.log(names);
    });
    // eslint-disable-next-line no-unreachable
    subscribe('music/sonos/event', (data, params) => {
      console.dir(JSON.parse(data.toString()));
      this.sonosTransportState = JSON.parse(data.toString());
    });
    // eslint-disable-next-line no-unreachable
    return;
    api.sonos.zones.get().then(z => console.log(z));
    api.spotify.getMe().then(u => {
      debugger;
      console.log(u);
    });

    // eslint-disable-next-line no-unreachable
    this.setPlayback();
  }
};
</script>

<style scoped lang="sass">

.app-layout
  position: relative
  display: flex
  flex-flow: column
  flex-grow: 1
  color: $c-white

  &__wrap
    display: flex
    flex-flow: row
    flex-grow: 1
    background: $c-shark-dark

  &__main
    flex-grow: 1
    max-height: calc(100vh - 130px)
    overflow-y: auto

  .sidebar
    width: 220px
    min-width: 220px
</style>
