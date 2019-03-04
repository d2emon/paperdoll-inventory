<template>
  <v-card
    height="400px"
    flat
  >
    <v-text-field
      label="Enter thy name:"
      :value="name"
      @input="setName"
    ></v-text-field>
  </v-card>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: 'SelectName',
    computed: {
      ...mapState('pc', [
        'name'
      ])
    },
    methods: {
      ...mapMutations('pc', ['setName'])
    }
  }
</script>

<style scoped>

</style>
