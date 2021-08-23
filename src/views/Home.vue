<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
    })
  }
}
</script>
