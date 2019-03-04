<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs4>
        <v-btn block color="primary" dark>
          <v-icon>mdi-undo</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn block color="primary" dark>
          <v-icon>mdi-arrow-up-bold</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn block color="primary" dark>
          <v-icon>mdi-redo</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs4>
        <v-btn block color="primary" dark>
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn block color="primary" dark>
          <v-icon>mdi-arrow-down-bold</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn block color="primary" dark>
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
    export default {
        name: "Movement"
    }
</script>

<style scoped>

</style>
