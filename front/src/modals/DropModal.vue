<template>
  <v-dialog
    v-model="visible"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Drop Pence, Weapon, Armor?
      </v-card-title>

      <v-container>
        <v-layout
          row
          wrap
        >
          <v-flex xs6>
            <v-radio-group v-model="dropType">
              <v-radio
                v-for="d in drops"
                :key="d.id"
                :label="d.title"
                :value="d.id"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex
            xs6
            v-if="dropType === 1"
          >
            <v-text-field
              v-model="pence"
              type="number"
              label="Drop pence:"
              :min="0"
              :max="coin"
            />
          </v-flex>
          <v-flex
            xs6
            v-else-if="dropType === 2"
          >
            <v-text-field
              v-model="dropWeapon"
              type="number"
              label="Drop weapon:"
            />
          </v-flex>
          <v-flex
            xs6
            v-else-if="dropType === 3"
          >
            <v-text-field
              v-model="dropArmor"
              type="number"
              label="Drop armor:"
            />
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="drop"
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
  const PENCE = 1
  const WEAPON = 2
  const ARMOR = 3

  export default {
    name: 'DropModal',
    props: {
      value: Boolean,
      coin: Number,
    },
    data: () => ({
      visible: false,
      drops: [
        { id: PENCE, title: 'Pence' },
        { id: WEAPON, title: 'Weapon' },
        { id: ARMOR, title: 'Armor' },
      ],
      dropType: 0,
      pence: 0,
      dropWeapon: 0,
      dropArmor: 0,
    }),
    watch: {
      value (value) {
        this.pence = 0
        this.visible = value
      },
      visible (value) { this.$emit('input', value) }
    },
    methods: {
      close () {
        this.visible = false
      },
      drop () {
        this.close()
        this.$emit('drop', { pence: this.pence })
      }
    }
  }
</script>

<style scoped>

</style>
