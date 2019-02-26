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
        @click="loadCharacter"
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
  import { mapActions } from 'vuex'

  export default {
    name: 'UltimaStart',
    methods: {
      ...mapActions('pc', ['loadCharacter'])
    }
  }
</script>

<style scoped>

</style>
