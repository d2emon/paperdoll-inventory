<template>
  <v-container
    id="ultima"
    fluid
  >
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title class="headline">
          Ultima
        </v-card-title>
        <game-error :error="error" />
        <router-view />
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Ultima',
    components: {
      GameError: () => import('@/components/ultima/GameError')
    },
    computed: {
      ...mapState('pc', ['error'])
    }
  }
</script>

<style scoped>

</style>
