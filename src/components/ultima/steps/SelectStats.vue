<template>
  <v-card
    height="400px"
    flat
  >
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
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'SelectStats',
    components: {
      StatSelector: () => import('@/components/ultima/steps/StatSelector')
    },
    data: () => ({
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
      ...mapState('pc', ['points'])
    }
  }
</script>
