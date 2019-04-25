<template>
  <div>
    <div class="control has-icons-right search">
      <input
        v-model="searchTerm"
        class="input is-large search__input"
        type="search"
        placeholder="Search"
        data-layout="compact"
        @focus="showKeyboard"
      />
      <span class="icon is-medium is-right">
        <icon name="search" />
      </span>
    </div>
    <keyboard
      :visible="visible"
      @onChange="onChange"
      @hideKeyboard="hideKeyboard"
    />
  </div>
</template>

<script>
import Keyboard from '@/components/keyboard';

export default {
  name: 'Search',

  components: {
    Keyboard
  },
  data() {
    return {
      searchTerm: '',
      visible: false
    };
  },

  methods: {
    onChange(value) {
      console.log(value); // someValue
      this.searchTerm = value;
    },
    showKeyboard() {
      this.visible = true;
    },

    hideKeyboard() {
      this.visible = false;
    },
    hide() {
      this.visible = false;
    }
  }
};
</script>
