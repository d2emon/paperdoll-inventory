<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs8>
        <v-card
          v-if="active"
          height="125px"
        >
          <v-avatar
            size="120"
          >
            <img
              :src="avatar"
              :alt="name"
            >
          </v-avatar>
        </v-card>
        <v-card
          v-else
          height="125px"
        >
          <v-card-title>
            <h3>{{name}}</h3>
          </v-card-title>
          <v-layout row>
            <v-flex xs6>
              Left
            </v-flex>
            <v-flex xs6>
              Right
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card
          height="125px"
        >
          <v-card-text>
            <v-progress-linear :value="90"></v-progress-linear>
            <v-progress-linear :value="90"></v-progress-linear>
            <v-progress-linear :value="90"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    name: 'PartyMember',
    props: [
      'name',
      'avatar',
      'active'
    ]
  }
</script>

<style scoped>

</style>
