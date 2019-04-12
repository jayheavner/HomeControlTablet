import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import VModal from 'vue-js-modal';
import vueSlider from 'vue-slider-component';
import Icon from 'vue-awesome/components/Icon';
import VueMoment from 'vue-moment';
import VueLazyload from 'vue-lazyload';

import './filters';
import './directives';
import 'optiscroll';
import 'vue-awesome/icons';

Vue.component('icon', Icon);
Vue.component('vueSlider', vueSlider);

Vue.use(VModal, {
  dialog: true,
  dynamic: true
});
Vue.use(VueMoment);
Vue.use(VueLazyload);

import dotenv from 'dotenv';
dotenv.config();

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faHome,
  faLightbulb,
  faMusic,
  faCaretUp,
  faCaretDown,
  faArrowLeft,
  faLock,
  faLockOpen
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(
  faLightbulb,
  faMusic,
  faHome,
  faCaretUp,
  faCaretDown,
  faArrowLeft,
  faLock,
  faLockOpen
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const initialize = async () => {
  await store.dispatch('sonosTransportState/initialize');
  await store.dispatch('sonosZone/initialize');
  const spotifyAuth = await store.getters['spotifyAuth/isAuthenticated'];
  if (spotifyAuth) {
    await store.dispatch('player/initialize');
    await store.dispatch('player/setPlayback');
    await store.dispatch('library/load');
  }
};

new Vue({
  router,
  store,
  async created() {
    this.content = await initialize();
    this.$mount('#app');
  },
  render: h => h(App)
});