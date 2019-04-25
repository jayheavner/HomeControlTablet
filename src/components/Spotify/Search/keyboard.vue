<template>
  <div>
    <div class="control has-icons-right search">
      <input
        class="input is-large search__input"
        type="search"
        placeholder="Search"
        data-layout="compact"
        @focus="show"
      />
      <span class="icon is-medium is-right">
        <icon name="search" />
      </span>
    </div>
    <vue-touch-keyboard
      v-if="visible"
      :options="options"
      :layout="layout"
      :cancel="hide"
      :accept="accept"
      :input="input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      layout: 'compact',
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      }
    };
  },

  methods: {
    accept(text) {
      alert('Input text: ' + text);
      this.hide();
    },

    show(e) {
      this.input = e.target;
      this.layout = e.target.dataset.layout;

      if (!this.visible) this.visible = true;
    },

    hide() {
      this.visible = false;
    }
  }
};
</script>

<style scoped lang="sass">

input
  &.search
    &__input
      margin: 4px
      width: 792px
      &:focus,
      &.is-focused,
      &:active,
      &.is-active
        border-color: red
        color: blue


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
