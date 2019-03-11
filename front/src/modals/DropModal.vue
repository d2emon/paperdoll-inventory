<template>
  <selection-modal
    title="Drop Pence, Weapon, Armor?"
    :items="drops"
    :value="value"
    @input="input"
    @select="select"
    @ready="ready"
  >
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
      <v-radio-group v-model="weapon">
        <v-radio
          v-for="item in weapons"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex
      xs6
      v-else-if="dropType === 3"
    >
      <v-text-field
        v-model="armor"
        type="number"
        label="Drop armor:"
      />
    </v-flex>
  </selection-modal>
</template>

<script>
  const PENCE = 1
  const WEAPON = 2
  const ARMOR = 3

  export default {
    name: 'DropModal',
    components: {
      SelectionModal: () => import('@/modals/SelectionModal')
    },
    props: {
      value: Boolean,
      coin: Number,
      weapons: Array,
    },
    data: () => ({
      dropType: null,
      drops: [
        { id: PENCE, title: 'Pence' },
        { id: WEAPON, title: 'Weapon' },
        { id: ARMOR, title: 'Armor' },
      ],
      pence: null,
      weapon: null,
      armor: null,
    }),
    watch: {
      value (value) {
        this.dropType = null
        this.pence = null
        this.weapon = null
        this.armor = null
      },
    },
    methods: {
      select (selected) { this.dropType = selected },
      ready () { this.$emit('drop', {
        coins: this.pence,
        weapon: this.weapon,
        armor: this.armor,
      }) },
      input (value) { this.$emit('input', value) }
    }
  }
</script>

<style scoped>

</style>
