<template>
  <div class="home">
    <img
      v-if="profilePic"
      :src="profilePic"
      alt="Profile pic"
      class="profile-pic"
    >
    <img
      v-else
      src="@/assets/images/logo.png"
      alt="Vue logo"
    >
    <p v-if="name">Hello, {{ name }}</p>
    <p>Thread ID: {{ tid }}</p>
    <p>Thread type: {{ threadType }}</p>
    <p>Page-Scoped ID: {{ psid }}</p>
    <p>Signed request: {{ signedRequest }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState('threadContext', {
      tid: state => state.tid,
      threadType: state => state.threadType,
      psid: state => state.psid,
      signedRequest: state => state.signedRequest
    }),
    ...mapState('userProfile', {
      id: state => state.id,
      name: state => state.name,
      firstName: state => state.firstName,
      lastName: state => state.lastName,
      profilePic: state => state.profilePic,
      locale: state => state.locale,
      timezone: state => state.timezone,
      gender: state => state.gender
    })
  }
}
</script>

<style scoped>
.profile-pic {
  max-width: 40%;
}
</style>
