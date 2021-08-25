<template>
  <div id="activate">
    <h1>Activate page</h1>
    <input
      id="number"
      v-model="number"
      type="text"
      name="number"
    >
    <br>
    <button
      type="button"
      @click="activate"
    >
      Activate
    </button>
  </div>
</template>

<script>
export default {
  name: 'Activate',
  data () {
    return {
      number: ''
    }
  },
  methods: {
    activate () {
      this.$router.push('/activate/success')
    }
  }
}
</script>

<style>

</style>
