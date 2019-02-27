<template>
  <v-card>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="image"
          height="400px"
        />
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex xs9>
        Console
      </v-flex>
      <v-flex xs3>
        Stats
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    name: 'UltimaPlay',
    data: () => ({
      image: `${process.env.BASE_URL}games/ultima.jpg`
    })
  }
</script>

<style scoped>

</style>
