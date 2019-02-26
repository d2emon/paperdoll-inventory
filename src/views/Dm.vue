<template>
  <div id="dungeon-master">
    <dungeon-master />
  </div>
</template>

<script>
  export default {
    name: 'Dm',
    components: {
      DungeonMaster: () => import('@/components/DungeonMaster'),
    }
  }
</script>

<style scoped>

</style>
