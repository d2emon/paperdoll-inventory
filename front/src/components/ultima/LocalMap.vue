<template>
  <div class="game-map">
    <v-img
      v-for="(item, id) in localMap"
      :key="`location-${id}`"
      class="map-item"
      :style="`left: ${(item.x + xOffset) * 32}px; top: ${(item.y + yOffset) * 32}px;`"
      :src="images[item.location_type.image_id]"
      :title="JSON.stringify(item)"
    />
    <v-img
      v-for="(item, id) in castles"
      :key="`castle-${id}`"
      class="map-item"
      :style="`left: ${(item.x + xOffset) * 32}px; top: ${(item.y + yOffset) * 32}px;`"
      :src="castleImage"
    />
    <v-img
      v-for="(item, id) in cities"
      :key="`city-${id}`"
      class="map-item"
      :style="`left: ${(item.x + xOffset) * 32}px; top: ${(item.y + yOffset) * 32}px;`"
      :src="castleImage"
    />
    <v-img
      class="map-item player-character"
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
      castleImage: `${process.env.BASE_URL}ultima/castle.png`,
      images: [
        null,
        `${process.env.BASE_URL}ultima/grass.png`,
        `${process.env.BASE_URL}ultima/water.png`,
        `${process.env.BASE_URL}ultima/trees.png`,
        `${process.env.BASE_URL}ultima/grass.png`, // Mountains
        `${process.env.BASE_URL}ultima/castle.png`
      ],
      xOffset: 9,
      yOffset: 4,
    }),
    computed: {
      ...mapState('view', [
        'localMap',
        'castles',
        'cities',
      ])
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
    top: 128px;
    left: 288px;
    /* z-index: 10; */
  }
</style>
