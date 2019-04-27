<template>
  <div>
    <a class="search icon is-medium is-right" @click="restoreSearch">
      <icon name="search" />
    </a>
    <div v-if="!resultsVisible" class="control has-icons-right search">
      <input
        v-model="searchTerm"
        class="input is-large search__input"
        type="search"
        placeholder="Search"
        data-layout="compact"
      />
      <span class="icon is-medium is-right">
        <icon name="search" />
      </span>
    </div>
    <keyboard
      :visible="keyboardVisible"
      @onChange="onChange"
      @hideKeyboard="hideKeyboard"
      @enter="startSearch"
    />
    <results :visible="resultsVisible" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Keyboard from '@/components/keyboard';
import Results from './Results';

export default {
  name: 'Search',

  components: {
    Keyboard,
    Results
  },
  data() {
    return {
      searchTerm: '',
      keyboardVisible: true,
      resultsVisible: false,
      qSearch: this.$route.path
    };
  },
  watch: {
    searchTerm(value) {
      //this.$router.push({ query: { searchTerm: value } });
      this.$router.replace({
        name: 'spotify-search',
        params: { query: value }
      });
      // this.$router.replace({
      //   name: 'search',
      //   params: { query: value }
      // });
      //if (value.length >= 3) this.search(value);
    }
  },
  methods: {
    ...mapActions({
      search: 'spotifySearch/search'
    }),
    onChange(value) {
      console.log(`searchTerm > ${value}`);
      this.searchTerm = value;
    },
    showKeyboard() {
      this.keyboardVisible = true;
    },
    hideKeyboard() {
      this.keyboardVisible = false;
    },
    restoreSearch() {
      this.keyboardVisible = true;
      this.resultsVisible = false;
    },
    async startSearch() {
      this.keyboardVisible = false;
      await this.search(this.searchTerm);
      this.resultsVisible = true;
      // this.$router.replace({
      //   name: 'search-result',
      //   params: { query: this.searchTerm }
      // });
    }
  }
};
function wait(ms) {
  var start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}
</script>

<style lang="sass" scoped>
.search.icon
  position: absolute
  right: 20px
  top: 5px
  color: white
  z-index: 2
</style>
