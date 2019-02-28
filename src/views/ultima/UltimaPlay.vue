<template>
  <v-card>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <local-map />
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
    <v-btn
      @click="goDirection('North')"
    >
      North
    </v-btn>
    <v-btn
      @click="goDirection('East')"
    >
      East
    </v-btn>
    <v-btn
      @click="goDirection('South')"
    >
      South
    </v-btn>
    <v-btn
      @click="goDirection('West')"
    >
      West
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
      playerImage: `${process.env.BASE_URL}ultima/pc.png`,
      images: [
        `${process.env.BASE_URL}ultima/grass.png`,
        `${process.env.BASE_URL}ultima/water.png`,
        `${process.env.BASE_URL}ultima/trees.png`,
        `${process.env.BASE_URL}ultima/grass.png`, // Mountains
        `${process.env.BASE_URL}ultima/castle.png`
      ]
    }),
    computed: {
      ...mapState('pc', [
        'ready',
        'location'
      ])
    },
    mounted () {
      if (!this.ready) this.$router.push('/ultima')

      this.fetchView(this.location)
      this.doCommand('')
    },
    methods: {
      ...mapActions('view', ['fetchView']),
      ...mapActions('gameConsole', ['doCommand']),
      goDirection (direction) {
        this.doCommand(direction)
          .then(() => this.fetchView(this.location))
      }
    }
  }
</script>

<style scoped>
</style>
