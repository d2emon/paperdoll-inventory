<template>
  <v-alert
    :value="!!error"
    type="warning"
  >
    {{error}}
  </v-alert>
</template>

<script>
  export default {
    name: 'GameError',
    props: {
      error: {
        type: String,
        default: null
      }
    }
  }
</script>

<style scoped>

</style>
