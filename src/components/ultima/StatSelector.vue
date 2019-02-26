<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title v-text="name" />
    </v-list-tile-content>
    <v-list-tile-action>
      <v-text-field
        v-model.number="value"
        type="number"
        :min="10"
        :max="maxValue"
      />
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'StatSelector',
    props: {
      name: {
        type: String,
        default: ''
      },
      stat: {
        type: String,
        default: null
      }
    },
    computed: {
      ...mapState('pc', ['stats', 'points']),
      value: {
        get () { return this.stats[this.stat] },
        set (value) { this.usePoints({ stat: this.stat, value: parseInt(value) }) }
      },
      maxValue () {
        const maxPoints = this.value + this.points
        return maxPoints >= 25 ? 25 : maxPoints
      }
    },
    methods: {
      ...mapActions('pc', ['usePoints'])
    }
  }
</script>

<style scoped>

</style>
