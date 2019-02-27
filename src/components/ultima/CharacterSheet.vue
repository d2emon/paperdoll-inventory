<template>
  <v-card
    height="450px"
  >
    <v-card-title
      v-if="name"
    >
      <h3 v-text="name" />
    </v-card-title>

    <v-list dense>
      <v-list-tile>
        <v-list-tile-content>Strength:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{stats.strength}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Agility:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{stats.agility}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Stamina:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{stats.stamina}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Charisma:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{stats.charisma}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Wisdom:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{stats.wisdom}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Intelligence:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{stats.intelligence}}</v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider />

    <v-list dense>
      <v-list-tile
        v-if="race"
      >
        <v-list-tile-content>Race:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{race.name}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-if="sex"
      >
        <v-list-tile-content>Sex:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{sex.name}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-if="characterClass"
      >
        <v-list-tile-content>Class:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{characterClass.name}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'CharacterSheet',
    computed: {
      ...mapState('pc', [
        'stats',
        'race',
        'sex',
        'characterClass',
        'name'
      ]),
    }
  }
</script>

<style scoped>

</style>
