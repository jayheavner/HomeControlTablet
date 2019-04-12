<template>
  <div v-if="loaded">
    <icon name="unlock" />
    <icon name="lock-open" />
    <icon name="lock" />
    <h1>{{ state }}</h1>
    <button
      onclick="this.blur();"
      :class="classObject"
      class="button is-fullwidth is-inverted"
      @click="lock()"
    >
      <span>Lock api</span>
    </button>

    <button
      onclick="this.blur();"
      :class="classObject"
      class="button is-fullwidth is-inverted"
      @click="unlock()"
    >
      <span>Unlock api</span>
    </button>
    <button
      onclick="this.blur();"
      :class="classObject"
      class="button is-fullwidth is-inverted"
      @click="lockWS()"
    >
      <span>Lock ws</span>
    </button>

    <button
      onclick="this.blur();"
      :class="classObject"
      class="button is-fullwidth is-inverted"
      @click="unlockWS()"
    >
      <span>Unlock ws</span>
    </button>
  </div>
  <div v-else>
    loading
  </div>
</template>

<script>
import { lock, unlock } from '@/ha-brokers/service';
import api from '@/api/ha';

export default {
  name: 'Lock',
  data() {
    return {
      loaded: false,
      state: ''
    };
  },
  computed: {
    classObject() {
      return this.power ? 'is-info' : 'is-dark is-outlined';
    }
  },
  mounted() {
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
    },
    lockWS() {
      lock();
    },
    unlockWS() {
      unlock();
    }
  }
};
</script>

<style scoped lang="sass"></style>
