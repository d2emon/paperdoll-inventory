<template>
  <v-dialog
    v-model="visible"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        {{title}}
      </v-card-title>

      <v-container>
        <v-layout
          row
          wrap
        >
          <v-flex xs6>
            <v-radio-group v-model="selected">
              <v-radio
                v-for="item in items"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <slot />
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="ready"
        >
          Ok
        </v-btn>

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'SelectionModal',
    props: {
      value: Boolean,
      coin: Number,
      title: String,
      items: Array
    },
    data: () => ({
      visible: false,
      selected: 0
    }),
    watch: {
      value (value) {
        this.selected = 0
        this.visible = value
      },
      visible (value) { this.$emit('input', value) },
      selected (value) { this.$emit('select', value) }
    },
    methods: {
      close () {
        this.visible = false
      },
      ready () {
        this.$emit('ready')
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
