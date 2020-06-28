import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import VueAutosuggest from 'vue-autosuggest';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import moment from 'moment';
import store from './store';
import App from './App.vue';
import router from './router';

// name is optional
Vue.use(VueLodash, { name: 'custom', lodash });

// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.use(VueAutosuggest);

// Load VueAutosuggest into your vue app globally
Vue.config.productionTip = false;

Vue.filter('startCase', (value) => {
  if (!value) return '';
  return lodash.startCase(value);
});
Vue.filter('capitalize', (value) => {
  if (!value) return '';
  return lodash.capitalize(value);
});
Vue.filter('formatDate', (value) => {
  if (!value) return '';
  const date = new Date(value * 1000);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
});
Vue.filter('formatTime', (value) => {
  if (!value) return '';
  const date = new Date(value * 1000);
  return moment(date).format('hh:mm a');
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
