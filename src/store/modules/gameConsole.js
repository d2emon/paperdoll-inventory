const state = {
  text: []
}

const getters = {}

const mutations = {
  addText: (state, text) => { state.text.push(text) }
}

const actions = {
  doCommand: ({ commit, dispatch }, { command, ...params }) => {
    if (command === 'Go') {
      const { direction } = params
      if (!direction) return commit('addText', 'Huh?')

      dispatch('pc/goDirection', direction, { root: true })
      return commit('addText', direction)
    }

    if (command === 'Enter') {
      const { location } = params
      if (!location) return commit('addText', 'Huh?')

      const { name } = location
      return commit('addText', `Entering...<br />${name}`)
    }

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
