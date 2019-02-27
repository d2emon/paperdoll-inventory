<template>
  <v-card
    flat
    height="400px"
  >
    <v-card-title>
      <h3 v-text="title" />
    </v-card-title>

    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.id"
        :color="selected && selected.id === item.id ? 'primary' : undefined"
        @click="onClick(item)"
      >
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'ListSelector',
    props: {
      title: {
        type: String,
        default: ''
      },
      items: {
        type: Array,
        default: () => []
      },
      selected: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      onClick (item) { this.$emit('select', item) }
    }
  }
</script>

<style scoped>

</style>
