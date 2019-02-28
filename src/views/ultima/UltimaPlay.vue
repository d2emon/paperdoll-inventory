<template>
  <v-card>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <div
          v-if="inCastle"
        >
          CASTLE
        </div>
        <local-map
          v-else
        />
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex xs9>
        <v-card height="175px">
          <game-console />
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card height="175px">
          <character-summary />
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn @click="goDirection('North')">
      North
    </v-btn>
    <v-btn @click="goDirection('East')">
      East
    </v-btn>
    <v-btn @click="goDirection('South')">
      South
    </v-btn>
    <v-btn @click="goDirection('West')">
      West
    </v-btn>
    <v-btn
      v-if="location.castle && !inCastle"
      @click="enterCastle"
    >
      Enter
    </v-btn>
    <v-btn
      v-if="inCastle"
      @click="exitCastle"
    >
      Exit
    </v-btn>
  </v-card>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'UltimaPlay',
    components: {
      CharacterSummary: () => import('@/components/ultima/CharacterSummary'),
      LocalMap: () => import('@/components/ultima/LocalMap'),
      GameConsole: () => import('@/components/ultima/GameConsole')
    },
    data: () => ({
      inCastle: false
    }),
    computed: {
      ...mapState('pc', [
        'ready',
        'position'
      ]),
      ...mapState('view', ['location'])
    },
    mounted () {
      if (!this.ready) return this.$router.push('/ultima')

      this.fetchView(this.position)
      this.doCommand({})
    },
    methods: {
      ...mapActions('view', ['fetchView']),
      ...mapActions('gameConsole', ['doCommand']),
      goDirection (direction) {
        this.doCommand({ command: 'Go', direction })
          .then(() => this.fetchView(this.position))
      },
      enterCastle () {
        this.doCommand({ command: 'Enter', location: this.location.castle })
          .then(() => { this.inCastle = true })
      },
      exitCastle () {
        this.inCastle = false
      }
    }
  }
</script>

<style scoped>
</style>
