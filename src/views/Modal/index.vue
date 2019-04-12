<template>
  <div>
    <modals-container />

    <div style="margin-top: 20px; margin-bottom: 15px;">
      <button class="btn" @click="showDynamicComponentModal">
        method
      </button>
    </div>
  </div>
</template>

<script>
import CustomComponentModal from '@/components/modals/CustomComponentModal.vue';

export default {
  name: 'ModalDemo',
  components: {},
  methods: {
    showDynamicComponentModal() {
      this.$modal.show(CustomComponentModal);
    }
  }
};
</script>
