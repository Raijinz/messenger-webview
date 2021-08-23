import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { initFacebookSDK } from './services/initFacebookSDK'
import { initMessengerExtSDK } from './services/initMessengerExtSDK'
import store from './store'

Vue.config.productionTip = false

initMessengerExtSDK()
  .then(initFacebookSDK())
  .then(startApp())

function startApp () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
