import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

function initMessengerSDK () {
  return new Promise((resolve, reject) => {
    (function (d, s, id) {
      var js; var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/messenger.Extensions.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'Messenger'))

    resolve()
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
  async created () {
    await initMessengerSDK()
  }
}).$mount('#app')
