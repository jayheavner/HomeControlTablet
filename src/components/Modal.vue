<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <slot />
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('close')"
    />
  </div>
</template>
