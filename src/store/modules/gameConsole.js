const DIRECTIONS = [
  'North',
  'East',
  'South',
  'West'
]

const state = {
  text: []
}

const getters = {}

const mutations = {
  addText: (state, text) => { state.text.push(text) }
}

const actions = {
  doCommand: ({ state, commit, dispatch }, command) => {
    let isDirection = false
    DIRECTIONS.forEach((direction, directionId) => {
      if (command !== direction) return

      isDirection = true
      dispatch('pc/goDirection', directionId, { root: true })
      return commit('addText', direction)
    })

    if (isDirection) return

    commit('addText', 'Huh?')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
