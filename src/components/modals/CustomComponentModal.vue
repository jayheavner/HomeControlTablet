<template>
  <section>
    <div class="columns">
      <div class="column">
        <div class="buttons are-large">
          <router-link :to="{ name: 'lights' }">
            <button class="button is-info">
              <icon name="lightbulb" />&nbsp;<span>lights</span>
            </button>
          </router-link>
          <router-link :to="{ name: 'music' }">
            <button class="button is-link">
              <icon name="music" />&nbsp;<span>music</span>
            </button>
          </router-link>

          <section v-if="loaded">
            <section v-if="state === 'unlocked'">
              <button
                onclick="this.blur();"
                class="button  is-light is-inverted"
                @click="lock()"
              >
                <icon name="lock" />&nbsp;<span>Lock</span>
              </button>
            </section>
            <section v-else>
              <button
                onclick="this.blur();"
                class="button  is-light is-inverted"
                @click="unlock()"
              >
                <icon name="unlock" />&nbsp;
                <span>Unlock</span>
              </button>
            </section>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
import api from '@/api/ha';

export default {
  name: 'NavButtons',
  data() {
    return {
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

a:link, a:hover, a:active
  text-decoration: none
</style>
