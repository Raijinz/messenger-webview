import store from '@/store'

const FACEBOOK_APP_ID = process.env.VUE_APP_FACEBOOK_APP_ID

export function initMessengerExtSDK () {
  return new Promise(resolve => {
    window.extAsyncInit = function () {
      const MessengerExtensions = window.MessengerExtensions

      MessengerExtensions.getContext(FACEBOOK_APP_ID,
        function success (threadContext) {
          store.dispatch('threadContext/setThreadContext', threadContext)
        },
        function error (err) {
          console.error(err)
        }
      )

      resolve()
    }
  })
}
