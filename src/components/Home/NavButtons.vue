<template>
  <section>
    <div class="modal-test">
      <v-modal :modal-name="modalName" :width="width" :height="height">
        <template slot="header">
          Home
        </template>
        <template slot="body">
          <div class="columns is-multiline">
            <div class="column is-6">
              <router-link :to="{ name: 'lights' }">
                <button>
                  <icon name="lightbulb" />&nbsp;<span>Lights</span>
                </button>
              </router-link>
            </div>
            <div class="column is-6">
              <router-link :to="{ name: 'music' }">
                <button><icon name="music" />&nbsp;<span>Music</span></button>
              </router-link>
            </div>
            <div class="column is-6">
              <router-link :to="{ name: 'spotify' }">
                <button><icon name="music" />&nbsp;<span>Spotify</span></button>
              </router-link>
            </div>
            <div class="column is-6">
              <section v-if="loaded">
                <section v-if="state === 'unlocked'">
                  <button onclick="this.blur();" @click="lock()">
                    <icon name="lock" />&nbsp;<span>Lock</span>
                  </button>
                </section>
                <section v-else>
                  <button onclick="this.blur();" @click="unlock()">
                    <icon name="unlock" />&nbsp;
                    <span>Unlock</span>
                  </button>
                </section>
              </section>
            </div>
          </div>
        </template>
        <template slot="footer">
          <div />
        </template>
      </v-modal>
    </div>
  </section>
</template>

<script type="text/javascript">
import VModal from '@/components/Spotify/VModal';

import api from '@/api/ha';

export default {
  name: 'NavButtons',

  components: {
    VModal
  },
  data() {
    return {
      modalName: 'modal-nav-buttons',
      width: '800px',
      height: '800px',
      loaded: false,
      state: ''
    };
  },

  created() {},
  mounted: function() {
    this.getState();
  },
  methods: {
    async getState() {
      const lock = await api.getLockStatus();
      const state = lock.data.state;
      console.log(`lock state > ${state}`);
      this.loaded = true;
      this.state = state;
    },
    lock() {
      api.lockDoor();
    },
    unlock() {
      api.unlockDoor();
    }
  }
};
</script>

<style scoped lang="sass">
button
  font-size: 2rem
  background-image: linear-gradient(to top right, #92e4dd, #4c77dd);
  color: whitesmoke
  display: flex
  width: 100%
  border-color: transparent
  border-radius: 4px
  cursor: pointer
  justify-content: center
  padding-bottom: calc(0.375em - 1px)
  padding-left: 0.75em
  padding-right: 0.75em
  padding-top: calc(0.375em - 1px)
  align-items: center

a:link, a:hover, a:active, button:hover
  text-decoration: none
  color: whitesmoke

footer
</style>
