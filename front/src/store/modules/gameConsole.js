import messageService from '@/services/messages'
import pcService from '@/services/pc'

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
      return pcService.moveCharacter(playerId, direction)
        .then(() => dispatch('pc/loadCharacter', playerId, { root: true }))
        .then(() => dispatch('castle/movePeople', null, { root: true }))
        .then(() => dispatch('receiveMessages', playerId))
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
