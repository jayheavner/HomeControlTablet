<template>
  <section v-if="speakersisLoading">
    <span>loading...</span>
  </section>
  <section v-else>
    <div class="columns">
      <div class="column is-offset-1 has-text-light has-padding-top-25">
        <div class="is-size-2">
          speakers
        </div>
      </div>
    </div>
    <section class="container">
      <div class="columns is-fullheight is-multiline">
        <div
          v-for="(speaker, index) in speakers"
          :key="speaker.entity_id"
          class="column is-one-third"
          :speaker="speaker"
          :index="index"
        >
          <power :speaker="speaker" />

          <volume
            v-if="speaker.power === 'on'"
            class="has-margin-top-20"
            :speaker="speaker"
            :entity_id="speaker.entity_id"
            :vol="speaker.volume"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex';
import Volume from './Volume';
import Power from './Power';

export default {
  name: 'MusicSidebar',
  components: { Volume, Power },
  computed: {
    ...mapState('speakers', ['speakers']),
    ...mapState('speakers', { speakersisLoading: 'isLoading' }),
    ...mapState('speakers', { speakersError: 'error' }),
    ...mapGetters({
      //      speakers: 'music/getSpeakers',
      loaded: 'homeassistant/getIsConnected'
    })
  },
  mounted() {
    this.initSpeakers();
    console.log(this.speakers);
  },
  methods: {
    ...mapActions({
      initSpeakers: 'speakers/initialize',
      setSources: 'music/setSources'
    })
  }
};
</script>

<style scoped lang="sass">
.container
  padding:
    left: 32px
    right: 32px
</style>
