<template>
  <section v-if="loading">
    <span>loading...</span>
  </section>

  <section v-else-if="template === 'single'">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          {{ actualTemp }}
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <skycon condition="fog" color="white" />
        </div>
      </div>
    </div>
  </section>

  <section v-else-if="template === 'summary'">
    <div class="box has-text-black">
      <div class="tile is-ancestor is-gapless">
        <div class="tile">
          <div>Now</div>
        </div>
      </div>
      <div class="tile is-ancestor is-gapless">
        <div class="tile is-parent is-5">
          <article class="tile is-child">
            <div class="is-size-1">
              {{ actualTemp }}
            </div>
            <div class="">
              {{ feelsLike }}
            </div>
          </article>
        </div>

        <div class="tile is-vertical">
          <div class="tile is-parent is-vertical">
            <div class="tile is-child">
              {{ forecast.currentSummary }}
              <skycon
                :condition="forecast.icon"
                :width="40"
                :height="40"
                :color="iconColor"
              />
            </div>
            <div class="tile is-child">
              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <div class="level-item">
                      <span>
                        <font-awesome-icon
                          icon="caret-up"
                          style="margin-bottom: .25rem;"
                        />
                        {{ maxTemp }}&nbsp;&nbsp;&nbsp;
                      </span>
                    </div>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <div class="level-item">
                      <span>
                        &nbsp;&nbsp;&nbsp;{{ minTemp }}
                        <font-awesome-icon
                          icon="caret-down"
                          style="margin-top: .25rem;"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-else>
    <div class="level-left">
      <div
        class="level-item is-size-2 has-text-right"
        @click="showModal = true"
      >
        <span>{{ actualTemp }}</span>
        <skycon
          :condition="forecast.icon"
          :width="40"
          :height="40"
          color="black"
        />
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <div class="box">
        <div class="level">
          <div
            class="level-item is-size-2 has-text-right"
            @click="isVisible = true"
          >
            <span>{{ actualTemp }}</span>
            <skycon :condition="forecast.icon" :width="40" :height="40" />
          </div>
        </div>
        <p>
          {{ forecast.nextHourSummary }}
          <br />
          {{ minTemp }} @
          {{ moment.unix(forecast.minTempTime).format('h:mm a') }} <br />
          {{ actualTemp }} Feels like {{ feelsLike }} <br />
          {{ maxTemp }} @
          {{ moment.unix(forecast.maxTempTime).format('h:mm a') }} <br />
          {{ humidity }} Humidity
          <br />
          <span class="is-size-7">
            Reported at {{ moment.unix(forecast.time).format('h:mm a') }}
          </span>
        </p>
      </div>
    </modal>
  </section>
</template>
<script type="text/javascript">
import Vue from 'vue';
import moment from 'moment';

import VueSkycons from 'vue-skycons';
Vue.use(VueSkycons);
//Vue.use(VueSkycons, { color: 'black' })
// import Skycons from '@/components/Skycons'

import api from '@/api';
import { subscribe } from '@/mqtt';
import modal from '../Modal';

export default {
  name: 'DailyForecast',
  components: {
    modal: modal,
    VueSkycons: VueSkycons
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    template: String,
    // eslint-disable-next-line vue/require-default-prop
    iconColor: String
  },
  data() {
    return {
      moment: moment,
      forecast: null,
      loading: true,
      messages: [],
      showModal: false
    };
  },
  computed: {
    maxTemp() {
      return Math.round(this.forecast.maxTemp).toString() + '\xB0';
    },
    maxTempTime() {
      return this.moment.unix(this.forecast.maxTempTime).format('h:mm a');
    },
    minTemp() {
      return Math.round(this.forecast.minTemp).toString() + '\xB0';
    },
    minTempTime() {
      return this.moment.unix(this.forecast.minTempTime).format('h:mm a');
    },
    actualTemp() {
      return Math.round(this.forecast.temp).toString() + '\xB0';
    },
    feelsLike() {
      if (this.forecast.apparentTemp !== this.forecast.temp) {
        return (
          'Feels like ' +
          Math.round(this.forecast.apparentTemp).toString() +
          '\xB0'
        );
      }
      return '';
    },
    humidity() {
      return Math.round(this.forecast.humidity * 100).toString() + '%';
    }
  },
  created() {
    api.red
      .getDailyForecast()
      .then(response => {
        this.forecast = response.data;
        console.dir(this.forecast);
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  mounted: function() {
    subscribe('dark-sky/current', message => {
      this.forecast = JSON.parse(message.toString());
    });
  },
  methods: {
    handleMessage(msg) {
      this.messages.push(msg);
    }
  }
};
</script>

<style>
[class*='icono'] {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  /* color: #333; */
  box-sizing: border-box;
}

[class*='icono']:after,
[class*='icono']:before {
  content: '';
  box-sizing: border-box;
}

[class*='icono-arrow1'] {
  width: 20px;
  height: 20px;
  border-width: 4px 4px 0 0;
  border-style: solid;
  margin: 10px;
}

[class*='icono-arrow1']:before {
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

[class*='icono-arrow1'][class*='-left'] {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

[class*='icono-arrow1'][class*='-left'][class*='-up'] {
  -webkit-transform: none;
  transform: none;
}

[class*='icono-arrow1'][class*='-left'][class*='-down'] {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

[class*='icono-arrow1'][class*='-right'] {
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

[class*='icono-arrow1'][class*='-right'][class*='-up'] {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

[class*='icono-arrow1'][class*='-right'][class*='-down'] {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

[class*='icono-arrow1'][class*='-up'] {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

[class*='icono-arrow1'][class*='-down'] {
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}

[class*='icono-arrow2'] {
  width: 0;
  height: 0;
  border-width: 6px;
  border-style: solid;
  border-bottom-color: transparent;
  border-left-color: transparent;
  margin: 10px;
}

[class*='icono-arrow2']:before {
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

[class*='icono-arrow2'][class*='-left'] {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

[class*='icono-arrow2'][class*='-left'][class*='-up'] {
  -webkit-transform: none;
  transform: none;
}

[class*='icono-arrow2'][class*='-left'][class*='-down'] {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

[class*='icono-arrow2'][class*='-right'] {
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

[class*='icono-arrow2'][class*='-right'][class*='-up'] {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

[class*='icono-arrow2'][class*='-right'][class*='-down'] {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

[class*='icono-arrow2'][class*='-up'] {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

[class*='icono-arrow2'][class*='-down'] {
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}

[class*='icono'] {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  /* color: #333; */
  box-sizing: border-box;
}

[class*='icono']:after,
[class*='icono']:before {
  content: '';
  box-sizing: border-box;
}
</style>
