<template>
  <v-card>
    <v-card-title class="headline">
      Character Generation
    </v-card-title>

    <v-stepper v-model="step">
      <v-stepper-header>
        <template
          v-for="(title, id) in steps"
        >
          <v-stepper-step
            :key="id"
            :complete="(step > id + 1) || toSave"
            :step="id + 1"
          >
            {{ title }}
          </v-stepper-step>
          <v-divider
            v-if="id < steps.length - 1"
            :key="`divider-${id}`"
          />
        </template>
      </v-stepper-header>

      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
        >
          <character-sheet />
        </v-flex>
        <v-flex
          xs12
          sm6
        >
          <v-card
            height="450px"
          >
            <v-stepper-items>
              <v-stepper-content step="1">
                <select-stats />
              </v-stepper-content>

              <v-stepper-content step="2">
                <list-selector
                  title="Select thy race:"
                  :items="races"
                  :selected="race"
                  @select="onSelectRace"
                />
              </v-stepper-content>

              <v-stepper-content step="3">
                <list-selector
                  title="Select thy sex:"
                  :items="sexes"
                  :selected="sex"
                  @select="onSelectSex"
                />
              </v-stepper-content>

              <v-stepper-content step="4">
                <list-selector
                  title="Select thy class:"
                  :items="classes"
                  :selected="characterClass"
                  @select="onSelectClass"
                />
              </v-stepper-content>

              <v-stepper-content step="5">
                <select-name />
              </v-stepper-content>
            </v-stepper-items>
          </v-card>
        </v-flex>
      </v-layout>
    </v-stepper>

    <v-card-actions>
      <v-btn
        color="primary"
        :disabled="step <= 1"
        @click.stop="prevStep"
      >
        Prev
      </v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="!canNext"
        @click.stop="nextStep"
      >
        Next
      </v-btn>
    </v-card-actions>

    <save-dialog
      v-model="toSave"
      @save="onSave"
    />
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
      SelectStats: () => import('@/components/ultima/steps/SelectStats'),
      ListSelector: () => import('@/components/ultima/ListSelector'),
      SelectName: () => import('@/components/ultima/steps/SelectName'),
      CharacterSheet: () => import('@/components/ultima/CharacterSheet'),
      SaveDialog: () => import('@/components/ultima/SaveDialog')
    },
    data: () => ({
      step: 1,
      steps: [
        'Distribute points',
        'Select thy race',
        'Select thy sex',
        'Select thy class',
        'Select thy name'
      ],
      toSave: false
    }),
    computed: {
      ...mapState('pc', [
        'points',
        'races',
        'sexes',
        'classes',

        'stats',
        'race',
        'sex',
        'characterClass',
        'name'
      ]),
      canNext () {
        switch (this.step) {
          case 1:
            return this.points === 0
          case 2:
            return this.race !== null
          case 3:
            return this.sex !== null
          case 4:
            return this.characterClass !== null
          case 5:
            return !!this.name
        }
        return false
      }
    },
    mounted () {
      this.createCharacter()
    },
    methods: {
      ...mapActions('pc', [
        'createCharacter',
        'saveCharacter',
        'fetchRaces',
        'fetchSexes',
        'fetchClasses'
      ]),
      ...mapMutations('pc', [
        'setRace',
        'setSex',
        'setClass',
        'setName'
      ]),
      selectStats () { this.step = 1 },
      selectRace () { this.fetchRaces().then(() => { this.step = 2 }) },
      selectSex () { this.fetchSexes().then(() => { this.step = 3 }) },
      selectClass () { this.fetchClasses().then(() => { this.step = 4 }) },
      selectName () { this.step = 5 },
      askForSave () { this.toSave = true },
      goToStep (step) {
        switch (step) {
          case 1:
            return this.selectStats()
          case 2:
            return this.selectRace()
          case 3:
            return this.selectSex()
          case 4:
            return this.selectClass()
          case 5:
            return this.selectName()
          case 6:
            return this.askForSave()
        }
      },
      prevStep () { this.goToStep(this.step - 1) },
      nextStep () { this.goToStep(this.step + 1) },
      onSelectRace (selected) {
        this.setRace(selected)
        this.nextStep()
      },
      onSelectSex (selected) {
        this.setSex(selected)
        this.nextStep()
      },
      onSelectClass (selected) {
        this.setClass(selected)
        this.nextStep()
      },
      onSave () { this.saveCharacter().then(() => this.$router.push('/ultima')) }
    }
  }
</script>

<style scoped>

</style>
