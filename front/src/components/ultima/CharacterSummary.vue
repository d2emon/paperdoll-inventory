<template>
  <v-list
    dense
    class="character-summary"
  >
    <v-list-tile>
      <v-list-tile-content>Hits:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{hp}}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>Food:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{Math.ceil(food)}}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>Exp:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{xp}}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>Coin:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{coin}}</v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CharacterSummary',
    computed: {
      ...mapState('pc', [
        'hp',
        'food',
        'xp',
        'coin'
      ])
    }
  }
</script>

<style scoped>
  .character-summary {
    background-color: black;
    color: white;
  }

</style>
