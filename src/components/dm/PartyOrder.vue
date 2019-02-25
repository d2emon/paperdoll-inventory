<template>
  <v-layout row wrap>
    <v-flex
      xs6
      v-for="pc in party"
    >
      <orderable-party-member
        :pc="pc"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'PartyOrder',
  props: [
    'party',
  ],
  components: {
    OrderablePartyMember: () => import('@/components/dm/OrderablePartyMember'),
  },
}
</script>

<style scoped>

</style>
