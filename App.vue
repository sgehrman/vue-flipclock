<template>
<div>
  <flip-clock :options="options" />
</div>
</template>

<script>
import FlipClock from './src/flipclock.vue';

export default {
  components: {
    FlipClock
  },
  data() {
    return {
      options: {
        digit: 0,
        label: true,
        clockFace: 'DailyCounter'
      }
    }
  },
  mounted() {
    // Grab the current date
    var currentDate = new Date();

    // Set some date in the past. In this case, it's always been since Jan 1
    var pastDate = new Date(currentDate.getFullYear(), 0, 1);

    // Calculate the difference in seconds between the future and current date
    this.options.digit = (currentDate.getTime() / 1000) - (pastDate.getTime() / 1000)
  }
}
</script>
