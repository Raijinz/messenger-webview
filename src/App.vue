<template>
  <div id="app">
    <!-- <div id="nav">
      <p v-if="error">Error: {{ error }}</p>
      <p>Touchable: {{ touchable }}</p>
      <p>Mobile: {{ isMobile }}</p>
      <p>Support features:</p>
      <ul>
        <li
          v-for="(feature, index) in supportFeatures"
          :key="index"
        >
          {{ feature }}
        </li>
      </ul>
    </div> -->
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import checkTouchScreen from '@/utils/checkTouchScreen'
import checkMobileDevice from '@/utils/checkMobileDevice'

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
const PAGE_ACCESS_TOKEN = process.env.VUE_APP_PAGE_ACCESS_TOKEN

export default {
  name: 'App',
  data () {
    return {
      supportFeatures: [''],
      error: '',
      touchable: false,
      isMobile: false
    }
  },
  created () {
    const vm = this
    this.touchable = checkTouchScreen()
    this.isMobile = checkMobileDevice()

    window.extAsyncInit = function () {
      const MessengerExtensions = window.MessengerExtensions

      MessengerExtensions.getContext(FACEBOOK_APP_ID,
        function success (threadContext) {
          vm.setThreadContext('threadContext/setThreadContext', threadContext)
          vm.getProfile(threadContext.psid)
        },
        function error (err) {
          console.log(err)
        })
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
