const state = {
  text: []
}

const getters = {}

const mutations = {
  addText: (state, text) => { state.text.push(text) }
}

const actions = {
  wrongCommand: ({ commit }) => commit('addText', 'Huh?'),

  doCommand: ({ commit, dispatch }, { command, ...params }) => {
    if (command === 'Go') {
      const { direction } = params
      if (!direction) return dispatch('wrongCommand')

      dispatch('pc/goDirection', direction, { root: true })
        .then(result => {
          if (!result) return dispatch('wrongCommand')

          dispatch('castle/movePeople', null, { root: true })
          return commit('addText', direction)
        })
    }

    if (command === 'Enter') {
      const { castle } = params
      if (!castle) return dispatch('wrongCommand')

      dispatch('castle/fetchCastle', castle.castleId, { root: true })
      dispatch('pc/enterCastle', castle, { root: true })
      return commit('addText', `Entering...<br />${castle.name}`)
    }

    if (command === 'Exit') {
      const { castle } = params
      if (!castle) return dispatch('wrongCommand')

      dispatch('castle/fetchCastle', null, { root: true })
      dispatch('pc/exitCastle', castle, { root: true })
      return commit('addText', `Exiting...`)
    }

    return dispatch('wrongCommand')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
