<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>{{pc.name}}</v-toolbar-title>
      <v-spacer />
      <v-btn icon>Save</v-btn>
      <v-btn icon>Sleep</v-btn>
      <v-btn icon>X</v-btn>
    </v-toolbar>

    <doll />

    <v-layout row wrap>
      <v-flex xs4>
        <v-btn icon><v-icon>mdi-eye</v-icon></v-btn>

        <v-layout row wrap>
          <v-flex xs6>
            <div>
              <v-btn>Neck</v-btn>
            </div>
            <div>
              <v-btn>Right Hand</v-btn>
            </div>
            <div>
              <v-btn>Right Belt</v-btn>
            </div>
            <div>
              <v-btn>Right Belt</v-btn>
            </div>
          </v-flex>
          <v-flex xs6>
            <div>
              <v-btn>Head</v-btn>
            </div>
            <div>
              <v-btn>Torso</v-btn>
            </div>
            <div>
              <v-btn>Panties</v-btn>
            </div>
            <div>
              <v-btn>Boots</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs8>
        <v-layout row>
          <v-flex>
            <v-btn icon><v-icon>mdi-comment</v-icon></v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
          <v-flex>
            <v-btn>Backpack</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <div>
              <v-btn>Left Hand</v-btn>
            </div>
            <div>
              <v-btn>Left Belt</v-btn>
              <v-btn>Left Belt</v-btn>
            </div>
            <div>
              <v-btn>Left Belt</v-btn>
              <v-btn>Left Belt</v-btn>
            </div>
          </v-flex>
          <v-flex xs8>
            <v-layout row wrap>
              <v-flex xs6>
                <v-btn block>Resurrect</v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn block>Reincarnate</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6>
        <v-layout row>
          <v-flex xs6>Health</v-flex>
          <v-flex xs3>75/</v-flex>
          <v-flex xs3>75</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>Stamina</v-flex>
          <v-flex xs3>80/</v-flex>
          <v-flex xs3>80</v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>Mana</v-flex>
          <v-flex xs3>0/</v-flex>
          <v-flex xs3>0</v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout row>
          <v-flex xs12>
            <v-btn block>Cancel</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>Load</v-flex>
          <v-flex xs3>7.0/</v-flex>
          <v-flex xs3>52 kg</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <img :src="require('@/assets/dm/dungeon_master_25.png')">
  </v-card>
</template>

<script>
  export default {
    name: 'Inventory',
    components: {
      Doll: () => import('@/components/dm/Doll')
    },
    props: [
      "pc"
    ]
  }
</script>

<style scoped>

</style>
