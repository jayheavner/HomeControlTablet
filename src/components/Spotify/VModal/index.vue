<template>
  <div class="modal is-active">
    <modal
      :name="modalName"
      :width="width"
      :height="height"
      @before-open="beforeOpen"
      @before-close="beforeClose"
    >
      <div class="modal__header">
        <slot name="header" />
      </div>
      <div class="modal__body">
        <slot name="body" />
      </div>
      <div class="modal__footer">
        <slot name="footer" />
      </div>
    </modal>
  </div>
</template>

<script>
/* eslint-disable vue/name-property-casing */
export default {
  name: 'v-modal',

  props: {
    modalName: {
      type: String,
      required: true
    },

    width: {
      type: String,
      required: false,
      default: '400px'
    },

    height: {
      type: String,
      required: false,
      default: '400px'
    }
  },

  data() {
    return {
      modalVisible: false,
      modalCanTransition: true
    };
  },

  methods: {
    beforeOpen(event) {
      if (!this.modalCanTransition) {
        event.stop();
        return;
      }
      this.modalCanTransition = false;
      setTimeout(this.resetModal, 300);
    },
    beforeClose(event) {
      if (!this.modalCanTransition) {
        event.stop();
        return;
      }
      this.modalCanTransition = false;
      setTimeout(this.resetModal, 300);
    },
    resetModal() {
      this.modalCanTransition = true;
    }
  }
};
</script>

<style lang="sass">

.modal
  color: $c-gray
  font-size: 13px

  &__header
    padding: 10px
    font:
      size: 18px
      weight: bold
    text-align: center
    border-bottom: 1px solid $c-gray
    color: $c-white

  &__body
    padding: 15px
    flex-grow: 1

  &__footer
    width: 100%
    padding: 13px
    text-align: center

    .btn
      margin: 0 5px

  .v--modal
    background: $c-shark
    box-shadow: 2px 2px 20px 7px rgba(0, 0, 0, .4)
</style>
