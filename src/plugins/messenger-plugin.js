import axios from 'axios'

export default {
  install (Vue, { appId, pageToken, store }) {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/messenger.Extensions.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'Messenger'))

    window.extAsyncInit = function () {
      const MessengerExtensions = window.MessengerExtensions
      const FACEBOOK_APP_ID = appId
      const PAGE_ACCESS_TOKEN = pageToken

      MessengerExtensions.getSupportedFeatures(
        function success (_result) {
        // TODO
        },
        function error (_err) {
        // TODO
        }
      )

      MessengerExtensions.getContext(FACEBOOK_APP_ID,
        function success (threadContext) {
          store.dispatch('threadContext/setThreadContext', threadContext)
          getProfile(store, threadContext.psid, PAGE_ACCESS_TOKEN)
        },
        function error (_err) {
        // TODO
        }
      )

      Vue.prototype.$msgExt = MessengerExtensions
    }
  }
}

async function getProfile (store, psid, pageToken) {
  try {
    const userProfileRes = await axios({
      url: `/${psid}`,
      method: 'GET',
      baseURL: 'https://graph.facebook.com/v11.0',
      params: {
        fields: 'id,name,first_name,last_name,profile_pic,locale,timezone,gender',
        access_token: pageToken
      }
    })
    store.dispatch('userProfile/setUserProfile', userProfileRes.data)
  } catch (error) {
    // TODO
  }
}
