<template>
  <v-card>
    <v-card-title class="headline">
      Character Selection
    </v-card-title>

    <list-selector
      :items="characters"
      @select="onSelect"
    />
  </v-card>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'UltimaCharacters',
    components: {
      ListSelector: () => import('@/components/ultima/ListSelector')
    },
    computed: {
      ...mapState('pc', ['error', 'characters'])
    },
    mounted () {
      this.fetchCharacters()
        .then(() => {
          if (this.error) this.$router.push('/ultima')
        })
    },
    methods: {
      ...mapActions('pc', [
        'fetchCharacters',
        'loadCharacter'
      ]),
      onSelect (item) {
        this.loadCharacter(item.character_id)
        this.$router.push('/ultima/play')
      }
    }
  }
</script>

<style scoped>

</style>
