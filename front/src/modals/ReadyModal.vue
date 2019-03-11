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
      <v-radio-group v-model="weapon">
        <v-radio
          label="Hands"
          :value="0"
        ></v-radio>
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
      v-else-if="readyType === 2"
    >
        <v-radio
          v-for="item in armors"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></v-radio>
    </v-flex>
    <v-flex
      xs6
      v-else-if="readyType === 3"
    >
        <v-radio
          v-for="item in spells"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></v-radio>
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
      weapons: Array,
    },
    data: () => ({
      visible: false,
      toReady: [
        { id: WEAPON, title: 'Weapon' },
        { id: ARMOR, title: 'Armor' },
        { id: SPELL, title: 'Spell' },
      ],
      readyType: null,

      armors: [],
      spells: [],

      weapon: null,
      armor: null,
      spell: null,
    }),
    watch: {
      value (value) {
        this.readyType = null
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
