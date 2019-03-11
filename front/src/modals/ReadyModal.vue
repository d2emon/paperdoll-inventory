<template>
  <selection-modal
    title="Ready Weapon, Armor, Spell:"
    :items="toReady"
    :value="value"
    @input="input"
    @select="select"
    @ready="ready"
  >
    <v-flex
      xs6
      v-if="readyType === 1"
    >
      <v-text-field
        v-model="spell"
        type="number"
        label="Drop pence:"
        :min="0"
        :max="coin"
      />
    </v-flex>
    <v-flex
      xs6
      v-else-if="readyType === 2"
    >
      <v-text-field
        v-model="weapon"
        type="number"
        label="Drop weapon:"
      />
    </v-flex>
    <v-flex
      xs6
      v-else-if="readyType === 3"
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
  const WEAPON = 1
  const ARMOR = 2
  const SPELL = 3

  export default {
    name: 'ReadyModal',
    components: {
      SelectionModal: () => import('@/modals/SelectionModal')
    },
    props: {
      value: Boolean,
      coin: Number,
    },
    data: () => ({
      visible: false,
      toReady: [
        { id: WEAPON, title: 'Weapon' },
        { id: ARMOR, title: 'Armor' },
        { id: SPELL, title: 'Spell' },
      ],
      readyType: 0,

      weapons: [],
      armors: [],
      spells: [],

      weapon: null,
      armor: null,
      spell: null,
    }),
    watch: {
      value (value) {
        this.readyType = 0
        this.weapon = null
        this.armor = null
        this.spell = null
      },
    },
    methods: {
      select (selected) { this.readyType = selected },
      ready () { this.$emit('ready', {
        weapon: this.weapon,
        armor: this.armor,
        spell: this.spell,
      }) },
      input (value) { this.$emit('input', value) }
    }
  }
</script>

<style scoped>

</style>
