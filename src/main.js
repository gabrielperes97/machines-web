import Vue from 'vue';
import './plugins/vuetify';
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Vuelidate);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
