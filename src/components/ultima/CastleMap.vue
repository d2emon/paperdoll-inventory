<template>
  <div class="game-map">
    <v-img
      v-for="(item, id) in castleMap"
      :key="`location-${id}`"
      class="map-item"
      :style="`left: ${item.x * 16}px; top: ${item.y * 16}px;`"
      :src="images[item.locationType]"
    />
    <v-img
      class="map-item player-character"
      :style="`left: ${position.x * 16}px; top: ${position.y * 16}px;`"
      :src="playerImage"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CastleMap',
    data: () => ({
      playerImage: `${process.env.BASE_URL}ultima/pc.png`,
      castleImage: `${process.env.BASE_URL}ultima/castle.png`,
      images: [
        `${process.env.BASE_URL}ultima/grass.png`,
        `${process.env.BASE_URL}ultima/trees.png`,
        `${process.env.BASE_URL}ultima/trees.png`,
        `${process.env.BASE_URL}ultima/water.png`,
        `${process.env.BASE_URL}ultima/castle.png`
      ]
    }),
    computed: {
      ...mapState('view', [
        'castleMap',
        'castles',
        'castle'
      ]),
      ...mapState('pc', ['position'])
    }
  }
</script>

<style scoped>
  .game-map {
    background-color: black;
    height: 300px;
  }

  .map-item {
    width: 16px;
    height: 16px;
    overflow: hidden;
    position: absolute;
    z-index: 0;
  }

  .player-character {
    z-index: 10;
  }
</style>
