<template>
  <div class="has-text-light">
    {{ name }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LightPower',
  props: {
    id: String
  },
  computed: {
    ...mapGetters({
      lights: 'Light/getLights'
    }),
    name() {
      let light = this.lights.find(l => l.entity_id === this.id);
      if (light !== undefined && light.name !== undefined) return light.name;
      else return '';
    }
  }
};
</script>

<style scoped lang="sass">

.player-controls
  display: flex
  justify-content: center

  &__button
    background: none
    border: 0
    margin: auto 10px
    color: $c-gray
    font-size: 15px
    cursor: pointer
    outline: none

    &:hover
      color: $c-white

    &--active
      color: $c-green

    &--play,
    &--pause
      font-size: 35px

      &:hover
        color: $c-white
        transform: scale(1.1)
</style>
