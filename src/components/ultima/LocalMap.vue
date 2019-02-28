<template>
  <div class="game-map">
    <v-img
      v-for="(item, id) in localMap"
      :key="`${id}`"
      class="map-item"
      :style="`left: ${item.x * 32}px; top: ${item.y * 32}px;`"
      :src="images[item.locationType]"
    />
    <v-img
      class="player-character"
      :src="playerImage"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'LocalMap',
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
      ...mapState('pc', ['location']),
      ...mapState('view', ['localMap']),
    }
  }
</script>

<style scoped>
  .game-map {
    background-color: black;
    height: 300px;
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
