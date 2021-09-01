import axios from 'axios'

/**
 * Facebook Messenger Extensions plugin
 * @param {Vue} Vue Vue instance
 * @param {*} options Plugin options
 */
function MSGPlugin (Vue, options) {
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
    const FACEBOOK_APP_ID = options.appId
    const PAGE_ACCESS_TOKEN = options.pageToken

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
        Vue.$store.dispatch('threadContext/setThreadContext', threadContext)
        getProfile(Vue, threadContext.psid, PAGE_ACCESS_TOKEN)
      },
      function error (_err) {
        // TODO
      }
    )
  }
}

async function getProfile (Vue, psid, pageToken) {
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
    Vue.$store.dispatch('userProfile/setUserProfile', userProfileRes.data)
  } catch (error) {
    // TODO
  }
}

export default MSGPlugin
