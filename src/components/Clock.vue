<template>
  <div>
    <section v-if="displayDate">
      <div>{{ date }}</div>
    </section>

    <section v-if="displayTime">
      <div>{{ time }}</div>
    </section>
  </div>
</template>

<script type="text/javascript">
var moment = require('moment');

export default {
  name: 'Clock',
  props: {
    displayTime: {
      type: Boolean,
      default: false
    },
    displayDate: {
      type: Boolean,
      default: false
    },
    formatTime: String,
    formatDate: String
  },
  data() {
    return {
      moment: moment,
      time: '',
      date: ''
    };
  },

  created() {},
  mounted: function() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1 * 1000);
  },
  methods: {
    updateTime() {
      if (this.displayTime)
        this.time = this.moment().format(
          this.formatTime === undefined ? 'LTS' : this.formatTime
        );
      if (this.displayDate)
        this.date = this.moment().format(
          this.formatDate === undefined ? 'dddd, MMM Do YY' : this.formatDate
        );
    }
  }
};
</script>

<style></style>
