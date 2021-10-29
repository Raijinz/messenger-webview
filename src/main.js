import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MSGPlugin from './plugins/messenger-plugin'

const FACEBOOK_APP_ID = process.env.VUE_APP_FACEBOOK_APP_ID
const PAGE_ACCESS_TOKEN = process.env.VUE_APP_PAGE_ACCESS_TOKEN

Vue.config.productionTip = false

Vue.use(MSGPlugin, {
  appId: FACEBOOK_APP_ID,
  pageToken: PAGE_ACCESS_TOKEN,
  store
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
