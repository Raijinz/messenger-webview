import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const FACEBOOK_APP_ID = process.env.VUE_APP_FACEBOOK_APP_ID

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

    window.extAsyncInit = function () {
      const MessengerExtensions = window.MessengerExtensions

      MessengerExtensions.getContext(FACEBOOK_APP_ID,
        function success (threadContext) {
          store.dispatch('threadContext/setThreadContext', threadContext)
        },
        function error (err) {
          console.log(err)
        })
    }

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
