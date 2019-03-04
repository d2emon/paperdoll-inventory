<template>
  <v-avatar>
    <img
      :src="pc.avatar"
      :alt="pc.name"
    >
  </v-avatar>
</template>

<script>
export default {
  name: 'OrderablePartyMember',
  props: [
    'pc'
  ]
}
</script>

<style scoped>

</style>
