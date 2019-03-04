<template>
  <v-card
    :to="game.link"
  >
    <v-card-title
      class="headline"
      v-text="game.title"
    />

    <v-img
      :src="game.image"
      height="200px"
    />

    <v-card-actions>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-favorite</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'GameCard',
    props: {
      game: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style scoped>

</style>
