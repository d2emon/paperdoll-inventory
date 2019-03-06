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
  sendMessage: ({ commit }, { playerId, message }) => messageService.addMessage(playerId, message)
    .then(({ messages }) => commit('setText', messages.map(message => message.text))),
  receiveMessages: ({ commit }, playerId) => messageService.fetchMessages(playerId)
    .then(({ messages }) => commit('setText', messages.map(message => message.text))),

  doCommand: ({ dispatch }, { playerId, command, ...params }) => {
    if (command === 'Go') {
      return dispatch('pc/doAction', { action: 'go', params }, { root: true })
        // .then(() => dispatch('castle/movePeople', null, { root: true }))
    }

    if (command === 'Enter') {
      return dispatch('pc/doAction', { action: 'enter', params }, { root: true })
    }

    if (command === 'Exit') {
      return dispatch('pc/doAction', { action: 'exit', params }, { root: true })
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
