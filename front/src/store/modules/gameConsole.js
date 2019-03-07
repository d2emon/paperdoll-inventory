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
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
