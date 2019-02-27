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
        <v-layout
          v-for="(row, j) in localMap"
          :key="`row-${j}`"
          row
        >
          <v-flex
            v-for="(col, i) in row"
            :key="`col-${i}-${j}`"
          >
            <v-img
              v-if="(i === 10) && (j === 5)"
              :src="require('@/assets/ultima/pc.png')"
            />
            <v-img
              v-else-if="col.image"
              :src="col.image"
            />
          </v-flex>
        </v-layout>
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
      @click="doCommand('North')"
    >
      North
    </v-btn>
    <v-btn
      @click="doCommand('East')"
    >
      East
    </v-btn>
    <v-btn
      @click="doCommand('South')"
    >
      South
    </v-btn>
    <v-btn
      @click="doCommand('West')"
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
      ...mapState('pc', ['location']),
      ...mapState('view', ['localMap']),
      ...mapState('gameConsole', ['text'])
    },
    mounted () {
      this.fetchView()
      this.doCommand('')
    },
    methods: {
      ...mapActions('view', ['fetchView']),
      ...mapActions('gameConsole', ['doCommand'])
    }
  }
</script>

<style scoped>
.game-map {
  background-color: black;
}

.game-console {
  display: flex;
  background-color: black;
  color: white;
  height: 175px;
  overflow: auto;
}
</style>
