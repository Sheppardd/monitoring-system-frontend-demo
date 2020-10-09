import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSimpleAlert from 'vue-simple-alert'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } });

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
