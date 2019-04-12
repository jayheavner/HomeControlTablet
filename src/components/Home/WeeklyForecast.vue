<template>
  <section v-if="loading">
    <span>loading...</span>
  </section>

  <section v-else>
    <div class="container">
      <div class="columns is-multiline">
        <div v-for="day in forecast" class="column is-one-fifth">
          <div class="box has-text-dark">
            {{ formatDate(day.time) }}<br />
            {{ formatTemp(day.temperatureLow) }} -
            {{ formatTemp(day.temperatureHigh) }}<br />
            <skycon
              :condition="day.icon"
              :width="40"
              :height="40"
              :color="iconColor"
            />
            {{ day.summary }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/javascript">
import Vue from 'vue';
import moment from 'moment';

import VueSkycons from 'vue-skycons';
Vue.use(VueSkycons);

import api from '@/api';
import { subscribe } from '@/mqtt';

export default {
  name: 'DailyForecast',
  components: {
    VueSkycons: VueSkycons
  },
  props: {
    template: String,
    iconColor: String
  },
  data() {
    return {
      moment: moment,
      forecast: [],
      loading: true,
      messages: []
    };
  },
  computed: {
    actualTemp() {
      return Math.round(this.forecast.temp).toString() + '\xB0';
    },
    feelsLike() {
      if (this.forecast.apparentTemp !== this.forecast.temp) {
        return `Feels like ${Math.round(
          this.forecast.apparentTemp
        ).toString()}\xB0`;
      }
      return '';
    },
    humidity() {
      return Math.round(this.forecast.humidity * 100).toString() + '%';
    }
  },
  created() {
    api.red
      .getWeeklyForecast()
      .then(response => {
        this.loading = false;
        this.forecast = response.data.data.slice(1, 6);
        console.log(this.forecast);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  mounted: function() {
    console.log('[mounted] am I loading? ' + this.loading);
    subscribe('dark-sky/week', message => {
      this.forecast = JSON.parse(message.toString()).data.slice(1, 6);
    });
    api.red
      .getWeeklyForecast()
      .then(response => {
        this.weekly = response.data;
        console.log(this.weekly);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    handleMessage(msg) {
      this.messages.push(msg);
    },
    formatTemp(temp) {
      return Math.round(temp).toString() + '\xB0';
    },
    formatTime(time) {
      return this.moment.unix(time).format('h:mm a');
    },
    formatDate(time) {
      return this.moment.unix(time).format('dddd MMM D');
    },
    minTemp() {
      return Math.round(this.forecast.minTemp).toString() + '\xB0';
    },
    minTempTime() {
      return this.moment.unix(this.forecast.minTempTime).format('h:mm a');
    }
  }
};
</script>

<style>
[class*="icono"] {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  /* color: #333; */
  box-sizing: border-box;
}

[class*="icono"]:after,
[class*="icono"]:before {
  content: "";
  box-sizing: border-box;
}

[class*="icono-arrow1"] {
  width: 20px;
  height: 20px;
  border-width: 4px 4px 0 0;
  border-style: solid;
  margin: 10px;
}

[class*="icono-arrow1"]:before {
  right: 0;
  top: -3px;
  position: absolute;
  height: 4px;
  box-shadow: inset 0 0 0 32px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  width: 23px;
  -webkit-transform-origin: right top;
  transform-origin: right top;
}

[class*="icono-arrow1"][class*="-left"] {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

[class*="icono-arrow1"][class*="-left"][class*="-up"] {
  -webkit-transform: none;
  transform: none;
}

[class*="icono-arrow1"][class*="-left"][class*="-down"] {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

[class*="icono-arrow1"][class*="-right"] {
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

[class*="icono-arrow1"][class*="-right"][class*="-up"] {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

[class*="icono-arrow1"][class*="-right"][class*="-down"] {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

[class*="icono-arrow1"][class*="-up"] {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

[class*="icono-arrow1"][class*="-down"] {
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}

[class*="icono-arrow2"] {
  width: 0;
  height: 0;
  border-width: 6px;
  border-style: solid;
  border-bottom-color: transparent;
  border-left-color: transparent;
  margin: 10px;
}

[class*="icono-arrow2"]:before {
  right: 0;
  top: -3px;
  position: absolute;
  height: 4px;
  box-shadow: inset 0 0 0 32px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  width: 15px;
  -webkit-transform-origin: right top;
  transform-origin: right top;
}

[class*="icono-arrow2"][class*="-left"] {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

[class*="icono-arrow2"][class*="-left"][class*="-up"] {
  -webkit-transform: none;
  transform: none;
}

[class*="icono-arrow2"][class*="-left"][class*="-down"] {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

[class*="icono-arrow2"][class*="-right"] {
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

[class*="icono-arrow2"][class*="-right"][class*="-up"] {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

[class*="icono-arrow2"][class*="-right"][class*="-down"] {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

[class*="icono-arrow2"][class*="-up"] {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

[class*="icono-arrow2"][class*="-down"] {
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}

[class*="icono"] {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  /* color: #333; */
  box-sizing: border-box;
}

[class*="icono"]:after,
[class*="icono"]:before {
  content: "";
  box-sizing: border-box;
}
</style>
