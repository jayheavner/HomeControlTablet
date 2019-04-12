<template>
  <div>
    <notify
      v-for="(notification, index) in notifications"
      :key="`notification-${index}`"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
      @close="removeNotification(notification)"
    >
    </notify>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Notify from './Notify';

export default {
  name: 'Notification',

  components: {
    Notify,
  },

  computed: {
    ...mapGetters({
      notifications: 'notification/getNotifications',
    }),
  },

  methods: {
    ...mapActions({
      removeNotification: 'notification/remove',
    }),
  },
};
</script>
