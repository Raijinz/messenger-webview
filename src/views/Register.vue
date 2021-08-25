<template>
  <div
    id="register"
    class="center"
  >
    <input
      id="username"
      v-model="username"
      type="text"
      name="username"
    >
    <br>
    <input
      id="password"
      v-model="password"
      type="password"
      name="password"
    >
    <br>
    <button
      type="button"
      @click="register"
    >
      Register
    </button>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$router.push('/register/success')
    }
  }
}
</script>

<style>

</style>
