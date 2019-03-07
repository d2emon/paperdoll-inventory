<template>
  <div class="game-map">
    <v-img
      v-for="(item, id) in locations"
      :key="`location-${id}`"
      class="map-item"
      :style="`left: ${item.x * 16}px; top: ${item.y * 16}px;`"
      :src="images[item.location_type.image_id]"
      :title="JSON.stringify(item)"
    />
    <v-img
      v-for="(item, id) in people"
      :key="`people-${id}`"
      class="map-item"
      :style="`left: ${item.x * 16}px; top: ${item.y * 16}px;`"
      :src="playerImage"
    />
    <v-img
      class="map-item player-character"
      :style="`left: ${position.x * 16}px; top: ${position.y * 16}px;`"
      :src="playerImage"
    />
  </div>
</template>

<script>
  import {
    mapState,
    mapActions,
  } from 'vuex'

  export default {
    name: 'CastleMap',
    data: () => ({
      playerImage: `${process.env.BASE_URL}ultima/pc.png`,
      images: [
        `${process.env.BASE_URL}ultima/grass.png`,
        `${process.env.BASE_URL}ultima/trees.png`,
        `${process.env.BASE_URL}ultima/castle.png`,
        `${process.env.BASE_URL}ultima/water.png`,
        `${process.env.BASE_URL}ultima/trees.png`,
        `${process.env.BASE_URL}ultima/castle.png`,
        `${process.env.BASE_URL}ultima/trees.png`,
      ]
    }),
    computed: {
      ...mapState('castle', [
        'locations',
        'people',
        'castle'
      ]),
      ...mapState('pc', [
        'position',
        'castleId',
      ])
    },
    methods: {
      ...mapActions('castle', ['fetchCastle'])
    },
    mounted () { this.fetchCastle(this.castleId) }
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
