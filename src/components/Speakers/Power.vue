<template>
  <button
    onclick="this.blur();"
    :class="classObject"
    class="button is-fullwidth is-large is-inverted"
    @click="togglePower()"
  >
    <span>{{ speaker.name }}</span>
  </button>
</template>

<script>
import { turnOn, turnOff, selectSource } from '@/ha-brokers/service';
import api from '@/api';
import { mapGetters, mapActions } from 'vuex';
import { pluckEntity } from '@/utils';
export default {
  props: {
    speaker: Object
  },
  computed: {
    ...mapGetters('player', {
      playback: 'getPlayback',
      context: 'getPlaybackContext',
      activeDevice: 'activeDevice',
      defaultDevice: 'defaultDevice'
    }),
    ...mapGetters('music', { sources: 'getSources' }),
    classObject() {
      return this.power ? 'is-info' : 'is-dark is-outlined';
    },
    entity_id() {
      return this.speaker.entity_id;
    },
    power() {
      return this.speaker.power === 'on' ? true : false;
    }
  },
  methods: {
    ...mapActions({
      setSources: 'music/setSources'
    }),
    // fun fact. Can't declare these methods with ES6 syntax method and big arrow => and get the value of `this`.
    // https://vuejs.org/v2/guide/instance.html#Data-and-Methods
    togglePower() {
      if (this.power) turnOff(this.entity_id);
      else {
        debugger;
        // this will return all entities affected, so groups and whatnot
        api.ha.powerSpeakerOn(this.entity_id).then(speakers => {
          const speaker = pluckEntity(speakers, this.entity_id);
          const sources = speaker.attributes.source_list;
          this.setSources(sources);

          // This is where it gets more interesting. In addition to powering on, need to check the current state
          // of Spotify and the currently playing device and then take action.
          //
          // States are:
          // 1. Spotify is not playing.
          //    - Set the speaker source to House echo and `connect` Spotify to that device.
          // 2. Spotify is playing on a Monoprice souce.
          //    - Prompt to `join` that source
          // 3. Spotify is playing on a non-Monoprice source (eg cellphone)
          //    - Prompt to transfer. Follow same flow as #1
          const playback = this.playback;
          const activeDevice = this.activeDevice;
          const defaultDevice = this.defaultDevice;
          const device = activeDevice || defaultDevice;
          if (playback === undefined) {
            return;
            // Spotify isn't playing
          } else {
            const currentDevice = playback.device;
            // if the speaker source matches the Spotify device we don't need to do any of these checks
            if (speaker.attributes.source !== currentDevice.name) {
              if (this.sources.includes(currentDevice.name)) {
                // Spotify is connected to a Monoprice device, we can set the Monoprice speaker to it
                selectSource(this.entity_id, currentDevice.name);
              } else {
                // Spotify is playing elsewhere. Need to prompt but for now I'll just force it through
                debugger;
                api.ha
                  .setSpeakerSource(this.entity_id, 'House Echo')
                  .then(sss => {
                    const response = api.spotify.player.transferPlayback(
                      defaultDevice.id,
                      true
                    );
                  });
              }
            }
          }
          if (!playback.isPlaying) {
            // music is paused, need to initiate play
            const response = api.spotify.player.play(device.id);
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="sass">
button
      &.is-dark.is-inverted.is-outlined
        &:hover,
        &:focus
          background-color: transparent
          color: #fff
</style>
