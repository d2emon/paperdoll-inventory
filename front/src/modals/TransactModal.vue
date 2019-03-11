<template>
  <selection-modal
    title="Transact with"
    :items="characters"
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
  export default {
    name: 'TransactModal',
    components: {
      SelectionModal: () => import('@/modals/SelectionModal')
    },
    props: {
      value: Boolean,
      characters: Array,
    },
    data: () => ({
      visible: false,
      characterId: null,

      weapons: [],
      armors: [],
      spells: [],

      weapon: null,
      armor: null,
      spell: null,
    }),
    watch: {
      value (value) {
        this.characterId = null
        this.weapon = null
        this.armor = null
        this.spell = null
      },
    },
    methods: {
      select (selected) { this.characterId = selected },
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
