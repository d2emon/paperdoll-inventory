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
      <v-flex xs3>
        <v-card>
          <v-card-title class="headline">
            Страницы
          </v-card-title>

          <v-list>
            <v-list-tile
              v-for="item in pages"
              :key="item.text"
              :prepend-icon="item.action"
              :to="item.to"
              :href="item.href"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>

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
  import { mapState } from 'vuex'

  export default {
    name: 'Home',
    components: {
      GameCard: () => import('@/components/GameCard')
    },
    computed: {
      ...mapState('pages', ['pages']),
      ...mapState('games', ['games'])
    }
  }
</script>
