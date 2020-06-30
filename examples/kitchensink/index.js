import Vue from 'vue';
import Vuex from 'vuex';
import VueAlerts from '@/vue-alerts';

import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueAlerts);

new Vue({
  el: '#app',
  store: new Vuex.Store(),
  vueAlertsSettings: new VueAlerts(),
  render: createElement => createElement(App)
});
