import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

function loadMessengerExtensionsSDK () {
  return new Promise(resolve => {
    (function (d, s, id) {
      var js; var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/th_TH/messenger.Extensions.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'Messenger'))
    resolve()
  })
}

function loadFacebookSDK () {
  return new Promise(resolve => {
    (function (d, s, id) {
      var js; var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/th_TH/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    resolve()
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
  async created () {
    await loadMessengerExtensionsSDK()
    await loadFacebookSDK()
  }
}).$mount('#app')
