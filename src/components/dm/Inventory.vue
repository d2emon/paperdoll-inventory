<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>{{pc.name}}</v-toolbar-title>
      <v-spacer />
      <v-btn icon>Save</v-btn>
      <v-btn icon>Sleep</v-btn>
      <v-btn icon>X</v-btn>
    </v-toolbar>
    <img :src="require('@/assets/dm/dungeon_master_25.png')">
  </v-card>
</template>

<script>
  export default {
    name: 'Inventory',
    props: [
      "pc"
    ]
  }
</script>

<style scoped>

</style>
