<template>
  <v-card>
    <v-card-title class="headline">
      Character Generation
    </v-card-title>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Distribute points</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Select thy race</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Select thy sex</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-card-title>
              <h3>Points left to distribute: {{ points }}</h3>
            </v-card-title>

            <v-list>
              <stat-selector
                v-for="stat in stats"
                :key="stat.name"
                :name="stat.name"
                :stat="stat.stat"
              />
            </v-list>
          </v-card>

          <v-btn
            color="primary"
            :disabled="!canSelectRace"
            @click="selectRace"
          >
            Continue
          </v-btn>

          <v-btn
            flat
            to="/ultima"
          >
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-title>
              <h3>Select thy race:</h3>
            </v-card-title>

            <v-list>
              <v-list-tile
                v-for="r in races"
                :key="r.id"
                :color="race && race.id === r.id ? 'primary' : undefined"
                @click="setRace(r)"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="r.name" />
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>

          <v-btn
            color="primary"
            :disabled="!canSelectSex"
            @click="selectSex"
          >
            Continue
          </v-btn>

          <v-btn
            flat
            @click="selectStats"
          >
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
            <v-card-title>
              <h3>Select thy sex:</h3>
            </v-card-title>

            <v-list>
              <v-list-tile
                v-for="s in sexes"
                :key="s.id"
                :color="sex && sex.id === s.id ? 'primary' : undefined"
                @click="setSex(s)"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="s.name" />
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>

          <v-btn
            color="primary"
            :disabled="!canSelectClass"
            @click="selectClass"
          >
            Continue
          </v-btn>

          <v-btn
            flat
            @click="selectRace"
          >
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card>
            <v-card-title>
              <h3>Select thy class:</h3>
            </v-card-title>

            <v-list>
              <v-list-tile
                v-for="c in classes"
                :key="c.id"
                :color="characterClass && characterClass.id === c.id ? 'primary' : undefined"
                @click="setClass(c)"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="c.name" />
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>

          <v-btn
            color="primary"
            :disabled="!canSelectSex"
            @click="selectSex"
          >
            Continue
          </v-btn>

          <v-btn
            flat
            @click="selectSex"
          >
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'UltimaGenerator',
    components: {
      StatSelector: () => import('@/components/ultima/StatSelector')
    },
    data: () => ({
      step: 1,
      stats: [
        { name: 'Strength', stat: 'strength' },
        { name: 'Agility', stat: 'agility' },
        { name: 'Stamina', stat: 'stamina' },
        { name: 'Charisma', stat: 'charisma' },
        { name: 'Wisdom', stat: 'wisdom' },
        { name: 'Intelligence', stat: 'intelligence' }
      ]
    }),
    computed: {
      ...mapState('pc', [
        'points',
        'races',
        'sexes',

        'race',
        'sex',
        'characterClass'
      ]),
      canSelectRace () { return this.points === 0 && this.step === 1 },
      canSelectSex () { return this.race !== null && this.step === 2 }
      canSelectClass () { return this.sex !== null && this.step === 3 }
    },
    mounted () {
      this.createCharacter()
    },
    methods: {
      ...mapActions('pc', [
        'createCharacter',
        'fetchRaces',
        'fetchSexes'
      ]),
      ...mapMutations('pc', [
        'setRace',
        'setSex'
      ]),
      selectStats () { this.step = 1 },
      selectRace () {
        this.fetchRaces()
          .then(() => { this.step = 2 })
      },
      selectSex () {
        this.fetchSexes()
          .then(() => { this.step = 3 })
      },
      selectClass () {
        this.fetchClasses()
          .then(() => { this.step = 4 })
      }
    }
  }
</script>

<style scoped>

</style>
