<template>
  <div>
    <v-card>
      <v-layout row>
        <v-flex>
          <v-layout row>
            <v-flex
              xs3
              v-for="(pc, id) in party"
              @click="select(pc)"
            >
              <party-member
                :name="pc.name"
                :avatar="pc.avatar"
                :active="pc === selected"
              />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs2>
          <party-order
            :party="party"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex>
          <inventory :pc="selected" />
        </v-flex>
        <v-flex xs3>
          <h2>Club</h2>
          <v-card>
            <v-tabs
              dark
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab href="#tab-1">
                1
              </v-tab>

              <v-tab href="#tab-2">
                2
              </v-tab>

              <v-tab href="#tab-3">
                3
              </v-tab>

              <v-tab href="#tab-4">
                Gitty
              </v-tab>

              <v-tab-item
                v-for="i in 4"
                :key="i"
                :value="'tab-' + i"
              >
                <v-card flat>
                  <v-toolbar>
                    <v-btn icon>A</v-btn>
                    <v-btn icon>A</v-btn>
                    <v-btn icon>A</v-btn>
                    <v-btn icon>A</v-btn>
                    <v-btn icon>A</v-btn>
                    <v-btn icon>A</v-btn>
                  </v-toolbar>
                  <v-layout row wrap>
                    <v-flex>&nbsp;</v-flex>
                    <v-flex xs2>
                      <v-btn icon>&lt;</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>

          <v-card>
            <v-layout row wrap>
              <v-flex xs3>
                <v-btn block>1</v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn block>2</v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn block>3</v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn block>4</v-btn>
              </v-flex>
            </v-layout>
          </v-card>

          <v-card>
            <v-layout row wrap>
              <v-flex xs4>
                <v-btn block>Left</v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn block>Forward</v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn block>Right</v-btn>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <v-btn block>Left</v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn block>Backward</v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn block>Right</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
  const party = [
    {
      name: 'Hissa',
      avatar: 'https://cdn.vuetifyjs.com/images/john.jpg'
    },
    {
      name: 'Stamm',
      avatar: 'https://cdn.vuetifyjs.com/images/john.jpg'
    },
    {
      name: 'Gothmog',
      avatar: 'https://cdn.vuetifyjs.com/images/john.jpg'
    },
    {
      name: 'Gitty',
      avatar: 'https://cdn.vuetifyjs.com/images/john.jpg'
    },
  ];

  export default {
    name: 'DungeonMaster',
    components: {
      PartyMember: () => import('@/components/dm/PartyMember'),
      PartyOrder: () => import('@/components/dm/PartyOrder'),
      Inventory: () => import('@/components/dm/Inventory')
    },
    data: () => ({
      party,
      selected: party[0]
    }),
    methods: {
      select(pc) {
        this.selected = pc;
      }
    }
  }
</script>

<style scoped>

</style>
