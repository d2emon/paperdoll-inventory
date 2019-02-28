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
      const { castle } = params
      if (!castle) return commit('addText', 'Huh?')

      dispatch('view/fetchCastle', castle.castleId, { root: true })
      return commit('addText', `Entering...<br />${castle.name}`)
    }

    if (command === 'Exit') {
      commit('view/setCastle', null, { root: true })
      return commit('addText', `Exiting...`)
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
