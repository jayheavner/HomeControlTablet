import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import VModal from 'vue-js-modal';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import VueMoment from 'vue-moment';
import VueLazyload from 'vue-lazyload';

import './filters';
import './directives';
import 'optiscroll';

import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

Vue.component('icon', Icon);
Vue.component('VueSlider', VueSlider);

Vue.use(VModal, {
  dialog: true,
  dynamic: true
});
Vue.use(VueMoment);
Vue.use(VueLazyload);

// import Keyboard from 'simple-keyboard';
// import 'simple-keyboard/build/css/index.css';
// Vue.use(Keyboard);

import VueTouchKeyboard from 'vue-touch-keyboard';
import 'vue-touch-keyboard/dist/vue-touch-keyboard.css'; // load default style

Vue.use(VueTouchKeyboard);

import dotenv from 'dotenv';
dotenv.config();

// import { library } from '@fortawesome/fontawesome-svg-core';

// import {
//   faHome,
//   faLightbulb,
//   faMusic,
//   faCaretUp,
//   faCaretDown,
//   faArrowLeft,
//   faLock,
//   faLockOpen,
//   faExpandArrowsAlt
// } from '@fortawesome/free-solid-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// library.add(
//   faLightbulb,
//   faMusic,
//   faHome,
//   faCaretUp,
//   faCaretDown,
//   faArrowLeft,
//   faLock,
//   faLockOpen,
//   faExpandArrowsAlt
// );
// Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const initialize = async () => {
  await store.dispatch('player/initialize');
  await store.dispatch('player/setPlayback');
  await store.dispatch('library/load');
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
