import Vue from 'vue';

import Vant from 'vant';
import { Notify } from 'vant';
import 'vant/lib/index.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(Notify);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
