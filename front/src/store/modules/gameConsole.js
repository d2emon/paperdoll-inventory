import messageService from '@/services/messages'

const state = {
  text: []
}

const getters = {}

const mutations = {
  setText: (state, text) => { state.text = text }
}

const actions = {
  sendMessage: ({ dispatch }, { playerId, message }) => messageService.addMessage(playerId, message)
    .then(() => dispatch('receiveMessages', playerId)),
  receiveMessages: ({ commit }, playerId) => messageService.fetchMessages(playerId)
    .then(({ messages }) => commit('setText', messages.map(message => message.text))),

  doCommand: ({ dispatch }, { playerId, command, ...params }) => {
    if (command === 'Go') {
      const { direction } = params
      if (!direction) return dispatch('sendMessage', { playerId })

      return dispatch('pc/goDirection', direction, { root: true })
        .then(result => {
          if (!result) return dispatch('sendMessage', { playerId })

          dispatch('sendMessage', { playerId, message: direction })
          return dispatch('castle/movePeople', null, { root: true })
        })
    }

    if (command === 'Enter') {
      const { castle } = params
      if (!castle) return dispatch('sendMessage', { playerId })

      dispatch('castle/fetchCastle', castle.castleId, { root: true })
      dispatch('pc/enterCastle', castle, { root: true })
      return dispatch('sendMessage', { playerId, message: `Entering...<br />${castle.name}` })
    }

    if (command === 'Exit') {
      const { castle } = params
      if (!castle) return dispatch('sendMessage', { playerId })

      dispatch('castle/fetchCastle', null, { root: true })
      dispatch('pc/exitCastle', castle, { root: true })
      return dispatch('sendMessage', { playerId, message: `Exiting...` })
    }

    return dispatch('sendMessage', { playerId })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
