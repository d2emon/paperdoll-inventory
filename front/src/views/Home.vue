<template>
  <v-container
    id="home"
    fluid
    grid-list-md
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="game in games"
        :key="game.title"
        xs3
      >
        <game-card :game="game" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Home',
    components: {
      GameCard: () => import('@/components/GameCard')
    },
    computed: {
      ...mapState('pages', ['pages']),
      ...mapState('games', ['games'])
    },
    mounted () {
      this.fetchGames()
    },
    methods: {
      ...mapActions('games', ['fetchGames'])
    }
  }
</script>
