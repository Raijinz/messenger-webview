<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <p v-if="error">Error: {{ error }}</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID

export default {
  name: 'App',
  data () {
    return {
      error: ''
    }
  },
  mounted () {
    const vm = this

    window.extAsyncInit = function () {
      const MessengerExtensions = window.MessengerExtensions
      MessengerExtensions.getContext(FACEBOOK_APP_ID,
        function success (threadContext) {
          vm.$store.dispatch('threadContext/setThreadContext', threadContext)
        },
        function error (err) {
          vm.error = err
        }
      )
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
