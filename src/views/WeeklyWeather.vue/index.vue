<template>
  <div>
    <background>
      <weather template="summary" icon-color="white" />
      <weekly-forecast />
    </background>
  </div>
</template>

<script>
import Background from '@/components/Home/Background';
import Weather from '@/components/Home/Weather';
import WeeklyForecast from '@/components/Home/WeeklyForecast';
export default {
  components: {
    Background,
    Weather,
    WeeklyForecast
  }
};
</script>
