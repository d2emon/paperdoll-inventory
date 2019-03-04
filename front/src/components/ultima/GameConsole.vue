<template>
  <div class="game-console">
    <p
      v-for="(s, id) in text"
      :key="id"
      v-html="s"
    >
    </p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'GameConsole',
    computed: {
      ...mapState('gameConsole', ['text'])
    }
  }
</script>

<style scoped>
  .game-console {
    background-color: black;
    color: white;
    height: 175px;
    overflow: auto;
  }
</style>
