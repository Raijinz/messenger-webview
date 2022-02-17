<template>
  <div id="app">
    <div id="nav">
      <p v-if="error">Error: {{ error }}</p>
      <p>Touchable: {{ touchable }}</p>
      <p>Mobile: {{ isMobile }}</p>
      <p>User-Agent: {{ userAgent }}</p>
      <p>window.name: {{ name }}</p>
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
    <router-view />
  </div>
</template>

<script>
import checkTouchScreen from '@/utils/checkTouchScreen'
import { checkMobileDevice } from '@/utils/checkMobileDevice'

export default {
  name: 'App',
  data () {
    return {
      supportFeatures: [''],
      error: '',
      touchable: false,
      isMobile: false,
      userAgent: '',
      name: ''
    }
  },
  created () {
    this.userAgent = navigator.userAgent
    this.touchable = checkTouchScreen()
    this.isMobile = checkMobileDevice()
    this.name = window.name
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
