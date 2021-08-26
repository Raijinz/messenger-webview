<template>
  <div id="success">
    <h1>Success</h1>
    <img
      v-if="profilePic"
      :src="profilePic"
      alt="Facebook profile pic"
      class="profile-pic"
    >
    <p v-if="name">Thank you, {{ name }}</p>
    <p v-if="id">Your ID: {{ id }}</p>
    <p v-if="firstName">First name: {{ firstName }}</p>
    <p v-if="lastName">Last name: {{ lastName }}</p>
    <button
      type="button"
      @click="close"
    >
      Close this page
    </button>
    <p v-if="error">
      We cannot close your browser, due to: {{ error }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const MessengerExtensions = window.MessengerExtensions

export default {
  name: 'Success',
  data () {
    return {
      error: ''
    }
  },
  computed: {
    ...mapState('userProfile', {
      id: state => state.id,
      name: state => state.name,
      firstName: state => state.firstName,
      lastName: state => state.lastName,
      profilePic: state => state.profilePic
    })
  },
  methods: {
    close () {
      MessengerExtensions.requestCloseBrowser(function success () {
        this.error = ''
      }, function error (err) {
        this.error = err
      })
    }
  }
}
</script>

<style>
.profile-pic {
  max-width: 40%;
}
</style>
