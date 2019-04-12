<template>
  <div class="media-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MediaContainer'
};
</script>

<style lang="sass">

.media-container
  display: flex
  flex-flow: wrap
  padding: 0 8px

  .media-object
    display: inline-block
    width: 50%
    padding: 7px
    vertical-align: top

+breakpoint(medium)
  .media-container
    .media-object
      width: 33%

+breakpoint(large)
  .media-container
    .media-object
      width: 25%

+breakpoint(xlarge)
  .media-container
    .media-object
      width: 20%
</style>
