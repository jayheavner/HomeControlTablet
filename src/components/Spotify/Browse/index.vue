<template>
  <div class="browse-view">
    Genres & Moods
    <genres />
    New releases
    <new-releases />
  </div>
</template>

<script>
import Genres from './Genres';
import NewReleases from './NewReleases';

export default {
  name: 'Browse',

  components: {
    Genres,
    NewReleases
  }
};
</script>

<style scoped lang="sass">

.browse-view
  padding: 8px

  &__nav
    display: flex
    padding: 15px 0
    justify-content: center

  &__nav-item
    position: relative
    margin: 0 15px
    color: $c-gray
    font-size: 17px
    text-transform: uppercase
    cursor: pointer

    &:hover
      color: $c-white

    &--active
      color: $c-white

      &:after
        +horizontal-center
        bottom: -10px
        width: 50px
        height: 3px
        background: $c-green
        content: ''

  &__content
    padding: 15px 0
</style>
