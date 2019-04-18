<template>
  <div>
    <form class="navbar-search">
      <input
        v-model="searchTerm"
        autofocus
        class="navbar-search__input"
        type="search"
        placeholder="Search"
        aria-label="Search"
        @keyup="onKeyUp"
        @focus="onFocus"
      />
      <button class="navbar-search__btn">
        <icon name="search" />
      </button>
    </form>
  </div>
</template>

<script>
import router from '@/router';
import { mapActions } from 'vuex';

export default {
  name: 'NavbarSearch',
  data() {
    return {
      qSearch: this.$route.path
    };
  },

  computed: {
    searchTerm: {
      get: function() {
        if (this.$route.matched[0].name !== 'search') return;

        if (
          this.$route.params.query !== undefined &&
          this.$route.params.query.length > 2
        )
          this.search(this.$route.params.query);
        return this.$route.params.query || '';
        // return this.qSearch.substring(this.qSearch.lastIndexOf('/') + 1);
      },
      set: function(value) {
        this.$router.replace({
          name: 'search-result',
          params: { query: value }
        });
        if (value.length > 2) this.search(value);
      }
    }
  },
  watch: {
    qSearch(val) {
      debugger;
    }
  },
  created() {},
  methods: {
    ...mapActions({
      search: 'spotifySearch/search'
    }),

    onFocus(e) {
      const {
        name,
        params: { query }
      } = this.$route;

      const { value } = e.target;

      if (value) {
        router.push({ name: 'search-result', params: { query: value } });
      } else if (name !== 'search' && !query) {
        //router.push('/search');
      }
    },

    onKeyUp(e) {
      return;
      const { value } = e.target;

      if (value !== '' && value.length > 2) {
        this.$router.replace({
          name: 'search-result',
          params: { query: value }
        });
        this.search(value);
      }
    }
  }
};
</script>

<style scoped lang="sass">

.navbar-search
  position: relative
  width: 160px
  font-size: 14px

  &__input
    height: 25px
    margin: 0
    padding-right: 20px
    border-radius: 30px

    &::-webkit-input-placeholder /* Chrome/Opera/Safari */
      color: $c-shark
      text-indent: 10px

  &__btn
    background: none
    border: none
    position: absolute
    right: 5px
    top: 0
    bottom: 0
    height: 16px
    margin: auto 0
    color: $c-shark
    outline: none
    pointer-events: none
</style>
