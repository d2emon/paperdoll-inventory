<template>
  <v-card>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        class="game-map"
      >
        <template
          v-for="(item, id) in localMap"
        >
          <div
            :key="`${id}`"
            class="map-item"
            :style="`left: ${item.x * 32}px; top: ${item.y * 32}px;`"
          >
            <v-img
              :src="item.image"
            />
          </div>
        </template>
        <div
          class="player-character"
        >
          <v-img
            :src="require('@/assets/ultima/pc.png')"
          />
        </div>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex xs9>
        <v-card
          height="175px"
          class="game-console"
        >
          <p
            v-for="(s, id) in text"
            :key="id"
            v-text="s"
          />
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card
          height="175px"
        >
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
      CharacterSummary: () => import('@/components/ultima/CharacterSummary')
    },
    data: () => ({
      image: `${process.env.BASE_URL}games/ultima.jpg`
    }),
    computed: {
      ...mapState('pc', [
        'ready',
        'location'
      ]),
      ...mapState('view', ['localMap']),
      ...mapState('gameConsole', ['text'])
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
.game-map {
  background-color: black;
  height: 300px;
}

.game-console {
  background-color: black;
  color: white;
  height: 175px;
  overflow: auto;
}

.map-item {
  width: 32px;
  height: 32px;
  overflow: hidden;
  position: absolute;
  z-index: 0;
}

.player-character {
  width: 32px;
  height: 32px;
  overflow: hidden;
  position: absolute;
  top: 128px;
  left: 288px;
  z-index: 10;
}
</style>
