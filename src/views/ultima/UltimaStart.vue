<template>
  <v-card>
    <v-card-title class="headline">
      Ultima I
    </v-card-title>
    <v-card-text>
      from darkest dungeons, to deepest space
    </v-card-text>
    <v-list>
      <v-list-tile
        to="/ultima/generate"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            Генерировать нового персонажа
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        to="/ultima/characters"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            Продолжить предыдущую игру
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'UltimaStart'
  }
</script>

<style scoped>

</style>
