<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <p v-if="error">Error: {{ error }}</p>
      <p>Support features:</p>
      <ul>
        <li
          v-for="(feature, index) in supportFeatures"
          :key="index"
        >
          {{ feature }}
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

const FACEBOOK_APP_ID = process.env.VUE_APP_FACEBOOK_APP_ID
const PAGE_ACCESS_TOKEN = process.env.VUE_APP_PAGE_ACCESS_TOKEN

export default {
  name: 'App',
  data () {
    return {
      supportFeatures: [''],
      error: ''
    }
  },
  computed: {
    ...mapState('threadContext', {
      psid: state => state.psid
    })
  },
  mounted () {
    const vm = this

    window.extAsyncInit = function () {
      const MessengerExtensions = window.MessengerExtensions

      MessengerExtensions.getSupportedFeatures(
        function success (result) {
          vm.supportFeatures = result.supported_features
        },
        function error (err) {
          vm.error = err
        }
      )

      MessengerExtensions.getContext(FACEBOOK_APP_ID,
        function success (threadContext) {
          vm.setThreadContext(threadContext)
          // vm.getProfile(threadContext.psid)
        },
        function error (err) {
          vm.error = err
        }
      )
    }

    window.fbAsyncInit = async function () {
      const FB = window.FB

      FB.init({
        appId: FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v11.0'
      })

      try {
        await vm.ensureSetPSID()
        FB.api(`/${vm.psid}`,
          'GET',
          {
            fields: 'id,name,first_name,last_name,profile_pic,locale,timezone,gender',
            access_token: PAGE_ACCESS_TOKEN
          },
          function (response) {
            console.log(response)
            if (!response || response.error) {
              console.log('Error')
            } else {
              vm.setUserProfile(response)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    ...mapActions('threadContext', {
      setThreadContext: 'setThreadContext'
    }),
    ...mapActions('userProfile', {
      setUserProfile: 'setUserProfile'
    }),
    async getProfile (psid) {
      try {
        const userProfileRes = await axios({
          url: `/${psid}`,
          method: 'GET',
          baseURL: 'https://graph.facebook.com/v11.0/',
          params: {
            fields: 'id,name,first_name,last_name,profile_pic,locale,timezone,gender',
            access_token: PAGE_ACCESS_TOKEN
          }
        })
        this.setUserProfile(userProfileRes.data)
      } catch (userProfileError) {
        console.error(userProfileError)
      }
    },
    ensureSetPSID () {
      const start = Date.now()
      const vm = this
      function waitForPSID (resolve, reject) {
        if (vm.psid) {
          resolve()
        } else if (Date.now() - start >= 10000) {
          reject(new Error('timeout'))
        } else {
          setTimeout(waitForPSID.bind(this, resolve, reject), 30)
        }
      }
      return new Promise(waitForPSID)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
