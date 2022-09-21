import Vue from 'vue'
import App from './App.vue'
import { store } from "./store/store"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { VBTooltip } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.directive('b-tooltip', VBTooltip)

// Vue Filters
Vue.filter("upperCase", (value) => {
  return value.toUpperCase();
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store : store,
  render: h => h(App),
}).$mount('#app')

