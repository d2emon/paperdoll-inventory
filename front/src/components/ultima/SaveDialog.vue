<template>
  <v-dialog
    v-model="visible"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Save thy character?
      </v-card-title>

      <character-sheet />

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="onSave"
        >
          Yes
        </v-btn>

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="close"
        >
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'SaveDialog',
    components: {
      CharacterSheet: () => import('@/components/ultima/CharacterSheet')
    },
    props: {
      value: Boolean
    },
    data: () => ({
      visible: false
    }),
    watch: {
      value (value) { this.visible = value },
      visible (value) { this.$emit('input', value) }
    },
    methods: {
      close () { this.visible = false },
      onSave () {
        this.close()
        this.$emit('save')
      }
    }
  }
</script>

<style scoped>

</style>
