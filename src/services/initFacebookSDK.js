import store from '@/store'

const FACEBOOK_APP_ID = process.env.VUE_APP_FACEBOOK_APP_ID

export function initFacebookSDK () {
  return new Promise(resolve => {
    window.fbAsyncInit = function () {
      const FB = window.FB

      FB.init({
        appId: FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v11.0'
      })

      FB.api(store.state.threadContext.psid,
        'GET',
        { fields: 'id,name,first_name,last_name,profile_pic,locale,timezone,gender' },
        function (response) {
          store.dispatch('userProfile/setUserProfile', response)
        }
      )

      resolve()
    }
  })
}
